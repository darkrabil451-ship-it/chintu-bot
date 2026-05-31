FROM ghcr.io/puppeteer/puppeteer:22.10.0

USER root

# ज़रूरी टूल्स इंस्टॉल करने के लिए
RUN apt-get update && apt-get install -y \
    gconf-service \
    libgpgme11 \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

CMD ["node", "bot.js"]
