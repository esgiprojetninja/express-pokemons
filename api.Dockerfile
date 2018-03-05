FROM alpine

MAINTAINER dydys

EXPOSE 3000

RUN apk update

RUN apk add nodejs

WORKDIR /app

VOLUME . /app

RUN npm install

RUN npm run serve
