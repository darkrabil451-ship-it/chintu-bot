FROM alekzonder/puppeteer:latest

USER root

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

CMD ["node", "bot.js"]
