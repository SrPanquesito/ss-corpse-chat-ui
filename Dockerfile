# Stage 1: Build the application
FROM node:18-alpine3.19 AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN SERVER_BASE_URL=https://server.corpsechat.com SOCKET_BASE_URL=https://ws.corpsechat.com npm run build:prod --if-present

# Stage 2: Serve the application with nginx
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]