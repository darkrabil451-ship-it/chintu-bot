const { Client, LocalAuth } = require('whatsapp-web.js');
const express = require('express');
const qrcode = require('qrcode-terminal');

// ==========================================
// 🌐 PORT VERIFICATION
// ==========================================
const app = express();
const PORT = process.env.PORT || 3000;
app.get('/', (req, res) => res.send('👑 CHINTU BOT LIVE 🔥'));
app.listen(PORT, () => console.log(`🌐 Port: ${PORT}`));

// ==========================================
// 🚀 CONFIG
// ==========================================
const YOUR_LINK = "https://urlshort.at/Hackingtool";
const OWNER_NUMBER = "919412185706";
const OWNER_NAME = "Chintu Bhai";
const BOT_NAME = "🔥 CHINTU KHATRNAK BOT";
const BOT_VERSION = "v5.0";

// ==========================================
// 🚀 CLIENT SETUP - CHROME PATH FIXED
// ==========================================
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        executablePath: process.env.CHROME_BIN || '/usr/bin/chromium',  // 🟢 Render fix
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-gpu',
            '--no-first-run',
            '--no-default-browser-check',
            '--single-process',
            '--disable-accelerated-2d-canvas',
            '--disable-notifications'
        ]
    }
});

// ==========================================
// 🔄 QR + PAIRING CODE
// ==========================================
client.on('qr', async (qr) => {
    console.log('\n📱 Scan QR:');
    qrcode.generate(qr, { small: true });
    
    try {
        const code = await client.requestPairingCode(OWNER_NUMBER);
        console.log(`\n🔥 PAIRING CODE: [ ${code.toUpperCase()} ]\n`);
    } catch(e) {}
});

client.on('ready', () => {
    console.log(`\n✅ ${BOT_NAME} ONLINE! 🔥`);
    console.log(`👑 ${OWNER_NAME}`);
    console.log(`🔗 ${YOUR_LINK}\n`);
});

// ==========================================
// ⚡ MESSAGE HANDLER
// ==========================================
client.on('message', async (msg) => {
    try {
        const body = msg.body.trim();
        const lowerText = body.toLowerCase();
        const prefix = '.';
        const chat = await msg.getChat();
        const contact = await msg.getContact();

        // 🔗 AUTO KEYWORD REPLY
        const TRIGGERS = [
            "tool", "hacking", "hack", "crack", "mod", "apk",
            "panel", "free fire", "ff", "headshot", "diamond",
            "hacker", "insta", "instagram", "password", "termux",
            "phishing", "virus", "rat", "spam", "bot", "script",
            "bypass", "exploit", "payload", "malware", "ddos"
        ];

        for (let word of TRIGGERS) {
            if (lowerText.includes(word)) {
                await msg.reply(`🔥 **@${contact.pushname || 'Bhai'}**!

✅ **${word.toUpperCase()}** ka tool ready!
🔗 **${YOUR_LINK}**

━━━━━━━━━━━━━━━
👑 ${BOT_NAME} - ${OWNER_NAME}`);
                return;
            }
        }

        if (lowerText === 'hi' || lowerText === 'hello' || lowerText === 'namaste') {
            await msg.reply(`👋 Namaste **${contact.pushname || 'Bro'}**!
🔥 Main hoon **${BOT_NAME}**
📌 **${prefix}menu** - All commands`);
            return;
        }

        if (!body.startsWith(prefix)) return;

        const args = body.slice(prefix.length).trim().split(/ +/);
        const command = args.shift().toLowerCase();

        // ==========================================
        // 📜 MENU
        // ==========================================
        if (command === 'menu' || command === 'help') {
            await msg.reply(`╔══════════════════╗
║ ${BOT_NAME} ║
╚══════════════════╝

💀 *KHATRNAK COMMANDS*
┃ ${prefix}elite [name] - Elite name gen
┃ ${prefix}threat [name] - Threat sim ⚠️
┃ ${prefix}nuke - Group nuke 💥
┃ ${prefix}chaos - Chaos mode 😈
┃ ${prefix}raid [text] - Raid mode
┃ ${prefix}toxic [@user] - Toxic roast 🗿
┃ ${prefix}snipe [@user] - Sniper 🔫
┃ ${prefix}ghost - Ghost mode 👻

🔗 *LINK GENERATOR*
┃ ${prefix}link - Main link ✅

🕵️ *OSINT*
┃ ${prefix}ip [ip] - IP tracker
┃ ${prefix}phone [num] - Phone lookup
┃ ${prefix}track [name] - OSINT scan
┃ ${prefix}userinfo - Your info

👥 *GROUP ADMIN*
┃ ${prefix}tagall - Tag all
┃ ${prefix}warn [@user] - Warning
┃ ${prefix}kick [@user] - Kick
┃ ${prefix}mute/unmute
┃ ${prefix}admins - Admin list

🛠️ *UTILITY*
┃ ${prefix}ping - Speed test
┃ ${prefix}sticker - Image to sticker
┃ ${prefix}calc - Calculator
┃ ${prefix}google - Search
┃ ${prefix}quote - Random quote

👑 *OWNER*
┃ ${prefix}broadcast - Bulk send
┃ ${prefix}status - Bot status
┃ ${prefix}owner - Creator info
┃ ${prefix}restart - Restart

━━━━━━━━━━━━━━━
🔗 ${YOUR_LINK}`);
        }

        // 💀 KHATRNAK COMMANDS
        else if (command === 'elite') {
            const name = args.join(' ') || 'Unknown';
            const names = [`💀 Elite_${name}_X`, `🔥 ${name}_404`, `👑 King_${name}`, `⚡ ${name}_Hacker`];
            await msg.reply(`💀 **ELITE NAME:** ${names[Math.floor(Math.random()*names.length)]}`);
        }
        else if (command === 'threat') {
            await msg.reply(`⚠️ **THREAT SIM**\n🎯 Target: ${args.join(' ') || 'Unknown'}\n🔥 You have been warned!`);
        }
        else if (command === 'nuke') {
            if (!chat.isGroup) return;
            await msg.reply(`💥 **NUKE LAUNCHED!** ☢️\n😈 Prank! Kuch nahi hua!`);
        }
        else if (command === 'chaos') {
            if (!chat.isGroup) return;
            await msg.reply(`😈 **CHAOS MODE** activated! (Prank)`);
        }
        else if (command === 'raid') {
            await msg.reply(`🔥 **RAID MODE** on ${args.join(' ') || 'target'}!`);
        }
        else if (command === 'toxic') {
            const target = msg.mentionedIds[0] ? `@${msg.mentionedIds[0].split('@')[0]}` : 'Unknown';
            const roasts = [`${target} teri skill dekh ke maza aa gaya!`, `${target} tu group ka weakest link hai!`];
            await msg.reply(`🗿 ${roasts[Math.floor(Math.random()*roasts.length)]}`);
        }
        else if (command === 'snipe') {
            const target = msg.mentionedIds[0] ? `@${msg.mentionedIds[0].split('@')[0]}` : 'Unknown';
            await msg.reply(`🔫 **SNIPER**\n🎯 ${target} eliminated! (Prank)`);
        }
        else if (command === 'ghost') {
            if (!chat.isGroup) return;
            await msg.reply(`👻 ${contact.pushname} has left the group\n😈 Prank!`);
        }

        // 🔗 LINK
        else if (command === 'link') {
            await msg.reply(`🔗 **MAIN LINK**\n✅ ${YOUR_LINK}`);
        }

        // 🕵️ OSINT
        else if (command === 'ip') {
            await msg.reply(`🌐 **IP:** ${args[0] || '8.8.8.8'}\n🌍 India\n📍 Delhi`);
        }
        else if (command === 'phone') {
            await msg.reply(`📞 **Phone:** ${args[0] || 'Unknown'}\n🏢 Jio/Airtel`);
        }
        else if (command === 'track') {
            await msg.reply(`🕵️ **SCAN:** ${args.join(' ') || 'Unknown'}\n📱 Phone found\n📧 Email found\n📍 Location traced`);
        }
        else if (command === 'userinfo') {
            await msg.reply(`🕵️ **YOUR INFO**\n👤 ${contact.pushname || 'Unknown'}\n📱 ${contact.id.user}`);
        }

        // 👥 GROUP
        else if (command === 'tagall') {
            if (!chat.isGroup) return;
            let text = `📢 *ALL MEMBERS*\n\n`, mentions = [];
            for (let p of chat.participants) {
                text += `@${p.id.user} `;
            }
            await chat.sendMessage(text, { mentions });
        }
        else if (command === 'warn') {
            if (!msg.mentionedIds.length) return;
            await msg.reply(`⚠️ @${msg.mentionedIds[0].split('@')[0]} warned!`);
        }
        else if (command === 'kick') {
            if (!chat.isGroup || !msg.mentionedIds.length) return;
            await chat.removeParticipants([msg.mentionedIds[0]]);
            await msg.reply('✅ Kicked!');
        }
        else if (command === 'mute') {
            if (!chat.isGroup) return;
            await chat.setMessagesAdminsOnly(true);
            await msg.reply('🤫 Muted!');
        }
        else if (command === 'unmute') {
            if (!chat.isGroup) return;
            await chat.setMessagesAdminsOnly(false);
            await msg.reply('📢 Unmuted!');
        }
        else if (command === 'admins') {
            if (!chat.isGroup) return;
            let list = '👑 *Admins*\n';
            for (let p of chat.participants) if(p.isAdmin) list += `👑 @${p.id.user}\n`;
            await chat.sendMessage(list);
        }

        // 🛠️ UTILITY
        else if (command === 'ping') {
            const start = Date.now();
            const res = await msg.reply('🏓 Pinging...');
            await res.edit(`🚀 *PONG!* ⏱ ${Date.now()-start}ms`);
        }
        else if (command === 'sticker') {
            if (msg.hasMedia) {
                const media = await msg.downloadMedia();
                await msg.reply(media, null, { sendMediaAsSticker: true, stickerName: BOT_NAME });
            }
        }
        else if (command === 'calc') {
            try { await msg.reply(`🧮 = ${eval(args.join(' '))}`); } catch { await msg.reply('❌ .calc 2+2'); }
        }
        else if (command === 'google') {
            const q = args.join(' ');
            if (q) await msg.reply(`🔍 https://www.google.com/search?q=${encodeURIComponent(q)}`);
        }
        else if (command === 'quote') {
            const q = [`Hack the planet! 🔥`, `Stay anonymous!`, `${OWNER_NAME} ka bot zabardast hai!`];
            await msg.reply(`💬 "${q[Math.floor(Math.random()*q.length)]}"`);
        }

        // 👑 OWNER
        else if (command === 'broadcast') {
            if (contact.id.user !== OWNER_NUMBER) return;
            const bc = args.join(' ') || '🔥 CHINTU BOT!';
            let sent = 0;
            const chats = await client.getChats();
            for (let c of chats) if (!c.isGroup) { await client.sendMessage(c.id._serialized, `📢 ${bc}`); sent++; }
            await msg.reply(`✅ Sent to ${sent} chats!`);
        }
        else if (command === 'status') {
            await msg.reply(`📊 **${BOT_NAME}**\n✅ ONLINE\n👑 ${OWNER_NAME}\n🔗 ${YOUR_LINK}`);
        }
        else if (command === 'owner') {
            await msg.reply(`👑 **${BOT_NAME}**\n🔥 ${OWNER_NAME}\n📞 +${OWNER_NUMBER}`);
        }
        else if (command === 'restart') {
            if (contact.id.user !== OWNER_NUMBER) return;
            await msg.reply('🔄 Restarting...');
            process.exit(0);
        }

    } catch (e) { console.log('Error:', e.message); }
});

console.log(`\n🔥 ${BOT_NAME}`);
console.log(`👑 ${OWNER_NAME}`);
console.log(`🔗 ${YOUR_LINK}\n`);
client.initialize();
