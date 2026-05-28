FROM node:22-alpine AS build-stage

WORKDIR /app

COPY package*.json ./
RUN npm ci --legacy-peer-deps

COPY . .
RUN npm run build

FROM nginxinc/nginx-unprivileged:1.27-alpine
COPY --from=build-stage /app/dist /usr/share/nginx/html
