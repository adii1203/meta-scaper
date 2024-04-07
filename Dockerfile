FROM node:lts-alpine as base

WORKDIR /usr/src/app

RUN apk update && apk add --no-cache nmap && \
    echo @edge https://dl-cdn.alpinelinux.org/alpine/edge/community >> /etc/apk/repositories && \
    echo @edge https://dl-cdn.alpinelinux.org/alpine/edge/main >> /etc/apk/repositories && \
    apk update && \
    apk add --no-cache \
      chromium \
      harfbuzz \
      "freetype>2.8" \
      ttf-freefont \
      nss

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

COPY package*.json .

RUN apk add --no-cache \
  build-base \
  g++ \
  cairo-dev \
  jpeg-dev \
  pango-dev \
  giflib-dev

RUN apk update && apk add build-base g++ cairo-dev jpeg-dev pango-dev giflib-dev

RUN npm install

FROM base as development

COPY . .

CMD ["npm", "run", "dev"]

FROM base as production

COPY . .

RUN npm prune --production

CMD ["npm", "start"]
