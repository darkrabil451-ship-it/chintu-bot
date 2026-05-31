FROM node:18-buster

# लेटेस्ट क्रोमियम और व्हाट्सएप के लिए जरूरी सभी डिपेंडेंसीज इंस्टॉल करें
RUN apt-get update && apt-get install -y \
    chromium \
    fonts-ipafont-gothic \
    fonts-wqy-zenhei \
    fonts-thai-tlwg \
    fonts-kacst \
    fonts-freefont-ttf \
    libxss1 \
    --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

# क्रोमियम का सही पाथ सेट करें ताकि whatsapp-web.js उसे आसानी से ढूंढ सके
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

CMD ["node", "bot.js"]
