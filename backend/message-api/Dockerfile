FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=81

EXPOSE 81

CMD [ "npm", "start" ]