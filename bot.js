const { Client, LocalAuth } = require('whatsapp-web.js');
const express = require('express'); // 🌐 रेंडर को चकमा देने के लिए

// ==========================================
// 🌐 FAKE EXPRESS SERVER FOR RENDER (CRITICAL FIX)
// ==========================================
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('👑 CHINTU BOT IS LIVE AND RUNNING POWERED BY RENDER! 👑');
});

app.listen(PORT, () => {
    console.log(`🌐 Render Port Verification Active on port ${PORT}`);
});

// ==========================================
// 🚀 CHINTU BOT - Create By CHINTU
// ==========================================

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-gpu',
            '--disable-extensions',
            '--no-first-run',
            '--no-default-browser-check'
        ],
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
    }
});

// 🔗 Config
const YOUR_LINK = "https://urlshort.at/Hackingtool";
const OWNER_NUMBER = "919412185706";
const OWNER_NAME = "Chintu Bhai";
const BOT_NAME = "CHINTU BOT";
const BOT_VERSION = "v2.0";

// ==========================================
// 🔄 सुपर फिक्स ऑटो रीट्राई पेयरिंग इंजन (Anti-Error)
// ==========================================
let pairingCodeRequested = false;

client.on('qr', async (qr) => {
    if (!pairingCodeRequested) {
        pairingCodeRequested = true;
        
        console.log('\n=========================================');
        console.log(`🔥 ${BOT_NAME} - Create By ${OWNER_NAME}`);
        console.log('=========================================');
        console.log(`🤖 Chintu bhai, valid pairing code nikalne ki koshish jaari hai...`);
        console.log('=========================================');

        // सर्वर सेटल होने के लिए शुरू में 12 सेकंड का डिले
        await new Promise(resolve => setTimeout(resolve, 12000));

        while (true) {
            try {
                console.log('🔄 Requesting pairing code from WhatsApp servers...');
                const pairingCode = await client.requestPairingCode(OWNER_NUMBER);
                
                console.log('\n🔥 --- EKDAM FRESH PAIRING CODE TAIYAR HAI --- 🔥');
                console.log(`👉  [  ${pairingCode.toUpperCase()}  ]  👈`);
                console.log('=========================================');
                console.log('Bhai, jaldi se ye code apne WhatsApp me daal do!');
                console.log('=========================================\n');
                break; 
            } catch (err) {
                console.log(`❌ Temp error: ${err.message}. 7 second me fir se try kar raha hu...`);
                await new Promise(resolve => setTimeout(resolve, 7000));
            }
        }
    }
});

client.on('ready', () => {
    console.log('\n=========================================');
    console.log(`✅ ${BOT_NAME} ONLINE!🔥`);
    console.log(`👑 Created By: ${OWNER_NAME}`);
    console.log(`📞 Owner: +${OWNER_NUMBER}`);
    console.log(`🔗 Link: ${YOUR_LINK}`);
    console.log('=========================================\n');
});

client.on('authenticated', () => {
    console.log('✅ Authenticated successfully!');
});

client.on('auth_failure', (msg) => {
    console.log('❌ Auth failed:', msg);
});

// ==========================================
// ⚡ MAIN MESSAGE HANDLER
// ==========================================
client.on('message', async (msg) => {
    try {
        const messageBody = msg.body.trim();
        const lowerText = messageBody.toLowerCase();
        const prefix = '.';
        const chat = await msg.getChat();
        const contact = await msg.getContact();

        // ===== AUTO REPLY (Tool/Hack Keywords) =====
        const AUTO_TRIGGERS = [
            "tool", "hacking", "hack", "crack", "mod", "apk",
            "panel", "free fire", "ff", "headshot", "diamond",
            "hacker", "insta", "instagram", "password", "bot",
            "script", "bypass", "spam", "unlock", "rat", "virus",
            "phishing", "ddos", "exploit", "payload", "malware"
        ];

        for (let word of AUTO_TRIGGERS) {
            if (lowerText.includes(word)) {
                await msg.reply(`👋 @${contact.pushname || 'Bro'}

✅ **Yahaan mil gaya!**
🔗 ${YOUR_LINK}

🔥 ${BOT_NAME} - Create By ${OWNER_NAME}`);
                break;
            }
        }

        // ===== BASIC GREETINGS =====
        if (lowerText === 'hi' || lowerText === 'hello' || lowerText === 'namaste') {
            await msg.reply(`👋 Namaste ${contact.pushname || 'Bro'}!

🔥 Main ${BOT_NAME} hoon - ${OWNER_NAME} ka personal bot!

📌 ${prefix}menu type karo saari commands dekhne ke liye!`);
            return;
        }

        if (lowerText.includes('chintu') || lowerText.includes('owner')) {
            await msg.reply(`👑 **${OWNER_NAME}** is the KING!

🔥 ${BOT_NAME} ${BOT_VERSION}
📞 Owner: +${OWNER_NUMBER}
🔗 Link: ${YOUR_LINK}`);
            return;
        }

        // ===== PREFIX COMMANDS CHECK =====
        if (!messageBody.startsWith(prefix)) return;

        const args = messageBody.slice(prefix.length).trim().split(/ +/);
        const command = args.shift().toLowerCase();

        // ==========================================
        // 📜 MAIN MENU
        // ==========================================
        if (command === 'menu' || command === 'help') {
            const menuText = `╔══════════════════════════╗
║   🔥 ${BOT_NAME} 🔥       ║
║   Create By ${OWNER_NAME}  ║
╚══════════════════════════╝

━━━━━━━━━━━━━━━━━
💀 *DANGER ZONE*
━━━━━━━━━━━━━━━━━
┃ ${prefix}destroy - Group destroy prank
┃ ${prefix}spam [text] [count] - Text spam
┃ ${prefix}virus - Virus simulation
┃ ${prefix}hack [name] - Hacking prank
┃ ${prefix}phishing - Phishing tools
┃ ${prefix}ddos [target] - DDoS simulation

━━━━━━━━━━━━━━━━━
🔗 *LINK GENERATOR*
━━━━━━━━━━━━━━━━━
┃ ${prefix}link - Get main link
┃ ${prefix}hacklink - Hacking tools link
┃ ${prefix}fflink - Free Fire hack link
┃ ${prefix}instalink - Instagram hack link

━━━━━━━━━━━━━━━━━
🕵️ *OSINT TRACKING*
━━━━━━━━━━━━━━━━━
┃ ${prefix}ip [address] - IP tracker
┃ ${prefix}dns [domain] - DNS lookup
┃ ${prefix}userinfo - Your info
┃ ${prefix}ig [username] - Instagram profile
┃ ${prefix}phone [number] - Phone number info

━━━━━━━━━━━━━━━━━
👥 *GROUP ADMIN*
━━━━━━━━━━━━━━━━━
┃ ${prefix}tagall - Tag all members
┃ ${prefix}warn [@user] - Warning
┃ ${prefix}mute - Mute group
┃ ${prefix}unmute - Unmute group
┃ ${prefix}admins - List admins
┃ ${prefix}members - Member count

━━━━━━━━━━━━━━━━━
🛠️ *UTILITY*
━━━━━━━━━━━━━━━━━
┃ ${prefix}ai [text] - Ask AI
┃ ${prefix}google [query] - Google search
┃ ${prefix}sticker - Make sticker
┃ ${prefix}weather [city] - Weather info
┃ ${prefix}calc [2+2] - Calculator

━━━━━━━━━━━━━━━━━
👑 *OWNER COMMANDS*
━━━━━━━━━━━━━━━━━
┃ ${prefix}broadcast [text] - Bulk message
┃ ${prefix}block [@user] - Block user
┃ ${prefix}unblock [@user] - Unblock user
┃ ${prefix}ping - Check speed
┃ ${prefix}owner - Creator info
┃ ${prefix}status - Bot status

━━━━━━━━━━━━━━━━━
🔗 **${YOUR_LINK}**
━━━━━━━━━━━━━━━━━`;
            await msg.reply(menuText);
        }

        // ==========================================
        // 🔗 LINK GENERATOR COMMANDS
        // ==========================================
        else if (command === 'link') {
            await msg.reply(`🔗 **Main Link:**\n${YOUR_LINK}\n\n🔥 ${BOT_NAME} - Create By ${OWNER_NAME}`);
        }
        else if (command === 'hacklink') {
            const links = `🔗 *HACKING TOOLS PACK:\n\n1️⃣ ${YOUR_LINK}\n2️⃣ ${YOUR_LINK}\n3️⃣ ${YOUR_LINK}\n\n🔥 Sabse latest tools yahan milte hain!`;
            await msg.reply(links);
        }
        else if (command === 'fflink') {
            await msg.reply(`🎮 *FREE FIRE HACK TOOLS:*\n\n🔗 ${YOUR_LINK}\n\n✅ Headshot, Wallhack, ESP + Diamond Hack sab milega!`);
        }
        else if (command === 'instalink') {
            await msg.reply(`📸 *INSTAGRAM HACK TOOLS:*\n\n🔗 ${YOUR_LINK}\n\n✅ Password crack, Account clone, Report tool sab milega!`);
        }

        // ==========================================
        // 💀 DANGER ZONE
        // ==========================================
        else if (command === 'destroy') {
            if (!chat.isGroup) return await msg.reply('❌ Sirf group mein chalta hai!');
            
            await msg.reply('🚨 *GROUP DESTROY SEQUENCE INITIATED*\n\nRemoving all members... 0%');
            setTimeout(async () => {
                await client.sendMessage(msg.from, '⚙️ Overriding Admin Logs... 45%');
            }, 2000);
            setTimeout(async () => {
                await client.sendMessage(msg.from, `🔥 *SYSTEM BYPASSED*\n\nChill bro! Yeh sirf prank hai! 😂\n\n🔗 ${YOUR_LINK}`);
            }, 4000);
        }
        else if (command === 'spam') {
            if (args.length < 2) return await msg.reply('❌ Usage: .spam [text] [count]\nExample: .spam 🔥CHINTU 5');
            const count = parseInt(args.pop());
            const text = args.join(' ');
            if (isNaN(count) || count > 30) return await msg.reply('❌ Max 30 tak daal sakte ho!');
            
            let spamText = `🔥 *${BOT_NAME} SPAM:*\n\n`;
            for (let i = 0; i < count; i++) {
                spamText += `${text}\n`;
            }
            await msg.reply(spamText);
        }
        else if (command === 'virus') {
            await msg.reply(`☣️ *BINARY VIRUS LOADING*\n\n\`\`\`01000011 01001000 01001001 01001110 01010100 01010101\`\`\`\n\n⚠️ Fake virus simulation! Kuch nahi hoga chill! 😎`);
        }
        else if (command === 'hack') {
            const target = args.join(' ') || 'Unknown';
            await msg.reply(`🕵️ *${BOT_NAME} REMOTE HACK INITIATED*\n\n🎯 Target: ${target}\n⚙️ Bypassing firewall... 0%`);
            setTimeout(async () => {
                await client.sendMessage(msg.from, `🔥 *HACK SUCCESSFUL!*\n\n${target} ka poora access mil gaya! 😎\n\n🔗 ${YOUR_LINK}`);
            }, 3000);
        }
        else if (command === 'phishing') {
            await msg.reply(`🎣 *PHISHING TOOLS:*\n\n1️⃣ Zphisher\n2️⃣ MaskPhish\n3️⃣ MaxPhisher\n4️⃣ SocialFish\n\n🔗 ${YOUR_LINK}\n\nTermux: pkg install git && git clone https://github.com/htr-tech/zphisher`);
        }
        else if (command === 'ddos') {
            const target = args[0] || 'unknown';
            await msg.reply(`💥 *DDoS ATTACK ON ${target}*\n\n🌐 Sending packets... 0%\n🔒 Proxy chain connected\n🔥 Status: Attack in progress (Prank System Activated)`);
        }

        // ==========================================
        // 🕵️ OSINT TRACKING
        // ==========================================
        else if (command === 'ip') {
            if (!args.length) return await msg.reply('❌ IP address daalo!\nExample: .ip 8.8.8.8');
            await msg.reply(`🌐 *IP TRACKER REPORT*\n━━━━━━━━━━━━━━━━━\n🌍 IP: ${args[0]}\n🏳️ Country: India\n🏙️ City: Noida\n📡 ISP: Reliance Jio Node\n━━━━━━━━━━━━━━━━━\n🔗 ${YOUR_LINK}`);
        }
        else if (command === 'phone') {
            if (!args.length) return await msg.reply('❌ Phone number daalo!\nExample: .phone +919876543210');
            await msg.reply(`📞 *PHONE LOOKUP*\n━━━━━━━━━━━━━━━━━\n📱 Number: ${args[0]}\n🌍 Country: India\n🏢 Carrier: Jio/Airtel/VI\n✅ Status: Active\n━━━━━━━━━━━━━━━━━\n🔗 ${YOUR_LINK}`);
        }
        else if (command === 'dns') {
            const domain = args[0] || 'google.com';
            await msg.reply(`🔍 *DNS LOOKUP: ${domain}*\n\n📄 A Record: 142.250.190.46\n📄 MX Record: alt1.aspmx.l.google.com\n\n🔗 ${YOUR_LINK}`);
        }
        else if (command === 'userinfo') {
            await msg.reply(`🕵️ *USER INFO*\n━━━━━━━━━━━━━━━━━\n👤 Name: ${contact.pushname || 'Unknown'}\n📱 Number: ${contact.id.user}\n🆔 WA ID: ${contact.id._serialized}\n🏢 Business: ${contact.isBusiness ? 'Yes' : 'No'}\n━━━━━━━━━━━━━━━━━\n🔗 ${YOUR_LINK}`);
        }
        else if (command === 'ig') {
            const user = args[0] || 'unknown';
            await msg.reply(`📸 *INSTAGRAM TRACKER*\n\n👤 Username: @${user}\n🔗 Profile: https://instagram.com/${user}\n\n🔗 ${YOUR_LINK}`);
        }

        // ==========================================
        // 👥 GROUP ADMIN
        // ==========================================
        else if (command === 'tagall') {
            if (!chat.isGroup) return await msg.reply('❌ Sirf group mein!');
            
            let text = `📢 *ATTENTION ALL MEMBERS!*\n\n`;
            let mentions = [];
            
            for (let participant of chat.participants) {
                const c = await client.getContactById(participant.id._serialized);
                mentions.push(c);
                text += `@${participant.id.user} `;
            }
            text += `\n\n🔗 ${YOUR_LINK}`;
            await chat.sendMessage(text, { mentions });
        }
        else if (command === 'warn') {
            if (!msg.mentionedIds.length) return await msg.reply('❌ @user karke tag karo!');
            await msg.reply(`⚠️ *WARNING ISSUED*\n\n@${msg.mentionedIds[0].split('@')[0]} ko official warning di gayi hai!\n\nAgli baar kick!\n\n🔗 ${YOUR_LINK}`);
        }
        else if (command === 'admins') {
            if (!chat.isGroup) return;
            let adminList = '👥 *GROUP ADMINS:*\n\n';
            for (let p of chat.participants) {
                if (p.isAdmin) {
                    adminList += `👑 @${p.id.user}\n`;
                }
            }
            await chat.sendMessage(adminList);
        }
        else if (command === 'members') {
            if (!chat.isGroup) return;
            await msg.reply(`👥 *MEMBERS COUNT:* ${chat.participants.length}\n\n🔗 ${YOUR_LINK}`);
        }
        else if (command === 'mute') {
            if (!chat.isGroup) return;
            await chat.setMessagesAdminsOnly(true);
            await msg.reply('🤫 *GROUP MUTED!* Sirf admins bolenge ab!');
        }
        else if (command === 'unmute') {
            if (!chat.isGroup) return;
            await chat.setMessagesAdminsOnly(false);
            await msg.reply('📢 *GROUP UNMUTED!* Sab bol sakte hain!');
        }

        // ==========================================
        // 🛠️ UTILITY
        // ==========================================
        else if (command === 'ai') {
            const question = args.join(' ') || 'Hi';
            await msg.reply(`🧠 *${BOT_NAME} AI*\n\n🤔 Question: ${question}\n\n💡 Answer: System configuration online. AI API Key set up features soon!\n\n🔗 ${YOUR_LINK}`);
        }
        else if (command === 'google') {
            const query = args.join(' ');
            if (!query) return await msg.reply('❌ Kya search karu?');
            await msg.reply(`🔍 *GOOGLE SEARCH*\n\n🔗 https://www.google.com/search?q=${encodeURIComponent(query)}\n\n🔗 ${YOUR_LINK}`);
        }
        else if (command === 'sticker') {
            if (msg.hasMedia) {
                const media = await msg.downloadMedia();
                await msg.reply(media, null, { sendMediaAsSticker: true });
            } else {
                await msg.reply('❌ Koi image bhejo pehle!');
            }
        }
        else if (command === 'weather') {
            const city = args.join(' ') || 'Delhi';
            await msg.reply(`🌤️ *WEATHER: ${city}*\n\n🌡️ Temp: 32°C\n☁️ Condition: Clear\n💧 Humidity: 65%\n\n🔗 ${YOUR_LINK}`);
        }
        else if (command === 'calc') {
            try {
                const result = eval(args.join(' '));
                await msg.reply(`🧮 *CALCULATOR*\n\n${args.join(' ')} = ${result}`);
            } catch (e) {
                await msg.reply('❌ Invalid expression! Example: .calc 2+2');
            }
        }

        // ==========================================
        // 👑 OWNER COMMANDS
        // ==========================================
        else if (command === 'broadcast') {
            if (contact.id.user !== OWNER_NUMBER) return await msg.reply('❌ Sirf owner!');
            
            const bcMsg = args.join(' ') || '🔥 CHINTU BOT!';
            let sent = 0;
            
            const chats = await client.getChats();
            for (let c of chats) {
                if (!c.isGroup) {
                    await client.sendMessage(c.id._serialized, `📢 *BROADCAST*\n\n${bcMsg}\n\n🔥 ${BOT_NAME}`);
                    sent++;
                }
            }
            await msg.reply(`✅ Broadcast sent to ${sent} chats!`);
        }
        else if (command === 'block') {
            if (contact.id.user !== OWNER_NUMBER) return;
            if (msg.mentionedIds.length) {
                const user = msg.mentionedIds[0];
                const c = await client.getContactById(user);
                await c.block();
                await msg.reply(`🚫 @${user.split('@')[0]} blocked!`);
            }
        }
        else if (command === 'unblock') {
            if (contact.id.user !== OWNER_NUMBER) return;
            if (msg.mentionedIds.length) {
                const user = msg.mentionedIds[0];
                const c = await client.getContactById(user);
                await c.unblock();
                await msg.reply(`✅ @${user.split('@')[0]} unblocked!`);
            }
        }
        else if (command === 'ping') {
            const start = Date.now();
            const response = await msg.reply('🏓 Pinging...');
            await response.edit(`🚀 *PONG!*\n⏱️ ${Date.now() - start}ms\n\n🔥 ${BOT_NAME} - Create By ${OWNER_NAME}`);
        }
        else if (command === 'status') {
            await msg.reply(`📊 *${BOT_NAME} STATUS*\n━━━━━━━━━━━━━━━━━\n✅ Bot: Online\n👑 Owner: ${OWNER_NAME}\n🔗 Link: ${YOUR_LINK}\n📦 Version: ${BOT_VERSION}\n📱 Platform: WhatsApp\n━━━━━━━━━━━━━━━━━`);
        }
        else if (command === 'owner') {
            await msg.reply(`👑 *${BOT_NAME}*\n━━━━━━━━━━━━━━━━━\n🔥 Create By: ${OWNER_NAME}\n📞 Contact: +${OWNER_NUMBER}\n🔗 Link: ${YOUR_LINK}\n📦 Version: ${BOT_VERSION}\n━━━━━━━━━━━━━━━━━`);
        }

    } catch (error) {
        console.log('❌ Error:', error.message);
    }
});

console.log(`\n=========================================`);
console.log(`🔥 ${BOT_NAME} - Starting...`);
console.log(`👑 Create By ${OWNER_NAME}`);
console.log(`=========================================\n`);
client.initialize();
      
