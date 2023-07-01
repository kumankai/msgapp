FROM node:20-alpine3.17

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=60

EXPOSE 60

CMD [ "npm", "start" ]