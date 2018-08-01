FROM node:10.7.0

COPY src /input/src
COPY gatsby-config.js package.json package-lock.json /input/

WORKDIR /input
RUN npm install && npm run build && npm run export
