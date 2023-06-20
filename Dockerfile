FROM node:lts-alpine

RUN apk --no-cache add curl
RUN apk add make g++ python3 git
RUN yarn global add @mapbox/node-pre-gyp

WORKDIR /api

COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn install

COPY .env.development .env.development
COPY tsconfig.json tsconfig.json
COPY src src

CMD yarn start:dev