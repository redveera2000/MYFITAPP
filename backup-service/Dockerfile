FROM node:20-alpine

WORKDIR /app

COPY package.json ./
RUN npm install

COPY backup.js ./

# Mount host directory to persist backups
VOLUME ["/opt/vtrack-backups"]

CMD ["node", "backup.js"]
