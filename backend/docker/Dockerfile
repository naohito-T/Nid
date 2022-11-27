# @see https://blog.shinonome.io/nodejs-docker/
FROM node:16.17.0-slim
ENV NODE_ENV production

WORKDIR /app

RUN apk add --no-cache tini
ENTRYPOINT ["/sbin/tini", "--"]

COPY --chown=node:node package.json yarn.lock ./
# devDependenciesがコピーされない。
RUN yarn install --prod --frozen-lockfile

COPY --chown=node:node . .

USER node
CMD ["node", "index.js"]
