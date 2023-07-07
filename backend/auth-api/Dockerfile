FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=40

EXPOSE 40

CMD [ "npm", "start" ]