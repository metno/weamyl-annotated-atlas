FROM node:14 as build-stage
WORKDIR /app
COPY package*.json /src/ /public/
ARG PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ARG CYPRESS_INSTALL_BINARY=0
RUN npm install
COPY ./ /app/
RUN npm run build

FROM nginxinc/nginx-unprivileged:1-alpine
COPY --from=build-stage /app/dist /usr/share/nginx/html
