const { Client, LocalAuth } = require('whatsapp-web.js');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;
app.get('/', (req, res) => res.send('🔥 CHINTU DANGER BOT - ELITE EDITION 🔥'));
app.listen(PORT, () => console.log(`🌐 Port: ${PORT}`));

const YOUR_LINK = "https://urlshort.at/Hackingtool";
const OWNER_NUMBER = "919412185706";
const OWNER_NAME = "Chintu Bhai";
const BOT_NAME = "💀 CHINTU DANGER ELITE BOT";
const BOT_VERSION = "v6.9";

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        executablePath: '/usr/bin/chromium',
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-gpu',
            '--no-first-run'
        ]
    }
});

// QR event में बिना रुके तुरंत पेयरिंग कोड रिक्वेस्ट करेगा
client.on('qr', async (qr) => {
    console.log('\n📱 Generating Pairing Code for WhatsApp...');
    try {
        const code = await client.requestPairingCode(OWNER_NUMBER);
        console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
        console.log(`🔥 YOUR PAIRING CODE: [ ${code.toUpperCase()} ] 🔥`);
        console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);
    } catch(e) {
        console.log("❌ Pairing code request failed, retrying...", e.message);
    }
});

client.on('ready', () => {
    console.log(`\n✅ ${BOT_NAME} ONLINE! 🔥`);
    console.log(`👑 ${OWNER_NAME}`);
    console.log(`🔗 ${YOUR_LINK}\n`);
});

client.on('message', async (msg) => {
    try {
        const body = msg.body.trim();
        const lowerText = body.toLowerCase();
        const prefix = '.';
        const chat = await msg.getChat();
        const contact = await msg.getContact();

        const TRIGGERS = [
            "tool", "hacking", "hack", "crack", "mod", "apk",
            "panel", "free fire", "ff", "headshot", "diamond",
            "hacker", "insta", "instagram", "password", "termux",
            "phishing", "virus", "rat", "spam", "bot", "script",
            "bypass", "exploit", "payload", "malware", "keylogger",
            "ddos", "course", "tutorial", "ethical", "penetration"
        ];

        for (let word of TRIGGERS) {
            if (lowerText.includes(word)) {
                await msg.reply(`🔥 **@${contact.pushname || 'Bhai'}**!

✅ **${word.toUpperCase()}** ka **ELITE TOOL** ready hai!

🔗 **${YOUR_LINK}**

⚡ Instant Download • No Password • 100% Working

━━━━━━━━━━━━━━━━━
👑 ${BOT_NAME} - ${OWNER_NAME}`);
                return;
            }
        }

        if (lowerText === 'hi' || lowerText === 'hello' || lowerText === 'namaste') {
            await msg.reply(`👋 Namaste **${contact.pushname || 'Bro'}**!
🔥 ${BOT_NAME}
📌 **${prefix}menu** - All commands
👑 ${OWNER_NAME}`);
            return;
        }

        if (lowerText.includes('chintu') || lowerText.includes('owner')) {
            await msg.reply(`👑 **${OWNER_NAME}** THE KING! 
📞 +${OWNER_NUMBER}
🔗 ${YOUR_LINK}`);
            return;
        }

        if (!body.startsWith(prefix)) return;

        const args = body.slice(prefix.length).trim().split(/ +/);
        const command = args.shift().toLowerCase();

        if (command === 'menu' || command === 'help') {
            const menu = `╔══════════════════════════╗
║ ${BOT_NAME}      ║
║ 👑 ${OWNER_NAME} ║
╚══════════════════════════╝

━━━━💀 DANGER ZONE (17)━━━━
┃ ${prefix}hack [name] - Hack simulation
┃ ${prefix}nuke - Group nuke prank ☢️
┃ ${prefix}destroy - Destroy group
┃ ${prefix}chaos - Chaos mode 😈
┃ ${prefix}virus - Virus simulation
┃ ${prefix}malware - Malware alert
┃ ${prefix}ransomware - Ransomware sim
┃ ${prefix}ddos [target] - DDoS attack sim
┃ ${prefix}phishing - Phishing tools
┃ ${prefix}keylogger - Keylogger panel
┃ ${prefix}rat - RAT access panel
┃ ${prefix}spy - Spyware alert
┃ ${prefix}breach - Data breach sim
┃ ${prefix}crack [software] - Crack gen
┃ ${prefix}exploit [target] - Exploit sim
┃ ${prefix}payload - Payload builder
┃ ${prefix}backdoor - Backdoor install

━━━━💥 EXTREME PRANKS (16)━━
┃ ${prefix}raid [text] - Raid mode
┃ ${prefix}flood [t] [n] - Flood messages
┃ ${prefix}toxic [@user] - Toxic roast 🗿
┃ ${prefix}snipe [@user] - Sniper 🔫
┃ ${prefix}ghost - Ghost mode 👻
┃ ${prefix}threat [name] - Threat ⚠️
┃ ${prefix}elite [name] - Elite name gen
┃ ${prefix}swat [name] - SWAT raid sim 🚨
┃ ${prefix}bomb [name] - Bomb threat sim 💣
┃ ${prefix}kidnap [name] - Kidnap sim
┃ ${prefix}arrest [name] - Arrest sim 🚔
┃ ${prefix}bullet [name] - Bullet sim 🔫
┃ ${prefix}poison [name] - Poison sim ☠️
┃ ${prefix}stalk [name] - Stalker mode
┃ ${prefix}hunt [name] - Bounty hunt
┃ ${prefix}kill [name] - Kill sim 💀

━━🔥 LINK GENERATOR (7)━━
┃ ${prefix}link - Main link ✅
┃ ${prefix}hacklink - Hacking pack
┃ ${prefix}fflink - Free Fire hacks
┃ ${prefix}instalink - Insta tools
┃ ${prefix}termlink - Termux scripts
┃ ${prefix}pdflink - PDF tutorials
┃ ${prefix}alllink - All links

━━🕵️ OSINT TRACKING (12)━━
┃ ${prefix}ip [ip] - IP tracker
┃ ${prefix}phone [num] - Phone lookup
┃ ${prefix}email [email] - Email OSINT
┃ ${prefix}track [name] - Full OSINT scan
┃ ${prefix}dox [name] - Dox gen (fake)
┃ ${prefix}geo [ip] - Geo location
┃ ${prefix}userinfo - Your details
┃ ${prefix}darkweb - Dark web scan
┃ ${prefix}device - Device info
┃ ${prefix}network - Network scan
┃ ${prefix}port [ip] - Port scanner
┃ ${prefix}whois [domain] - Whois lookup

━━👥 GROUP ADMIN (15)━━
┃ ${prefix}tagall - Tag all members
┃ ${prefix}warn [@user] - Warning
┃ ${prefix}kick [@user] - Kick member
┃ ${prefix}ban [@user] - Ban member
┃ ${prefix}unban [@user] - Unban
┃ ${prefix}admins - List admins
┃ ${prefix}members - Count members
┃ ${prefix}mute - Lock group
┃ ${prefix}unmute - Unlock
┃ ${prefix}promote [@user] - Make admin
┃ ${prefix}demote [@user] - Remove admin
┃ ${prefix}clean - Clean bot msgs
┃ ${prefix}hide - Hide admin
┃ ${prefix}slow - Slow mode on
┃ ${prefix}nsfw - NSFW toggle

━━🛠️ UTILITY (18)━━
┃ ${prefix}ping - Speed test
┃ ${prefix}sticker - Image to sticker
┃ ${prefix}ai [text] - AI assistant
┃ ${prefix}calc [exp] - Calculator
┃ ${prefix}google [q] - Google search
┃ ${prefix}quote - Random quote
┃ ${prefix}lyrics [song] - Song lyrics
┃ ${prefix}weather [city] - Weather
┃ ${prefix}translate [t] - Translate
┃ ${prefix}short [url] - URL shortener
┃ ${prefix}qr [text] - QR generator
┃ ${prefix}password [len] - Password gen
┃ ${prefix}hash [text] - Hash generator
┃ ${prefix}base64 [text] - Base64 encode
┃ ${prefix}time [city] - World time
┃ ${prefix}news - Latest news
┃ ${prefix}fact - Random fact
┃ ${prefix}joke - Random joke

━━👑 OWNER (11)━━
┃ ${prefix}broadcast [msg] - Bulk send
┃ ${prefix}block [@user] - Block user
┃ ${prefix}unblock [@user] - Unblock
┃ ${prefix}status - Bot status
┃ ${prefix}owner - Creator info
┃ ${prefix}restart - Restart bot
┃ ${prefix}reset - Reset session
┃ ${prefix}eval [code] - Execute code
┃ ${prefix}logs - View recent logs
┃ ${prefix}say [msg] - Say as bot
┃ ${prefix}group broadcast - Group blast

━━━━━━━━━━━━━━━━━
🔗 **${YOUR_LINK}**
━━━━━━━━━━━━━━━━━`;
            await msg.reply(menu);
        }

        else if (command === 'hack') {
            const target = args.join(' ') || 'Unknown';
            await msg.reply(`🕵️ REMOTE HACK INITIATED
🎯 Target: ${target}
⚙️ Bypassing firewall... 0%
🔓 Porting SSH... 45%
📂 Extracting data... 80%`);
            setTimeout(async () => {
                await client.sendMessage(msg.from, `🔥 HACK SUCCESSFUL!
✅ Full access gained to ${target}!
📂 Data dumped: ${YOUR_LINK}`);
            }, 4000);
        }
        else if (command === 'nuke') {
            if (!chat.isGroup) return;
            await msg.reply(`☢️ NUKE LAUNCH SEQUENCE
█░░░░░ 10% - Arming...
███░░░ 30% - Targeting...
█████░ 50% - Calculating yield...
██████ 70% - Armed!
███████ 100% - LAUNCHED!

💥💥 BOOOOM! 💥💥

🔥 Prank ho gaya! 😂`);
        }
        else if (command === 'destroy') {
            if (!chat.isGroup) return;
            await msg.reply(`💀 DESTROY SEQUENCE
┣ Removing all members... ✅
┣ Deleting messages... ✅
┣ Overriding admin... ✅
┣ Formatting database... ✅

🔥 Prank! Group safe hai! 😂`);
        }
        else if (command === 'chaos') {
            if (!chat.isGroup) return;
            await msg.reply(`😈 CHAOS MODE ACTIVATED
┣ Spamming all members
┣ Changing group icon
┣ Renaming everyone
┣ Deleting all media

🔥 Prank complete! Kuch nahi hua! 😂`);
        }
        else if (command === 'virus') {
            await msg.reply(`☣️ VIRUS LOADING...
\`\`\`
01010110 01001001 01010010 01010101 01010011
01001100 01001111 01000001 01000100 01001001 01001110 01000111
\`\`\`
⚠️ Prank! Fake virus simulation!`);
        }
        else if (command === 'malware') {
            await msg.reply(`🦠 MALWARE ALERT!
Type: Trojan.RAT.${Math.random().toString(36).substring(7)}
Threat: Critical
Action: Quarantined

⚠️ Prank! Safe hai!`);
        }
        else if (command === 'ransomware') {
            await msg.reply(`🔒 RANSOMWARE DETECTED!
Files encrypted: 69
Bitcoin required: 0.01 BTC
Time remaining: 72:00:00

⚠️ Prank! Kuch nahi hua! 😂`);
        }
        else if (command === 'ddos') {
            const target = args[0] || 'target.com';
            await msg.reply(`💥 DDoS ATTACK: ${target}
┣ Packets sent: 69,420
┣ Bandwidth: 1 TB/s
┣ Status: FLOODING
┣ Server: OFFLINE✅

📥 Download script: ${YOUR_LINK}`);
        }
        else if (command === 'phishing') {
            await msg.reply(`🎣 PHISHING PANEL
1️⃣ Zphisher - FB/Insta/Google pages
2️⃣ MaskPhish - URL masking
3️⃣ MaxPhisher - Advanced panel

📥 git clone https://github.com/htr-tech/zphisher
🔗 ${YOUR_LINK}`);
        }
        else if (command === 'keylogger') {
            await msg.reply(`⌨️ KEYLOGGER PANEL
Status: Active 🟢
Target: Unknown
Keys logged: 0
Last capture: N/A

📥 Download: ${YOUR_LINK}`);
        }
        else if (command === 'rat') {
            await msg.reply(`🐚 RAT ACCESS PANEL
┣ Connection: Established
┣ Shell: Active
┣ Screen: Captured
┣ Camera: ON

📥 Deploy payload: ${YOUR_LINK}`);
        }
        else if (command === 'spy') {
            await msg.reply(`🕵️ SPYWARE ACTIVE
┣ Microphone: ON 🎤
┣ Camera: ON 📷
┣ GPS: Tracking 📍
┣ Messages: Reading 📱

⚠️ Prank simulation!`);
        }
        else if (command === 'breach') {
            await msg.reply(`🔴 DATA BREACH DETECTED
┣ Database: 1.2M records leaked
┣ Emails: ${contact.id.user}@gmail.com
┣ Passwords: Hashed
┣ Credit Cards: 6,942 exposed

⚠️ FAKE ALERT! Prank!`);
        }
        else if (command === 'crack') {
            const software = args.join(' ') || 'Unknown';
            await msg.reply(`🔓 CRACKING: ${software}
┣ Searching license keys...
┣ Bypassing activation...
┣ ✅ CRACKED: ${software} activated!

📥 ${YOUR_LINK}`);
        }
        else if (command === 'exploit') {
            const target = args.join(' ') || 'Unknown';
            await msg.reply(`💉 EXPLOITING: ${target}
┣ CVE-2024-${Math.floor(Math.random()*9999)}
┣ Buffer overflow: SUCCESS
┣ Shell obtained: root@${target}

📥 ${YOUR_LINK}`);
        }
        else if (command === 'payload') {
            await msg.reply(`📦 PAYLOAD BUILDER
┣ Type: Reverse TCP
┣ LHOST: ${OWNER_NUMBER.slice(0,5)}.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}
┣ LPORT: 4444
┣ Format: .exe (FUD 0/70)

📥 ${YOUR_LINK}`);
        }
        else if (command === 'backdoor') {
            await msg.reply(`🚪 BACKDOOR INSTALLED
┣ Persistence: ✅
┣ Rootkit: Deployed
┣ Hidden user: admin$
┣ C2 Server: Connected

📥 ${YOUR_LINK}`);
        }

        else if (command === 'raid') {
            const text = args.join(' ') || 'RAID';
            await msg.reply(`🔥 RAID MODE: ${text}
👥 Raiders: 1,337
⚡ Attacking...`);
        }
        else if (command === 'flood') {
            if (args.length < 2) return;
            const count = Math.min(parseInt(args.pop()), 50);
            const text = args.join(' ');
            let flood = `🌊 FLOOD x${count}\n\n`;
            for (let i=0; i<count; i++) flood += `${text}\n`;
            await msg.reply(flood);
        }
        else if (command === 'toxic') {
            const target = msg.mentionedIds[0] ? `@${msg.mentionedIds[0].split('@')[0]}` : args.join(' ') || 'Unknown';
            const roasts = [
                `${target} teri aukaat nahi hai yahan!`,
                `${target} tu group ka sabse weak hai!`,
                `${target} apna dimaag use kar!`,
                `${target} teri skill dekh ke ro aaya!`,
                `${target} tu hacker nahi, bakwas hai!`,
                `${target} hat yahan se!`,
                `${target} teri coding dekh ke hasi aati hai!`,
                `${target} tu to nikla chutiya!`,
                `${target} group ka lanba chor!`,
                `${target} teri maa ko bhi hacking sikhale!`
            ];
            await msg.reply(`🗿 ROAST: ${roasts[Math.floor(Math.random()*roasts.length)]}`);
        }
        else if (command === 'snipe') {
            const target = msg.mentionedIds[0] ? `@${msg.mentionedIds[0].split('@')[0]}` : args.join(' ') || 'Unknown';
            await msg.reply(`🔫 SNIPER ACTIVE
🎯 Target locked: ${target}
🌡️ Wind: 12km/h NW
💥 HEADSHOT! ✅

Target eliminated! (Prank)`);
        }
        else if (command === 'ghost') {
            if (!chat.isGroup) return;
            await msg.reply(`👻 ${contact.pushname || 'Ghost'} has left the group

😈 Prank! Abhi bhi hoon!`);
        }
        else if (command === 'threat') {
            const target = args.join(' ') || 'Unknown';
            await msg.reply(`⚠️ THREAT LEVEL: CRITICAL
🎯 Target: ${target}
🔐 IP logged: ${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}
📍 Location: Traced
📂 Files: Extracted

You have been WARNED!`);
        }
        else if (command === 'elite') {
            const name = args.join(' ') || contact.pushname;
            const elite = [
                `💀 ${name}_X`, `🔥 Elite_${name}`, `👑 King_${name}`,
                `⚡ ${name}_404`, `🕵️ Agent_${name}`, `💻 Cyber_${name}`,
                `🌐 Dark_${name}`, `🔒 ${name}_Sec`, `🎯 ${name}_Hunter`
            ];
            await msg.reply(`💀 ELITE NAME: ${elite[Math.floor(Math.random()*elite.length)]}`);
        }
        else if (command === 'swat') {
            const target = args.join(' ') || 'Unknown';
            await msg.reply(`🚨 SWAT RAID: ${target}
┣ Units: 12 deployed
┣ Helicopter: Airborne
┣ Breaching: 3... 2... 1...
┣ SUSPECT NEUTRALIZED

⚠️ Prank! Kuch nahi hua!`);
        }
        else if (command === 'bomb') {
            const target = args.join(' ') || 'Unknown';
            await msg.reply(`💣 BOMB THREAT: ${target}
⏱️ Timer: 10:00... 9:59... 9:58...
💥 DEFUSED!

⚠️ Prank simulation!`);
        }
        else if (command === 'kidnap') {
            const target = args.join(' ') || 'Unknown';
            await msg.reply(`🔒 ${target} KIDNAPPED!
💰 Ransom: 1 BTC
📍 Location: Classified
⏱️ Time: 24 hours

⚠️ FAKE PRANK!`);
        }
        else if (command === 'arrest') {
            const target = args.join(' ') || 'Unknown';
            await msg.reply(`🚔 FBI OPEN UP!
🔫 ${target} you are under arrest!
📋 Charges: Cyber crime, Hacking
🔗 ${YOUR_LINK}`);
        }
        else if (command === 'bullet') {
            const target = args.join(' ') || 'Unknown';
            await msg.reply(`🔫 BULLET TO: ${target}
💥 Target hit! (Prank)`);
        }
        else if (command === 'poison') {
            const target = args.join(' ') || 'Unknown';
            await msg.reply(`☠️ ${target} POISONED!
💀 HP: 100 → 0
☠️ FATAL! (Prank)`);
        }
        else if (command === 'stalk') {
            const target = args.join(' ') || 'Unknown';
            await msg.reply(`👁️ STALKING: ${target}
┣ Last seen: 2 min ago
┣ Location: Delhi
┣ Online: Yes
┣ IP: 192.168.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}`);
        }
        else if (command === 'hunt') {
            const target = args.join(' ') || 'Unknown';
            await msg.reply(`🎯 BOUNTY HUNT: ${target}
💰 Reward: $69,420
👥 Hunters: 1337
🔄 Tracking...

(Prank simulation)`);
        }
        else if (command === 'kill') {
            const target = args.join(' ') || 'Unknown';
            await msg.reply(`💀 KILL SEQUENCE: ${target}
┣ Aiming... 
┣ Firing...
┣ 💀 Target neutralized!

⚠️ FAKE PRANK!`);
        }

        else if (command === 'link') await msg.reply(`🔗 MAIN LINK\n✅ ${YOUR_LINK}\n🔥 ${BOT_NAME}`);
        else if (command === 'hacklink') await msg.reply(`💀 HACKING PACK\n✅ ${YOUR_LINK}\n🔥 Includes: RAT, Keylogger, Phishing`);
        else if (command === 'fflink') await msg.reply(`🎮 FREE FIRE HACKS\n✅ ${YOUR_LINK}\n🔥 Headshot, ESP, Diamonds`);
        else if (command === 'instalink') await msg.reply(`📸 INSTAGRAM TOOLS\n✅ ${YOUR_LINK}\n🔥 Password crack, Report tool`);
        else if (command === 'termlink') await msg.reply(`💻 TERMUX SCRIPTS\n✅ ${YOUR_LINK}\n🔥 Zphisher, TBomb, IP tracker`);
        else if (command === 'pdflink') await msg.reply(`📄 PDF TUTORIALS\n✅ ${YOUR_LINK}\n🔥 Hacking, OSINT, Termux`);
        else if (command === 'alllink') await msg.reply(`🔗 ALL LINKS\n✅ ${YOUR_LINK}\n🔥 Sab kuch ek jagah!`);

        else if (command === 'ip') {
            const ip = args[0] || '8.8.8.8';
            await msg.reply(`🌐 IP TRACKER: ${ip}
🌍 Country: India
🏙️ City: Delhi
📡 ISP: Jio
📍 Lat/Lon: 28.61°N, 77.23°E`);
        }
        else if (command === 'phone') {
            const num = args[0] || '+919999999999';
            await msg.reply(`📞 PHONE OSINT: ${num}
🌍 India
🏢 Jio/Airtel
✅ Active`);
        }
        else if (command === 'email') {
            const email = args[0] || 'example@gmail.com';
            await msg.reply(`📧 EMAIL OSINT: ${email}
🔗 Breach check: https://haveibeenpwned.com`);
        }
        else if (command === 'track') {
            const name = args.join(' ') || 'Unknown';
            await msg.reply(`🕵️ OSINT SCAN: ${name}
📱 +91-${Math.floor(Math.random()*9000000000)+1000000000}
📧 ${name.replace(/ /g,'')}@gmail.com
📍 Delhi, India
🔗 Found on 5 platforms`);
        }
        else if (command === 'dox') {
            const name = args.join(' ') || 'Unknown';
            await msg.reply(`📄 DOX: ${name} (FAKE)
📱 +91-${Math.floor(Math.random()*9000000000)+1000000000}
📧 ${name.replace(/ /g,'')}@gmail.com
📍 Delhi, India
⚠️ FAKE DATA - PRANK ONLY`);
        }
        else if (command === 'geo') {
            const ip = args[0] || '8.8.8.8';
            await msg.reply(`📍 GEOLOCATION: ${ip}
📌 28.61°N, 77.23°E
🗺️ https://maps.google.com/?q=28.61,77.23`);
        }
        else if (command === 'userinfo') {
            await msg.reply(`🕵️ YOUR INFO
👤 ${contact.pushname || 'Unknown'}
📱 ${contact.id.user}
🆔 ${contact.id._serialized}`);
        }
        else if (command === 'darkweb') {
            await msg.reply(`🌑 DARK WEB SCAN
🔴 Your data found on 3 dark web sites!
🔗 ${YOUR_LINK}
⚠️ Prank simulation!`);
        }
        else if (command === 'device') {
            await msg.reply(`📱 DEVICE INFO
┣ Platform: WhatsApp Web
┣ Browser: Chromium
┣ Version: ${require('whatsapp-web.js/package.json').version}`);
        }
        else if (command === 'network') {
            await msg.reply(`🌐 NETWORK SCAN
┣ Gateway: 192.168.1.1
┣ DNS: 8.8.8.8
┣ Speed: 100Mbps
┣ Status: Secure 🟢`);
        }
        else if (command === 'port') {
            const ip = args[0] || 'localhost';
            await msg.reply(`🔍 PORT SCAN: ${ip}
┣ 22 (SSH): Open
┣ 80 (HTTP): Open
┣ 443 (HTTPS): Open
┣ 8080 (Proxy): Open`);
        }
        else if (command === 'whois') {
            const domain = args[0] || 'google.com';
            await msg.reply(`🌐 WHOIS: ${domain}
┣ Registrar: Namecheap
┣ Created: 1997-09-15
┣ Expires: 2028-09-14
┣ IP: 142.250.67.78`);
        }

        else if (command === 'tagall') {
            if (!chat.isGroup) return;
            let text = `📢 ALL MEMBERS\n\n`;
            let mentions = [];
            for (let p of chat.participants) {
                text += `@${p.id.user} `;
            }
            text += `\n\n🔗 ${YOUR_LINK}`;
            await chat.sendMessage(text, { mentions });
        }
        else if (command === 'warn') {
            if (!msg.mentionedIds.length) return;
            await msg.reply(`⚠️ @${msg.mentionedIds[0].split('@')[0]} WARNED!`);
        }
        else if (command === 'kick') {
            if (!chat.isGroup || !msg.mentionedIds.length) return;
            await chat.removeParticipants([msg.mentionedIds[0]]);
            await msg.reply('✅ Kicked!');
        }
        else if (command === 'ban') {
            if (!chat.isGroup || !msg.mentionedIds.length) return;
            await chat.removeParticipants([msg.mentionedIds[0]]);
            await msg.reply('🚫 Banned!');
        }
        else if (command === 'admins') {
            if (!chat.isGroup) return;
            let list = '👑 ADMINS\n';
            for (let p of chat.participants) if(p.isAdmin) list += `👑 @${p.id.user}\n`;
            await chat.sendMessage(list);
        }
        else if (command === 'members') {
            if (chat.isGroup) await msg.reply(`👥 Members: ${chat.participants.length}`);
        }
        else if (command === 'mute') {
            if (chat.isGroup) { await chat.setMessagesAdminsOnly(true); await msg.reply('🤫 Muted!'); }
        }
        else if (command === 'unmute') {
            if (chat.isGroup) { await chat.setMessagesAdminsOnly(false); await msg.reply('📢 Unmuted!'); }
        }
        else if (command === 'promote') {
            if (chat.isGroup && msg.mentionedIds.length) {
                await chat.promoteParticipants([msg.mentionedIds[0]]);
                await msg.reply(`👑 @${msg.mentionedIds[0].split('@')[0]} promoted!`);
            }
        }
        else if (command === 'demote') {
            if (chat.isGroup && msg.mentionedIds.length) {
                await chat.demoteParticipants([msg.mentionedIds[0]]);
                await msg.reply(`⬇️ @${msg.mentionedIds[0].split('@')[0]} demoted!`);
            }
        }
        else if (command === 'clean') await msg.reply('🧹 Cleaning... ✅');
        else if (command === 'hide') await msg.reply('👻 Hidden!');
        else if (command === 'slow') { if (chat.isGroup) await msg.reply('🐢 Slow mode on!'); }
        else if (command === 'nsfw') await msg.reply('🔞 NSFW mode toggled!');

        else if (command === 'ping') {
            const start = Date.now();
            const res = await msg.reply('🏓 Pinging...');
            await res.edit(`🚀 PONG! ⏱ ${Date.now()-start}ms`);
        }
        else if (command === 'sticker') {
            if (msg.hasMedia) {
                const media = await msg.downloadMedia();
                await msg.reply(media, null, { sendMediaAsSticker: true, stickerName: BOT_NAME });
            }
        }
        else if (command === 'ai') await msg.reply(`🧠 AI: "${args.join(' ') || 'Hi'}" - AI processing...`);
        else if (command === 'calc') {
            try { await msg.reply(`🧮 = ${eval(args.join(' '))}`); } catch { await msg.reply('❌ .calc 2+2'); }
        }
        else if (command === 'google') {
            if (args.length) await msg.reply(`🔍 https://www.google.com/search?q=${encodeURIComponent(args.join(' '))}`);
        }
        else if (command === 'quote') {
            const q = [
                "Hack the planet! 🔥", "Stay anonymous!", "Code is poetry!",
                "Security is an illusion!", "The matrix has you!", "Wake up Neo!",
                `${OWNER_NAME} ka bot zabardast hai!`, "Warning: This is not a drill!"
            ];
            await msg.reply(`💬 "${q[Math.floor(Math.random()*q.length)]}"`);
        }
        else if (command === 'lyrics') {
            const s = args.join(' ') || 'unknown';
            await msg.reply(`🎵 LYRICS: ${s}\n🔗 https://genius.com/search?q=${encodeURIComponent(s)}`);
        }
        else if (command === 'weather') {
            const city = args.join(' ') || 'Delhi';
            await msg.reply(`🌤️ ${city}: 34°C, Sunny, Humidity 58%`);
        }
        else if (command === 'translate') await msg.reply(`🌐 Translate coming soon!`);
        else if (command === 'short') {
            const url = args[0] || 'https://google.com';
            await msg.reply(`🔗 Shortened: ${YOUR_LINK}`);
        }
        else if (command === 'qr') {
            const text = args.join(' ') || 'QR';
            await msg.reply(`📱 QR for: ${text}\nhttps://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(text)}`);
        }
        else if (command === 'password') {
            const len = parseInt(args[0]) || 12;
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
            let pwd = '';
            for (let i=0; i<len; i++) pwd += chars[Math.floor(Math.random()*chars.length)];
            await msg.reply(`🔑 Password: \`${pwd}\``);
        }
        else if (command === 'hash') {
            const text = args.join(' ') || 'test';
            const crypto = require('crypto');
            await msg.reply(`🔐 MD5: ${crypto.createHash('md5').update(text).digest('hex')}\nSHA256: ${crypto.createHash('sha256').update(text).digest('hex')}`);
        }
        else if (command === 'base64') {
            const text = args.join(' ') || 'test';
            const encoded = Buffer.from(text).toString('base64');
            await msg.reply(`📦 Base64:\n\`${encoded}\``);
        }
        else if (command === 'time') {
            const city = args.join(' ') || 'Asia/Kolkata';
            await msg.reply(`🕐 ${city}: ${new Date().toLocaleTimeString('en-IN', {timeZone: city})}`);
        }
        else if (command === 'news') {
            await msg.reply(`📰 LATEST NEWS\n🔗 https://news.google.com`);
        }
        else if (command === 'fact') {
            const facts = [
                "Honey never spoils!", "Octopuses have 3 hearts!",
                "Bananas are berries!", "A group of flamingos is called a flamboyance!"
            ];
            await msg.reply(`💡 FACT: ${facts[Math.floor(Math.random()*facts.length)]}`);
        }
        else if (command === 'joke') {
            const jokes = [
                "Why do hackers wear leather jackets? Because they have to crack firewalls!",
                "Why was the hacker sad? Because his password was weak!",
                "What's a hacker's favorite music? Heavy metal with a lot of backdoors!"
            ];
            await msg.reply(`😂 ${jokes[Math.floor(Math.random()*jokes.length)]}`);
        }

        else if (command === 'broadcast') {
            if (contact.id.user !== OWNER_NUMBER) return;
            const bc = args.join(' ') || '🔥 CHINTU BOT!';
            let sent = 0;
            const chats = await client.getChats();
            for (let c of chats) if (!c.isGroup) { await client.sendMessage(c.id._serialized, `📢 ${bc}`); sent++; }
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
            await msg.reply(`📊 ${BOT_NAME}\n✅ ONLINE 🔥\n👑 ${OWNER_NAME}\n🔗 ${YOUR_LINK}`);
        }
        else if (command === 'owner') {
            await msg.reply(`👑 **${BOT_NAME}**\n🔥 ${OWNER_NAME}\n📞 +${OWNER_NUMBER}\n🔗 ${YOUR_LINK}`);
        }
        else if (command === 'restart') {
            if (contact.id.user !== OWNER_NUMBER) return;
            await msg.reply('🔄 Restarting...');
            process.exit(0);
        }
        else if (command === 'reset') {
            if (contact.id.user !== OWNER_NUMBER) return;
            const fs = require('fs');
            const path = require('path');
            const authPath = path.join(process.cwd(), '.wwebjs_auth');
            if (fs.existsSync(authPath)) fs.rmSync(authPath, { recursive: true, force: true });
            await msg.reply('🔄 Session reset! Restarting...');
            process.exit(0);
        }
        else if (command === 'eval') {
            if (contact.id.user !== OWNER_NUMBER) return;
            try {
                const result = eval(args.join(' '));
                await msg.reply(`📤 Result:\n\`${JSON.stringify(result, null, 2)}\``);
            } catch(e) {
                await msg.reply(`❌ Error: ${e.message}`);
            }
        }
        else if (command === 'logs') {
            await msg.reply(`📋 Recent logs... (Check Render dashboard for full logs)`);
        }
        else if (command === 'say') {
            if (contact.id.user !== OWNER_NUMBER) return;
            await client.sendMessage(msg.from, args.join(' ') || '...');
        }

    } catch (e) { console.log(e.message); }
});

console.log(`\n🔥 ${Chintu_Bot}`);
console.log(`👑 ${Chintu}`);
console.log(`🔗 ${YOUR_LINK}\n`);
client.initialize();
