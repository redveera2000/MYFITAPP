# Production-ready static web server
FROM nginx:1.27-alpine

# Hides Nginx version info in header responses for basic footprint protection
RUN sed -i 's/# server_tokens off;/server_tokens off;/' /etc/nginx/nginx.conf

# Clean default assets
RUN rm -rf /usr/share/nginx/html/*

# Copy configuration and site files
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY index.html /usr/share/nginx/html/
COPY index.css /usr/share/nginx/html/
COPY app.js /usr/share/nginx/html/
COPY health-api.js /usr/share/nginx/html/
# Copy firebase-config.js as a template for environment variable injection at runtime
COPY firebase-config.js /usr/share/nginx/html/firebase-config.js.template
COPY db-service.js /usr/share/nginx/html/

# Copy dynamic configuration entrypoint script
COPY nginx/configure-firebase.sh /docker-entrypoint.d/30-configure-firebase.sh
RUN chmod +x /docker-entrypoint.d/30-configure-firebase.sh

# Secure files permission
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html

EXPOSE 80

# Health check to ensure Nginx is healthy for the fitness tracker
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget -q -O- http://localhost/ > /dev/null || exit 1

CMD ["nginx", "-g", "daemon off;"]
