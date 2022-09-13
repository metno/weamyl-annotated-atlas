FROM node:16
WORKDIR /app
COPY package*.json /src/ /app/
ARG PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ARG CYPRESS_INSTALL_BINARY=0
RUN npm install
COPY ./ /app/
RUN npm run build

FROM nginxinc/nginx-unprivileged:1-alpine
COPY --from=build /app/dist /usr/share/nginx/html
