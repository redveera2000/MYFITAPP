/**
 * health-api.js
 * Handles OAuth 2.0 flow via Google Identity Services and fetches daily activity
 * data (steps, distance, calories) from the Google Fit REST API.
 */

const GOOGLE_FIT_SCOPE = 'https://www.googleapis.com/auth/fitness.activity.read https://www.googleapis.com/auth/fitness.body.read https://www.googleapis.com/auth/fitness.location.read';
let tokenClient;

/**
 * Initializes the Google Identity Services token client.
 * Called when the GIS script loads.
 */
function initGoogleIdentityServices() {
  if (!googleClientId || googleClientId.startsWith('${')) {
    console.warn('[Health API] Google Client ID is not configured.');
    return;
  }

  tokenClient = google.accounts.oauth2.initTokenClient({
    client_id: googleClientId,
    scope: GOOGLE_FIT_SCOPE,
    callback: (response) => {
      if (response.error !== undefined) {
        throw (response);
      }
      // Token retrieved, fetch data
      fetchGoogleFitData(response.access_token);
    }
  });
}

/**
 * Triggers the OAuth popup flow.
 */
function requestGoogleFitSync() {
  if (!tokenClient) {
    alert("Google Client ID is not configured properly in firebase-config.js. Cannot sync.");
    return;
  }
  // Request an access token
  tokenClient.requestAccessToken();
}

/**
 * Fetches the last 14 days of aggregated activity data from Google Fit REST API
 */
async function fetchGoogleFitData(accessToken) {
  try {
    const btn = document.getElementById('btn-sync-fit');
    if (btn) {
      btn.innerHTML = '<span class="btn-spinner" style="display:inline-block; margin-right:8px;"></span> Syncing...';
      btn.disabled = true;
    }

    // Get timestamps for last 14 days
    const endTime = new Date();
    endTime.setHours(23, 59, 59, 999);
    const startTime = new Date();
    startTime.setDate(startTime.getDate() - 14);
    startTime.setHours(0, 0, 0, 0);

    const requestBody = {
      aggregateBy: [
        { dataTypeName: 'com.google.step_count.delta' },
        { dataTypeName: 'com.google.distance.delta' },
        { dataTypeName: 'com.google.calories.expended' }
      ],
      bucketByTime: { durationMillis: 86400000 }, // 1 day buckets
      startTimeMillis: startTime.getTime(),
      endTimeMillis: endTime.getTime()
    };

    const response = await fetch('https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    const parsedLogs = processGoogleFitData(data);
    
    if (parsedLogs.length > 0) {
      appState.bulkImportStepLogs(parsedLogs);
      renderStepInsights();
      alert(`✅ Successfully synced ${parsedLogs.length} days of activity data from Google Fit!`);
    } else {
      alert("Sync completed, but no activity data was found for the last 14 days.");
    }

  } catch (error) {
    console.error('[Health API] Sync failed:', error);
    alert('Failed to sync with Google Fit. Check console for details.');
  } finally {
    const btn = document.getElementById('btn-sync-fit');
    if (btn) {
      btn.innerHTML = 'Sync with Google Fit';
      btn.disabled = false;
    }
  }
}

/**
 * Processes the raw Google Fit aggregate response into our stepLogs format
 */
function processGoogleFitData(apiData) {
  const logs = [];

  if (!apiData.bucket) return logs;

  apiData.bucket.forEach(bucket => {
    // Determine the date from the bucket start time
    const startDate = new Date(parseInt(bucket.startTimeMillis));
    const dateStr = startDate.toISOString().split('T')[0];
    
    const entry = {
      date: dateStr,
      steps: 0,
      source: 'google_fit_api'
    };

    let hasData = false;

    bucket.dataset.forEach(dataset => {
      dataset.point.forEach(point => {
        if (!point.value || point.value.length === 0) return;
        
        const val = point.value[0];
        
        if (dataset.dataSourceId.includes('step_count')) {
          entry.steps += val.intVal || 0;
          if (entry.steps > 0) hasData = true;
        } 
        else if (dataset.dataSourceId.includes('distance')) {
          const m = val.fpVal || 0;
          entry.distance_km = parseFloat((m / 1000).toFixed(2));
        }
        else if (dataset.dataSourceId.includes('calories')) {
          entry.calories = Math.round(val.fpVal || 0);
        }
      });
    });

    if (hasData) {
      logs.push(entry);
    }
  });

  return logs;
}
