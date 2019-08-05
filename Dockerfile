# -----
# build environment

FROM node:10.16.1 AS build-env

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --production
COPY . .

# -----
# final image

FROM node:10.16.1-slim
COPY --from=build-env /app /app
WORKDIR /app
USER node
CMD ./node_modules/pm2/bin/pm2-runtime index.config.js --no-daemon
