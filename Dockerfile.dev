FROM node:alpine
WORKDIR "/app"

COPY ./package.json ./
COPY ./package-lock.json ./

RUN npm install
RUN apk add build-base
RUN apk add python3

COPY . .
CMD ["npm","run","start"]