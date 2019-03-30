FROM node:8.9.1-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . .

RUN yarn install

CMD ["npm", "start", "10"]
