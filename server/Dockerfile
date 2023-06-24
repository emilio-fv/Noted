# Development
FROM node:17-alpine

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package*.json ./

ENV NODE_ENV=development

RUN npm i -g nodemon

RUN npm install

COPY . .

EXPOSE 8000

CMD ["nodemon", "server.js"]

# Production