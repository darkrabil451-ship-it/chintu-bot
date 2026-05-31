FROM node:18-slim

# क्रोमियम और ज़रूरी टूल्स इंस्टॉल करना
RUN apt-get update && apt-get install -y \
    chromium \
    git \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# बोट को पता रहे कि क्रोमियम कहाँ है
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

CMD ["node", "bot.js"]
