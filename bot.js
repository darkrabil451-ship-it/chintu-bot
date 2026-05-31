const { Client, LocalAuth } = require('whatsapp-web.js');

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-gpu'
        ]
    }
});

// ==========================================
// 🔄 एंटी-क्रैश ऑटो रीट्राई पेयरिंग इंजन 
// ==========================================
let pairingCodeRequested = false;

client.on('qr', async (qr) => {
    if (!pairingCodeRequested) {
        pairingCodeRequested = true;
        const myPhoneNumber = '919412185706'; // चिंटू भाई का नंबर एकदम सेट है

        console.log('\n=========================================');
        console.log(`🤖 Chintu bhai, valid pairing code nikalne ki koshish jaari hai...`);
        console.log('=========================================');

        while (true) {
            try {
                await new Promise(resolve => setTimeout(resolve, 5000));
                console.log('🔄 Requesting pairing code from WhatsApp servers...');
                const pairingCode = await client.requestPairingCode(myPhoneNumber);
                
                console.log('\n🔥 --- EKDAM FRESH PAIRING CODE TAIYAR HAI --- 🔥');
                console.log(`👉  [  ${pairingCode.toUpperCase()}  ]  👈`);
                console.log('=========================================');
                console.log('Bhai, jaldi se ye code apne WhatsApp me daal do!');
                console.log('=========================================\n');
                break; 
            } catch (err) {
                console.log(`❌ Temp error: ${err.message}. 5 second me fir se try kar raha hu...`);
            }
        }
    }
});

client.on('ready', () => {
    console.log('\n🟢 Chintu bhai, aapka ULTRA DANGER BOT successfully link ho gaya aur ONLINE hai! 🔥');
});

// ==========================================
// ⚡ ULTRA DANGER & ROWDY COMMANDS LOGIC
// ==========================================
client.on('message', async (msg) => {
    const messageBody = msg.body.trim();
    const lowerText = messageBody.toLowerCase();
    const prefix = '.'; 

    // 🔥 Attitude Auto-Replies (Bina prefix ke)
    if (lowerText === 'hi' || lowerText === 'hello' || lowerText === 'bhai') {
        await msg.reply('Namaste bhai! Main Chintu bhai ka personal ULTRA BOT hoon. Saare dangerous commands dekhne ke liye *.menu* type karo! 🔥🤖');
        return;
    }
    if (lowerText === 'chintu' || lowerText === 'chintu bhai') {
        await msg.reply('👑 *Chintu King* abhi system configure kar rahe hain! Main unka digital weapon bot hoon. Hukum karo kya kaam hai? 🔥');
        return;
    }

    if (!messageBody.startsWith(prefix)) return;

    const args = messageBody.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    // ==========================================
    // 📜 1. THE ULTIMATE DANGER MENU
    // ==========================================
    if (command === 'menu' || command === 'help') {
        const menuText = `🤖 *⚡ CHINTU DANGER MAXIMUM SUPER BOT ⚡* 🤖

*💀 [ ULTRA DANGER & PRANK ZONE ]*
👉 *.destroy* - Group khatam karne ka khatarnak fake visual script prank.
👉 *.spam [text] [count]* - Kisi bhi text ko baar-baar generate karne ka tool.
👉 *.virus* - Binary text attack logic ka fake simulation layout.
👉 *.hack [naam]* - Full system backup bypass ka realistic rowdy prank.
👉 *.phishing* - Termux phishing infrastructure tools (Zphisher/Maxphisher).
👉 *.ddos [site]* - Overflooding port stress simulation tool setup.

*🕵️‍♂️ [ OSINT & TRACKING TOOLS ]*
👉 *.ip [ip-address]* - Target IP scanned location details locator.
👉 *.fakeid* - Deep web database testing temporary fake identity matrix.
👉 *.dns [domain]* - Website ka look-up details nikalne ka master format.
👉 *.userinfo* - Chat me samne wale ka network code aur status nikalna.

*👥 [ ADVANCED GROUP ADMIN COMMANDS ]*
👉 *.tagall* - Group ke har ek launde ko line se ek sath tag karo.
👉 *.warn @user* - Badmaash members ko group rules ki red-warning dena.
👉 *.mute* - Poori chat lock (Only for Group Admins).
👉 *.unmute* - Chat unlock (Open for everyone).
👉 *.admins* - Group ke maalikons (Admins) ki raw data list.

*🧠 [ AI & ADVANCED SCRAPERS ]*
👉 *.ai [sawal]* - Smart AI Neural network logic core terminal.
👉 *.gpt [sawal]* - Hard-core code scripting execution.
👉 *.google [query]* - Direct algorithmic google link generator.
👉 *.ig [username]* - Target Instagram profile tracker bypass structure.

*👑 [ OWNER EXECUTIVE TOOLS ]*
👉 *.broadcast [text]* - Ek jhatke me saare private chats me msg blast.
👉 *.block* - User ko blacklist proxy me daal kar block karna.
👉 *.unblock* - User ko wapas global network me access dena.
👉 *.ping* - Server speed checks in milliseconds.
👉 *.owner* - Real owner contact matrix layout.`;
        await msg.reply(menuText);
    }

    // ==========================================
    // 💀 2. ULTRA DANGER & PRANK COMMANDS
    // ==========================================
    else if (command === 'destroy') {
        const chat = await msg.getChat();
        if (!chat.isGroup) return await msg.reply('❌ Ye dangerous command sirf WhatsApp Group me chalta hai!');
        await msg.reply('🚨 *WARNING: GROUP DESTROY SEQUENCE INITIATED* 🚨\n\nRemoving all members... 0%\nOverriding Admin Logs... 15%\nClearing Database Storage... 45%');
        setTimeout(async () => { await client.sendMessage(msg.from, `⚙️ Injecting Null-Byte Payload into Group Core...\nStatus: 99%`); }, 1500);
        setTimeout(async () => { await client.sendMessage(msg.from, `🔥 *SYSTEM COMPLIANCE BYPASSED* 🔥\n\nChintu bhai, group ka bhattha baith gaya hai! (Chill bro, ye sirf ek khatarnak prank text tha! 🤪)`); }, 3500);
    }
    else if (command === 'spam') {
        if (args.length < 2) return await msg.reply('❌ Sahi se likho bhai! \nExample: \`.spam CHINTU-KING 5\`');
        const count = parseInt(args.pop());
        const text = args.join(' ');
        if (isNaN(count) || count > 50) return await msg.reply('❌ Count number daalo (Maximum limit: 50)');
        
        let spamText = `🔥 *Chintu Spam Engine Blast:* \n\n`;
        for (let i = 0; i < count; i++) { spamText += `${text}\n`; }
        await msg.reply(spamText);
    }
    else if (command === 'virus') {
        await msg.reply('☣️ *LOADING BINARY EXPLOIT CODE* ☣️\n\n\`\`\`01000011 01101000 01101001 01101110 01110100 01110101\`\`\`\nPayload Size: 4.8MB\nTarget Packet: Encrpyted via Chintu Proxy Engine.\n\n[ Status: Fake Exploit Loaded successfully for layout visual! ]');
    }
    else if (command === 'hack') {
        if (!args.length) return await msg.reply('❌ Kiska target name bypass karna hai?');
        const target = args.join(' ');
        await msg.reply(`🕵️‍♂️ *Chintu Remote Terminal Framework v5.0 Chalu...* \n🎯 *Target:* ${target}`);
        setTimeout(async () => { await client.sendMessage(msg.from, `⚙️ Bypassing security walls... 40%`); }, 1000);
        setTimeout(async () => { await client.sendMessage(msg.from, `📁 Target remote storage successfully cloned!`); }, 2500);
        setTimeout(async () => { await client.sendMessage(msg.from, `🔥 *Hacking Successful!* \nChintu bhai, ${target} ab poora tumhare access zone me hai! 😎`); }, 4000);
    }
    else if (command === 'phishing') {
        await msg.reply(`🎣 *🔥 TERMUX PHISHING AUTOMATION FRAMEWORK 🔥*

Bhai, cyber security testing ke liye ye tools sabse solid hain:
1️⃣ *Zphisher* - Advanced automated pages link generator.
2️⃣ *MaxPhisher* - Python based modular tool.

🛠️ *Termux Script:*
\`\`\`pkg update && pkg upgrade -y
pkg install git python php curl -y
git clone https://github.com/htr-tech/zphisher
cd zphisher && bash zphisher.sh\`\`\`
⚠️ _Educational purpose only!_`);
    }
    else if (command === 'ddos') {
        if (!args.length) return await msg.reply('❌ Target URL/IP toh daalo!');
        await msg.reply(`🔥 *DDOS INITIATING ON: ${args[0]}* \n\n⚙️ Overflooding Server TCP Packets...\n🛡️ Proxy Proxy-Chain: Connected via Tor.`);
        setTimeout(async () => { await client.sendMessage(msg.from, `💥 *Server Stress Test Over:* Target site ping simulated via high load request proxy (Prank simulation done!).`); }, 3000);
    }

    // ==========================================
    // 🕵️‍♂️ 3. OSINT & TRACKING COMMANDS
    // ==========================================
    else if (command === 'ip') {
        if (!args.length) return await msg.reply('❌ IP address provide karo!');
        await msg.reply(`🌐 *METADATA GEOLOCATION IP SCANNER* \n\n🔍 *IP:* ${args[0]}\n📍 *Region:* Uttar Pradesh, India\n🛰️ *ISP Network:* Jio/Airtel Backhaul Node\n🔒 *Security Layer:* Open Gateway detected (Prank Toolkit).`);
    }
    else if (command === 'fakeid') {
        const names = ["Rohan", "Vikram", "Aryan", "Nitin"];
        await msg.reply(`👤 *DEEP CYBER SYSTEM LOG DATA:* \n\n📛 *Alias Name:* ${names[Math.floor(Math.random() * names.length)]} Singh\n🎂 *Age:* ${Math.floor(Math.random() * 8) + 21}\n🏙️ *Terminal Node:* Noida SEC-62\n💻 *Core Access:* Level 3 Pentester`);
    }
    else if (command === 'dns') {
        if (!args.length) return await msg.reply('❌ Website domain name likho! (e.g. .dns google.com)');
        await msg.reply(`🔍 *DNS LOOKUP MAP FOR: ${args[0]}* \n\n📄 *A Record:* 142.250.190.46\n📄 *MX Record:* alt1.aspmx.l.google.com\n⏱️ *TTL Speed:* 300ms\n🔒 *Nameservers:* ns1.google.com`);
    }
    else if (command === 'userinfo') {
        const contact = await msg.getContact();
        await msg.reply(`🕵️‍♂️ *TARGET CHAT DATA RETRIEVED:* \n\n📱 *PushName:* ${contact.pushname}\n🆔 *WhatsApp ID:* ${contact.id.user}\n🌐 *Is Business Account:* ${contact.isBusiness ? 'Yes' : 'No'}\n⭐ *Verified Badge:* ${contact.isEnterprise ? 'Official' : 'Regular User'}`);
    }

    // ==========================================
    // 👥 4. ADVANCED GROUP MANAGEMENT
    // ==========================================
    else if (command === 'tagall') {
        const chat = await msg.getChat();
        if (!chat.isGroup) return await msg.reply('❌ Core group tool only.');
        let mentions = [];
        let text = `📢 *ATTENTION EVERYONE / LAUNDO DHAYAN DO:* \n\n`;
        for (let participant of chat.participants) {
            const contact = await client.getContactById(participant.id._serialized);
            mentions.push(contact);
            text += `@${participant.id.user} `;
        }
        await chat.sendMessage(text, { mentions });
    }
    else if (command === 'warn') {
        if (!msg.hasMentioned) return await msg.reply('❌ Bande ko tag toh karo jise warning deni hai!');
        await msg.reply(`⚠️ *OFFICIAL STRIKE WARNING SYSTEM* ⚠️\n\nBhai rule todoge toh direct system se kick ho jaoge. Agli baar dhyan rakhna!`);
    }
    else if (command === 'mute') {
        const chat = await msg.getChat();
        if (!chat.isGroup) return;
        await chat.setMessagesAdminsOnly(true);
        await msg.reply('🤫 *Group locked successfully!* Ab sirf admins hi baatein karenge.');
    }
    else if (command === 'unmute') {
        const chat = await msg.getChat();
        if (!chat.isGroup) return;
        await chat.setMessagesAdminsOnly(false);
        await msg.reply('📢 *Group unlocked successfully!* Sabhi log chalu ho jao chatter box.');
    }
    else if (command === 'admins') {
        const chat = await msg.getChat();
        if (!chat.isGroup) return;
        let adminText = `👑 *Group Configuration Kings (Admins):* \n\n`;
        for (let participant of chat.participants) {
            if (participant.isAdmin || participant.isSuperAdmin) adminText += `• @${participant.id.user}\n`;
        }
        await msg.reply(adminText);
    }

    // ==========================================
    // 🧠 5. AI & SCRAPERS
    // ==========================================
    else if (command === 'ai' || command === 'gpt') {
        if (!args.length) return await msg.reply('❌ Abe brain use karo, question toh likho aage!');
        await msg.reply(`🧠 *Chintu AI Logic Unit Response:* \n\nBot server database connected. External keys update hote hi data processing full-swing chalegi, tab tak utility tools ka mazaa lo!`);
    }
    else if (command === 'google') {
        if (!args.length) return await msg.reply('❌ Kya search karna hai?');
        await msg.reply(`🔍 *Google Algorithmic Engine Link:* \n👉 https://www.google.com/search?q=${encodeURIComponent(args.join(' '))}`);
    }
    else if (command === 'ig') {
        if (!args.length) return await msg.reply('❌ Instagram username daalo!');
        await msg.reply(`📸 *Instagram Tracker Module:* \n\n👤 *User:* @${args[0].replace('@','')}\n🔗 *Profile Web-Gate:* https://instagram.com/${args[0].replace('@','')}`);
    }

    // ==========================================
    // 👑 6. OWNER CONTROL POWER TOOLS
    // ==========================================
    else if (command === 'broadcast') {
        if (!args.length) return await msg.reply('❌ Blast karne ke liye broadcast text toh do!');
        const bcMessage = args.join(' ');
        await msg.reply('📢 *Initiating global broadcast blast matrix...*');
        const chats = await client.getChats();
        let count = 0;
        for (let c of chats) {
            if (!c.isGroup) {
                await client.sendMessage(c.id._serialized, `📢 *Chintu Bot Global Broadcast:* \n\n${bcMessage}`);
                count++;
            }
        }
        await msg.reply(`✅ System Blast complete. Message successfully injected to *${count}* direct users!`);
    }
    else if (command === 'block') {
        const contact = await msg.getContact();
        await msg.reply('🚫 Firewall setup changed. User blacklisted and blocked!');
        await contact.block();
    }
    else if (command === 'unblock') {
        const contact = await msg.getContact();
        await msg.reply('✅ User network unblocked from Chintu server infrastructure.');
        await contact.unblock();
    }
    else if (command === 'ping') {
        const start = Date.now();
        const response = await msg.reply('Pinging server routing port... ⏳');
        await response.edit(`🚀 *PONG MATRIX SPEED!* \n⏱️ *Latency Execution Speed:* ${Date.now() - start}ms`);
    }
    else if (command === 'owner') {
        await msg.reply('👑 *Chintu Bot Ultimate Creator System Matrix:* \n\nIs pure server infrastructure ke sole owner hamare king-size bhaiya *Chintu Bhai* hain! 😎⚡\nContact Node: +919412185706');
    }
});

console.log('Chintu mega bot ka engine chalu ho raha hai...');
client.initialize();
