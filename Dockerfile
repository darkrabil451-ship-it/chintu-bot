FROM ghcr.io/puppeteer/puppeteer:22.10.0

USER root

# रेंडर के लिए एकदम सही और अपडेटेड डिपेंडेंसीज
RUN apt-get update && apt-get install -y \
    wget \
    gnupg \
    ca-certificates \
    procps \
    libxss1 \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

CMD ["node", "bot.js"]

