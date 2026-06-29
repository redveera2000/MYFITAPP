#!/bin/sh
set -e

# Path to the template and the target file
TEMPLATE_FILE="/usr/share/nginx/html/firebase-config.js.template"
TARGET_FILE="/usr/share/nginx/html/firebase-config.js"

if [ -f "$TEMPLATE_FILE" ]; then
  echo "Injecting environment variables into firebase-config.js..."
  # Use envsubst to replace specific variables in the template.
  # We list variables explicitly so normal JS variables (if any) are not affected.
  envsubst '$FIREBASE_API_KEY $FIREBASE_AUTH_DOMAIN $FIREBASE_PROJECT_ID $FIREBASE_STORAGE_BUCKET $FIREBASE_MESSAGING_SENDER_ID $FIREBASE_APP_ID $SINGLE_USER_EMAIL $SINGLE_USER_PASSWORD $GOOGLE_CLIENT_ID' < "$TEMPLATE_FILE" > "$TARGET_FILE"
  echo "Firebase configuration generated successfully."
else
  echo "Template file not found at $TEMPLATE_FILE, skipping injection."
fi
