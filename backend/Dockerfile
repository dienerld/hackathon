FROM node:20-slim

ENV NODE_ENV=development

USER node

WORKDIR /home/node/app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

CMD ["yarn", "dev"]
