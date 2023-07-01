FROM node:20-alpine3.17

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=40

EXPOSE 40

CMD [ "npm", "start" ]