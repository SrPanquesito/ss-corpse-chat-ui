# Stage 1: Build the application
FROM node:18-alpine3.19 AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

# Stage 2: Use build secrets to create the .env file
RUN --mount=type=secret,id=SERVER_BASE_URL \
    --mount=type=secret,id=SOCKET_BASE_URL \
    sh -c 'echo "SERVER_BASE_URL=$(cat /run/secrets/SERVER_BASE_URL)" >> .env.prod && \
            echo "SOCKET_BASE_URL=$(cat /run/secrets/SOCKET_BASE_URL)" >> .env.prod'

RUN npm run build:prod --if-present

# Stage 3: Serve the application with nginx
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]