const { Client, LocalAuth } = require('whatsapp-web.js');
const express = require('express');
const qrcode = require('qrcode-terminal');
const fs = require('fs');

// ==========================================
// 🌐 PORT VERIFICATION (ANTI-CRASH)
// ==========================================
const app = express();
const PORT = process.env.PORT || 3000;
app.get('/', (req, res) => res.send('👑 CHINTU BOT - KHATRNAK EDITION 🔥'));
app.listen(PORT, () => console.log(`🌐 Port: ${PORT}`));

// ==========================================
// 🚀 CONFIG
// ==========================================
const YOUR_LINK = "https://urlshort.at/Hackingtool";
const OWNER_NUMBER = "919412185706";
const OWNER_NAME = "Chintu Bhai";
const BOT_NAME = "🔥 CHINTU KHATRNAK BOT";
const BOT_VERSION = "v4.0 🔥";

// ==========================================
// 🚀 CLIENT SETUP
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
            '--no-first-run',
            '--no-default-browser-check'
        ]
    }
});

// ==========================================
// 🔄 QR + PAIRING CODE
// ==========================================
let pairingCodeRequested = false;
client.on('qr', async (qr) => {
    if (!pairingCodeRequested) {
        pairingCodeRequested = true;
        console.log('\n📱 SCAN QR:');
        qrcode.generate(qr, { small: true });
        
        await new Promise(resolve => setTimeout(resolve, 15000));
        try {
            const code = await client.requestPairingCode(OWNER_NUMBER);
            console.log(`\n🔥 PAIRING CODE: [ ${code.toUpperCase()} ]\n`);
        } catch(e) {
            console.log('❌ Pairing failed, use QR');
        }
    }
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

        // ==========================================
        // 🔗 AUTO KEYWORD REPLY
        // ==========================================
        const TRIGGERS = [
            "tool", "hacking", "hack", "crack", "mod", "apk",
            "panel", "free fire", "ff", "headshot", "diamond",
            "hacker", "insta", "instagram", "password", "termux",
            "phishing", "virus", "rat", "spam", "bot", "script",
            "bypass", "exploit", "payload", "malware", "keylogger",
            "ddos", "course", "tutorial", "hacking course"
        ];

        for (let word of TRIGGERS) {
            if (lowerText.includes(word)) {
                await msg.reply(`🔥 **@${contact.pushname || 'Bhai'}**! 👋

✅ **${word.toUpperCase()}** ka **TOP-LEVEL TOOL** ready hai!

🔗 **${YOUR_LINK}**

⚡ Instant Download • Working 2026 • No Password

━━━━━━━━━━━━━━━━━
👑 ${BOT_NAME} - ${OWNER_NAME}`);
                return;
            }
        }

        // Greetings
        if (lowerText === 'hi' || lowerText === 'hello' || lowerText === 'namaste') {
            await msg.reply(`👋 Namaste **@${contact.pushname || 'Bro'}**!

🔥 Main hoon **${BOT_NAME}**
👑 Create By **${OWNER_NAME}**

📌 **${prefix}menu** - All commands
🔗 ${YOUR_LINK}`);
            return;
        }

        if (lowerText.includes('chintu') || lowerText.includes('owner')) {
            await msg.reply(`👑 **${OWNER_NAME}** ka ${BOT_NAME}!

📞 +${OWNER_NUMBER}
🔗 ${YOUR_LINK}`);
            return;
        }

        if (!body.startsWith(prefix)) return;

        const args = body.slice(prefix.length).trim().split(/ +/);
        const command = args.shift().toLowerCase();

        // ==========================================
        // 📜 MAIN MENU
        // ==========================================
        if (command === 'menu' || command === 'help') {
            const menu = `╔══════════════════════════╗
║ ${BOT_NAME}      ║
║ 👑 ${OWNER_NAME} ║
╚══════════════════════════╝

━━━━━━💀 KHATRNAK COMMANDS━━━━━━
┃ ${prefix}elite [name] - ELITE hacker name generator
┃ ${prefix}threat [name] - Threat simulation ⚠️
┃ ${prefix}nuke - Group nuke prank 💥
┃ ${prefix}chaos - Group chaos mode 😈
┃ ${prefix}raid [text] - Raid mode activated
┃ ${prefix}flood [text] [count] - Flood messages
┃ ${prefix}toxic [@user] - Toxic roast generator 🗿
┃ ${prefix}snipe [@user] - Sniper attack 🔫
┃ ${prefix}ghost - Ghost mode (fake leave) 👻

━━━━━━🔗 LINK GENERATOR━━━━━━
┃ ${prefix}link - Main link ✅
┃ ${prefix}elitelink - Elite hacker pack
┃ ${prefix}termuxlink - Termux bundle
┃ ${prefix}alllink - All links in one

━━━━━━🕵️ OSINT TRACKING━━━━━━
┃ ${prefix}ip [ip] - IP tracker 
┃ ${prefix}phone [num] - Phone lookup
┃ ${prefix}track [name] - Full OSINT scan
┃ ${prefix}dox [name] - Fake dox generator
┃ ${prefix}userinfo - Your details
┃ ${prefix}darkweb - Dark web scan simulation

━━━━━━👥 GROUP ADMIN━━━━━━
┃ ${prefix}tagall - Tag everyone 
┃ ${prefix}hide - Hide all admins
┃ ${prefix}warn [@user] - Warning
┃ ${prefix}kick [@user] - Kick member
┃ ${prefix}ban [@user] - Ban member
┃ ${prefix}admins - Admin list
┃ ${prefix}members - Member count
┃ ${prefix}mute - Lock group
┃ ${prefix}unmute - Unlock
┃ ${prefix}promote [@user] - Make admin
┃ ${prefix}demote [@user] - Remove admin
┃ ${prefix}clean - Delete all bot msgs

━━━━━━🛠️ UTILITY━━━━━━
┃ ${prefix}ping - Speed test
┃ ${prefix}sticker - Image to sticker
┃ ${prefix}ai [text] - Ask AI
┃ ${prefix}calc [exp] - Calculator
┃ ${prefix}google [q] - Google search
┃ ${prefix}quote - Random quote
┃ ${prefix}lyrics [song] - Song lyrics
┃ ${prefix}translate [lang] [text]

━━━━━━👑 OWNER ONLY━━━━━━
┃ ${prefix}broadcast [msg] - Bulk send
┃ ${prefix}block [@user] - Block user
┃ ${prefix}unblock [@user] - Unblock
┃ ${prefix}status - Bot status
┃ ${prefix}owner - Creator info
┃ ${prefix}restart - Restart bot
┃ ${prefix}reset - Reset all data

━━━━━━━━━━━━━━━━━
🔗 **${YOUR_LINK}**
━━━━━━━━━━━━━━━━━`;
            await msg.reply(menu);
        }

        // ==========================================
        // 💀 KHATRNAK COMMANDS
        // ==========================================
        else if (command === 'elite') {
            const name = args.join(' ') || contact.pushname || 'Unknown';
            const eliteNames = [
                `💀 Elite_${name}_X`, `🔥 ${name}_404`, `👑 King_${name}`,
                `⚡ ${name}_Hacker`, `🕵️ Agent_${name}`, `💻 Cyber_${name}`,
                `🔒 ${name}_Sec`, `🌐 Dark_${name}`, `⚠️ ${name}_Breach`,
                `🎯 ${name}_Hunter`, `🧠 ${name}_Neo`, `💀 ${name}_Zero`
            ];
            const chosen = eliteNames[Math.floor(Math.random() * eliteNames.length)];
            await msg.reply(`💀 **ELITE HACKER NAME GENERATOR**

🎯 Input: ${name}
✅ Your Elite Name: **${chosen}**

🔗 ${YOUR_LINK}`);
        }
        else if (command === 'threat') {
            const target = args.join(' ') || '@user';
            await msg.reply(`⚠️ **THREAT LEVEL: CRITICAL**

🎯 Target: ${target}
🔐 IP: 192.168.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}
📍 Location: Traced
📂 Data: Extracted

🔥 **You have been warned!**`);
        }
        else if (command === 'nuke') {
            if (!chat.isGroup) return;
            await msg.reply(`💥 **NUKE LAUNCHED**

☢️ Initializing... ████░░░░ 40%
☢️ Armed... ████████░░ 80%
☢️ **FIRED!** ████████████ 100%

💀 Group nuked! Prank tha bhai! 😂`);
        }
        else if (command === 'chaos') {
            if (!chat.isGroup) return;
            await msg.reply(`😈 **CHAOS MODE ACTIVATED**

┣ Spamming members... ✅
┣ Changing group icon... ✅
┣ Deleting all messages... ✅
┣ Overriding admin... ✅

🔥 Prank complete! Kuch nahi hua! 😂`);
        }
        else if (command === 'raid') {
            const text = args.join(' ') || 'RAID';
            await msg.reply(`🔥 **RAID MODE ACTIVATED**

🎯 Target: ${text}
👥 Raiders: 100+
⚡ Status: Raiding...

🔗 ${YOUR_LINK}`);
        }
        else if (command === 'flood') {
            if (args.length < 2) return await msg.reply('❌ .flood [text] [count]');
            const count = parseInt(args.pop());
            const text = args.join(' ');
            if (isNaN(count) || count > 30) return;
            
            let flood = `🌊 **FLOOD MODE**\n\n`;
            for (let i = 0; i < count; i++) flood += `${text}\n`;
            await msg.reply(flood);
        }
        else if (command === 'toxic') {
            const target = msg.mentionedIds[0] ? `@${msg.mentionedIds[0].split('@')[0]}` : args.join(' ') || '@user';
            const roasts = [
                `${target} teri skill dekh ke maza aa gaya!`,
                `${target} tu hacker nahi, ch**tiya hai!`,
                `${target} apna dimaag use kar le!`,
                `${target} tu group ka sabase weak link hai!`,
                `${target} teri coding dekh ke hansi aati hai!`
            ];
            await msg.reply(`🗿 **TOXIC ROAST**

${roasts[Math.floor(Math.random() * roasts.length)]}

🔗 ${YOUR_LINK}`);
        }
        else if (command === 'snipe') {
            const target = msg.mentionedIds[0] ? `@${msg.mentionedIds[0].split('@')[0]}` : args.join(' ') || 'Unknown';
            await msg.reply(`🔫 **SNIPER ATTACK**

🎯 Target: ${target}
🔭 Scope: Locked
💥 Headshot: ✅

🎯 ${target} eliminated! (Prank 😂)`);
        }
        else if (command === 'ghost') {
            if (!chat.isGroup) return;
            await msg.reply(`👻 **GHOST MODE ACTIVATED**

┣ Fake leaving group... 
┣ Hiding from members...
┣ Stealth mode: ON

👻 ${contact.pushname} has left the group

😈 Prank! Main abhi bhi hoon! 😂`);
        }

        // ==========================================
        // 🔗 LINK GENERATORS
        // ==========================================
        else if (command === 'link') {
            await msg.reply(`🔗 **MAIN LINK**

✅ ${YOUR_LINK}

🔥 ${BOT_NAME} - ${OWNER_NAME}`);
        }
        else if (command === 'elitelink') {
            await msg.reply(`💀 **ELITE HACKER PACK**

✅ ${YOUR_LINK}

🔥 Premium tools: RAT, Keylogger, Phishing, DDoS, SQLi`);
        }
        else if (command === 'termuxlink') {
            await msg.reply(`💻 **TERMUX BUNDLE**

✅ ${YOUR_LINK}

🔥 Scripts: Zphisher, TBomb, IPGeo, RouterSploit`);
        }
        else if (command === 'alllink') {
            await msg.reply(`🔗 **ALL LINKS IN ONE**

✅ ${YOUR_LINK}

🔥 Sab kuch ek jagah!

━━━━━━━━━━━━━━
🔥 ${BOT_NAME} - ${OWNER_NAME}`);
        }

        // ==========================================
        // 🕵️ OSINT
        // ==========================================
        else if (command === 'ip') {
            const ip = args[0] || '8.8.8.8';
            await msg.reply(`🌐 *IP TRACKER*

🎯 IP: ${ip}
🌍 Country: India
🏙️ City: Delhi
📡 ISP: Jio
📌 Location: 28.61°N, 77.23°E

🔗 ${YOUR_LINK}`);
        }
        else if (command === 'phone') {
            const num = args[0] || '+919999999999';
            await msg.reply(`📞 *PHONE LOOKUP*

📱 Number: ${num}
🌍 Country: India
🏢 Carrier: Jio
✅ Status: Active

🔗 ${YOUR_LINK}`);
        }
        else if (command === 'track') {
            const name = args.join(' ') || 'Unknown';
            await msg.reply(`🕵️ *FULL OSINT SCAN ON ${name}*

┣ 📱 Phone: +91-XXXXXXXXXX
┣ 📧 Email: ${name.toLowerCase().replace(/ /g,'')}@gmail.com
┣ 🌐 IP: 192.168.1.${Math.floor(Math.random()*255)}
┣ 📍 Location: Delhi, India
┣ 🔗 Social: Found on 5 platforms

🔗 ${YOUR_LINK}`);
        }
        else if (command === 'dox') {
            const name = args.join(' ') || 'Unknown';
            await msg.reply(`📄 *DOX GENERATOR (FAKE)*

👤 Name: ${name}
📱 Phone: +91-${Math.floor(Math.random()*9000000000)+1000000000}
📧 Email: ${name.toLowerCase().replace(/ /g,'')}@gmail.com
📍 Address: Delhi, India
🏢 DOB: ${Math.floor(Math.random()*28)+1}/${Math.floor(Math.random()*12)+1}/199${Math.floor(Math.random()*9)}

⚠️ FAKE DATA - SIRF PRANK KE LIYE!`);
        }
        else if (command === 'userinfo') {
            await msg.reply(`🕵️ *YOUR INFO*

👤 Name: ${contact.pushname || 'Unknown'}
📱 Number: ${contact.id.user}
🆔 WA ID: ${contact.id._serialized}
🏢 Business: ${contact.isBusiness ? 'Yes' : 'No'}

🔗 ${YOUR_LINK}`);
        }
        else if (command === 'darkweb') {
            await msg.reply(`🌑 *DARK WEB SCAN*

┣ Scanning dark web for your data...
┣ 🔴 CRITICAL: Your data found on 3 sites!
┣ 🔗 ${YOUR_LINK}

⚠️ Prank simulation!`);
        }

        // ==========================================
        // 👥 GROUP ADMIN
        // ==========================================
        else if (command === 'tagall') {
            if (!chat.isGroup) return;
            let text = `📢 *ATTENTION ALL*\n\n`;
            let mentions = [];
            for (let p of chat.participants) {
                const c = await client.getContactById(p.id._serialized);
                mentions.push(c);
                text += `@${p.id.user} `;
            }
            text += `\n\n🔗 ${YOUR_LINK}`;
            await chat.sendMessage(text, { mentions });
        }
        else if (command === 'hide') {
            if (!chat.isGroup) return;
            await msg.reply('👻 *ADMIN HIDE MODE*\n\nAdmins ab invisible mode mein hain! (Prank)');
        }
        else if (command === 'warn') {
            if (!msg.mentionedIds.length) return;
            await msg.reply(`⚠️ *WARNING*

@${msg.mentionedIds[0].split('@')[0]} ko official warning!
Agli baar kick!`);
        }
        else if (command === 'kick') {
            if (!chat.isGroup || !msg.mentionedIds.length) return;
            await chat.removeParticipants([msg.mentionedIds[0]]);
            await msg.reply('✅ Kicked!');
        }
        else if (command === 'ban') {
            if (!chat.isGroup || !msg.mentionedIds.length) return;
            await chat.removeParticipants([msg.mentionedIds[0]]);
            await msg.reply(`🚫 @${msg.mentionedIds[0].split('@')[0]} banned!`);
        }
        else if (command === 'admins') {
            if (!chat.isGroup) return;
            let list = '👑 *ADMINS*\n\n';
            for (let p of chat.participants) {
                if (p.isAdmin) {
                    list += `👑 @${p.id.user}\n`;
                }
            }
            await chat.sendMessage(list);
        }
        else if (command === 'members') {
            if (!chat.isGroup) return;
            await msg.reply(`👥 *Members:* ${chat.participants.length}`);
        }
        else if (command === 'mute') {
            if (!chat.isGroup) return;
            await chat.setMessagesAdminsOnly(true);
            await msg.reply('🤫 *MUTED!* Sirf admin!');
        }
        else if (command === 'unmute') {
            if (!chat.isGroup) return;
            await chat.setMessagesAdminsOnly(false);
            await msg.reply('📢 *UNMUTED!* Sab bol sakte!');
        }
        else if (command === 'promote') {
            if (!chat.isGroup || !msg.mentionedIds.length) return;
            await chat.promoteParticipants([msg.mentionedIds[0]]);
            await msg.reply(`👑 @${msg.mentionedIds[0].split('@')[0]} promoted!`);
        }
        else if (command === 'demote') {
            if (!chat.isGroup || !msg.mentionedIds.length) return;
            await chat.demoteParticipants([msg.mentionedIds[0]]);
            await msg.reply(`⬇️ @${msg.mentionedIds[0].split('@')[0]} demoted!`);
        }
        else if (command === 'clean') {
            if (!chat.isGroup) return;
            await msg.reply('🧹 *Cleaning bot messages...*\n\n✅ Done! (Baki manual karo)');
        }

        // ==========================================
        // 🛠️ UTILITY
        // ==========================================
        else if (command === 'ping') {
            const start = Date.now();
            const res = await msg.reply('🏓 Pinging...');
            await res.edit(`🚀 *PONG!* ⏱ ${Date.now()-start}ms

🔥 ${BOT_NAME}`);
        }
        else if (command === 'sticker') {
            if (msg.hasMedia) {
                const media = await msg.downloadMedia();
                await msg.reply(media, null, { sendMediaAsSticker: true, stickerName: BOT_NAME, stickerAuthor: OWNER_NAME });
            } else {
                await msg.reply('❌ Pehle image bhejo!');
            }
        }
        else if (command === 'ai') {
            const question = args.join(' ') || 'Hi';
            await msg.reply(`🧠 *${BOT_NAME} AI*

🤔 You: ${question}
💡 AI: Processing... AI module coming soon!

🔗 ${YOUR_LINK}`);
        }
        else if (command === 'calc') {
            try {
                await msg.reply(`🧮 Result: ${eval(args.join(' '))}`);
            } catch {
                await msg.reply('❌ .calc 2+2');
            }
        }
        else if (command === 'google') {
            const q = args.join(' ');
            if (!q) return;
            await msg.reply(`🔍 https://www.google.com/search?q=${encodeURIComponent(q)}`);
        }
        else if (command === 'quote') {
            const q = [
                "Hack the planet! 🔥",
                "With great power comes great responsibility!",
                `${OWNER_NAME} ka bot zabardast hai!`,
                "Security is an illusion!",
                "Code is poetry!",
                "Stay anonymous! Stay safe!",
                "Learn, Hack, Repeat!",
                "The matrix has you...",
                "There is no spoon!",
                "Wake up, Neo!"
            ];
            await msg.reply(`💬 *RANDOM QUOTE*\n\n"${q[Math.floor(Math.random()*q.length)]}"`);
        }
        else if (command === 'lyrics') {
            const song = args.join(' ') || 'unknown';
            await msg.reply(`🎵 *LYRICS: ${song}*\n\nFetching lyrics...\n\n🔗 https://genius.com/search?q=${encodeURIComponent(song)}`);
        }
        else if (command === 'translate') {
            await msg.reply(`🌐 *TRANSLATE*\n\nComing soon! 🔄\n\n🔗 ${YOUR_LINK}`);
        }

        // ==========================================
        // 👑 OWNER ONLY
        // ==========================================
        else if (command === 'broadcast') {
            if (contact.id.user !== OWNER_NUMBER) return;
            const bc = args.join(' ') || '🔥 CHINTU BOT ONLINE!';
            let sent = 0;
            const chats = await client.getChats();
            for (let c of chats) {
                if (!c.isGroup) {
                    await client.sendMessage(c.id._serialized, `📢 *BROADCAST*\n\n${bc}\n\n🔥 ${BOT_NAME}`);
                    sent++;
                }
            }
            await msg.reply(`✅ Sent to ${sent} chats!`);
        }
        else if (command === 'block') {
            if (contact.id.user !== OWNER_NUMBER || !msg.mentionedIds.length) return;
            await (await client.getContactById(msg.mentionedIds[0])).block();
            await msg.reply('🚫 Blocked!');
        }
        else if (command === 'unblock') {
            if (contact.id.user !== OWNER_NUMBER || !msg.mentionedIds.length) return;
            await (await client.getContactById(msg.mentionedIds[0])).unblock();
            await msg.reply('✅ Unblocked!');
        }
        else if (command === 'status') {
            await msg.reply(`📊 *${BOT_NAME}*

✅ ONLINE 🔥
👑 ${OWNER_NAME}
🔗 ${YOUR_LINK}
📦 ${BOT_VERSION}`);
        }
        else if (command === 'owner') {
            await msg.reply(`👑 **${BOT_NAME}**

🔥 ${OWNER_NAME}
📞 +${OWNER_NUMBER}
🔗 ${YOUR_LINK}`);
        }
        else if (command === 'restart') {
            if (contact.id.user !== OWNER_NUMBER) return;
            await msg.reply('🔄 Restarting...');
            process.exit(0);
        }
        else if (command === 'reset') {
            if (contact.id.user !== OWNER_NUMBER) return;
            await msg.reply('🔄 Resetting all data...');
            fs.rmSync('./.wwebjs_auth', { recursive: true, force: true });
            process.exit(0);
        }

    } catch (e) { console.log(e.message); }
});

console.log(`\n🔥 ${BOT_NAME}`);
console.log(`👑 ${OWNER_NAME}`);
console.log(`🔗 ${YOUR_LINK}\n`);
client.initialize();
