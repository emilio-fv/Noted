# Development
FROM node:17-alpine

RUN mkdir -p usr/src/app

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

ENV NODE_ENV=development 

EXPOSE 3000

CMD ["npm", "start", "run"]

# Production