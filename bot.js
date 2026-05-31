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
// 🔗 एकदम सही और लेटेस्ट पेयरिंग कोड इंजन
// ==========================================
let pairingCodeRequested = false;

client.on('qr', async (qr) => {
    if (!pairingCodeRequested) {
        pairingCodeRequested = true;
        const myPhoneNumber = '919412185706'; // Chintu bhai ka number 

        console.log('\n=========================================');
        console.log(`🤖 Chintu bhai, valid pairing code mang rahe hain: ${myPhoneNumber} ke liye...`);
        console.log('=========================================');
        
        setTimeout(async () => {
            try {
                const pairingCode = await client.requestPairingCode(myPhoneNumber);
                console.log('\n🔥 --- EKDAM TAZA PAIRING CODE TAIYAR HAI --- 🔥');
                console.log(`👉  [  ${pairingCode.toUpperCase()}  ]  👈`);
                console.log('=========================================');
                console.log('Bhai, jaldi se ye code apne WhatsApp me daal do!');
                console.log('=========================================\n');
            } catch (err) {
                console.log('❌ Code lene me dikkat aayi, re-deploy karein: ', err.message);
                pairingCodeRequested = false;
            }
        }, 3000);
    }
});

client.on('ready', () => {
    console.log('\n🟢 Chintu bhai, aapka tagda bot bina QR ke successfully link ho gaya aur ONLINE hai! 🔥');
});

// ==========================================
// ⚡ DHASU & KHATARNAK HINGLISH COMMANDS LOGIC
// ==========================================
client.on('message', async (msg) => {
    const messageBody = msg.body.trim();
    const lowerText = messageBody.toLowerCase();
    const prefix = '.'; 

    // 🔥 Full Attitude Smart Auto-Reply (Bina prefix ke)
    if (lowerText === 'hi' || lowerText === 'hello' || lowerText === 'bhai') {
        await msg.reply('Namaste bhai! Main Chintu bhai ka personal super-bot hoon. Saare tagde commands dekhne ke liye *.menu* ya *.help* type karo! 🔥🤖');
        return;
    }
    if (lowerText === 'chintu' || lowerText === 'chintu bhai') {
        await msg.reply('👑 King Chintu bhai abhi bhot bade mission par hain! Tab tak unka ye digital safe-house bot aapki khidmat me haazir hai. Bolna kya hai batao?');
        return;
    }
    if (lowerText === 'good morning' || lowerText === 'gm') return await msg.reply('Suprabhat bhai! Ekdam jhakaas subah ho aapki. 🌅');
    if (lowerText === 'good night' || lowerText === 'gn') return await msg.reply('Shubh ratri bhai! So jao ab chupchaap. 😴');

    if (!messageBody.startsWith(prefix)) return;

    const args = messageBody.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    // ==========================================
    // 📜 1. KHATARNAK FULL MENU
    // ==========================================
    if (command === 'menu' || command === 'help') {
        const menuText = `🤖 *⚡ CHINTU ULTIMATE SUPER BOT ⚡* 🤖

*📸 [ INSTAGRAM COMMANDS ]*
👉 *.ig [username]* - Profile link aur details nikaalo.
👉 *.iglink* - Direct Insta login link.
👉 *.igdownload [link]* - Reel download shortcut guide.

*🧠 [ AI & GOOGLE SMART TOOLS ]*
👉 *.ai [sawal]* - Smart AI se kuch bhi poocho.
👉 *.gpt [sawal]* - Heavy coding ya script likhvane ke liye.
👉 *.google [sawal]* - Google search link generate karein.

*👥 [ WHATSAPP GROUP TOOLS ]*
👉 *.tagall* - Group ke saare laundo ko ek sath tag karo.
👉 *.mute* - Group chat band (Only Admins).
👉 *.unmute* - Group chat chalu (Sabke liye).
👉 *.groupinfo* - Group ki poori kundli nikaalein.
👉 *.admins* - Group ke sabhi admins ki list.

*⚡ [ BRAND NEW KHATARNAK COMMANDS ]*
👉 *.phishing* - Termux phishing tools ki powerful list aur setup link.
👉 *.ddos [site]* - Website par temporary fake attack ka show-off/prank.
👉 *.ip [ip-address]* - Fake IP tracker aur location locator.
👉 *.scam* - Cyber fraud se bachne ki jordaar warning alert text.
👉 *.fakeid* - Identity testing ke liye ek temporary fake details sheet.

*👑 [ SUPER OWNER POWER TOOLS ]*
👉 *.broadcast [text]* - Ek sath sab dosto ko private chat me msg bhejo.
👉 *.block* - Target user ko seedhe block karo.
👉 *.unblock* - Blocked bande ko wapas unblock karo.

*🎉 [ FUN & PRANK ZONE ]*
👉 *.hack [naam]* - Termux style cyber hack ka real pranking visual.
👉 *.joke* - Haste-haste pet kharab karne wala chutkula.
👉 *.shayari* - Full high attitude aur rowdy hindi shayari.
👉 *.roast [naam]* - Dost ki aisi taisi karne wala khatarnak roast.
👉 *.lovecalc [naam]* - Saccha pyaar test karne ka meter.

*🛠️ [ SYSTEM & UTILITY ]*
👉 *.ping* - Server speed aur response check karein.
👉 *.alive* - Bot active status dekhne ke liye.
👉 *.owner* - Is bot ke asli boss ki information.`;
        await msg.reply(menuText);
    }

    // ==========================================
    // 📸 2. INSTAGRAM TOOLS
    // ==========================================
    else if (command === 'ig') {
        if (!args.length) return await msg.reply('❌ Abe username toh likho! \nExample: \`.ig chintu_dev\`');
        const username = args[0].replace('@', '');
        await msg.reply(`📸 *Instagram Profile Search:* \n\n👤 *Username:* @${username}\n🔗 *Direct Link:* https://instagram.com/${username}`);
    }
    else if (command === 'iglink') {
        await msg.reply('📸 Direct Instagram portal link:\n👉 https://instagram.com');
    }
    else if (command === 'igdownload') {
        if (!args.length) return await msg.reply('❌ Kisi reel ki link toh daalo bhai!');
        await msg.reply('📥 *Reel Downloader:* \n\nBhai is link ko copy karo aur *SnapInsta* ya *SaveFrom* website par dalke 1 second me video direct gallery me save kar lo!');
    }

    // ==========================================
    // 🧠 3. AI TOOLS
    // ==========================================
    else if (command === 'ai' || command === 'gpt') {
        if (!args.length) return await msg.reply('❌ Abe poochhna kya hai? Aage toh likho.');
        await msg.reply(`🧠 *Chintu AI Response:* \n\nBot server par poori tarah ready hai! External API connect hote hi aapka direct AI data chalega, tab tak baaki saare heavy commands bindaas use karo!`);
    }
    else if (command === 'google') {
        if (!args.length) return await msg.reply('❌ Kya search karna hai?');
        const query = encodeURIComponent(args.join(' '));
        await msg.reply(`🔍 *Google Search Link taiyar hai bhai:* \n👉 https://www.google.com/search?q=${query}`);
    }

    // ==========================================
    // 👥 4. GROUP TOOLS
    // ==========================================
    else if (command === 'tagall') {
        const chat = await msg.getChat();
        if (!chat.isGroup) return await msg.reply('❌ Bhai, ye command kewal WhatsApp Group me chalega!');
        let mentions = [];
        let text = `📢 *Group ke saare laundo dhayan do (Tag All):* \n\n`;
        for (let participant of chat.participants) {
            const contact = await client.getContactById(participant.id._serialized);
            mentions.push(contact);
            text += `@${participant.id.user} `;
        }
        await chat.sendMessage(text, { mentions });
    }
    else if (command === 'mute') {
        const chat = await msg.getChat();
        if (!chat.isGroup) return;
        await chat.setMessagesAdminsOnly(true);
        await msg.reply('🤫 *Group ko mute kar diya gaya hai!* Only Admins can message.');
    }
    else if (command === 'unmute') {
        const chat = await msg.getChat();
        if (!chat.isGroup) return;
        await chat.setMessagesAdminsOnly(false);
        await msg.reply('📢 *Group ko unmute kar diya hai!* Everyone can chat.');
    }
    else if (command === 'groupinfo') {
        const chat = await msg.getChat();
        if (!chat.isGroup) return;
        await msg.reply(`👥 *Group Name:* ${chat.name}\n🆔 *Group ID:* ${chat.id._serialized}\n👥 *Total Members:* ${chat.participants.length}`);
    }
    else if (command === 'admins') {
        const chat = await msg.getChat();
        if (!chat.isGroup) return;
        let adminText = `👑 *Group ke asli Maalik (Admins):* \n\n`;
        for (let participant of chat.participants) {
            if (participant.isAdmin || participant.isSuperAdmin) adminText += `• @${participant.id.user}\n`;
        }
        await msg.reply(adminText);
    }

    // ==========================================
    // ⚡ 5. BRAND NEW KHATARNAK & CYBER TOOLS
    // ==========================================
    else if (command === 'phishing') {
        const fishText = `🎣 *🔥 TERMUX PHISHING TOOLS COMPILATION 🔥*

Bhai, cybersecurity aur awareness ke liye Termux ke ye tools sabse powerful hain:
1️⃣ *Zphisher* - Sabse badiya aur fast Automated Phishing Tool.
2️⃣ *MaxPhisher* - Ekdam advanced links framework.
3️⃣ *PyPhisher* - Modern GUI based phishing script.

🛠️ *Termux Installation Guide:*
\`\`\`pkg update && pkg upgrade
pkg install git python php curl -y
git clone https://github.com/htr-tech/zphisher
cd zphisher
bash zphisher.sh\`\`\`

⚠️ _Warning: Iska use kewal cyber testing aur education ke liye karna bhai, kisi galat kaam ke liye nahi!_`;
        await msg.reply(fishText);
    }
    else if (command === 'ddos') {
        if (!args.length) return await msg.reply('❌ Abe target website ka naam toh likho! \nExample: \`.ddos targetsite.com\`');
        const site = args[0];
        await msg.reply(`🔥 *DDOS INITIATING ON: ${site}* \n\n⚙️ Packets Sending Via Over-Flooding Port 80...\n⚙️ Proxy Layers: Active (Tor Network)\n⏱️ Status: Loading Stress Test Request...`);
        setTimeout(async () => { await client.sendMessage(msg.from, `💥 *Server Ping Dropping:* ${site} par heavily traffic simulated (Prank Call/Stress simulated successfully!).`); }, 3000);
    }
    else if (command === 'ip') {
        if (!args.length) return await msg.reply('❌ Abe kisi target ka IP Address toh daalo!');
        const ip = args[0];
        await msg.reply(`🌐 *IP TRACKER ENGINE CHALU...* \n\n🔍 *IP:* ${ip}\n📍 *Country:* India\n🌍 *Region:* Uttar Pradesh\n🛰️ *ISP:* Reliance Jio Infocomm\n🔒 *Status:* Target system scanned (Prank/Awareness Tool).`);
    }
    else if (command === 'scam') {
        await msg.reply(`⚠️ *CYBER FRAUD ALERT BY CHINTU BOT* ⚠️\n\n1. Kisi bhi anjaan link (.apk) par click na karein.\n2. WhatsApp par aane wale anjaan jobs (+92, +1 numbers) ko block karein.\n3. Apna OTP ya personal details kisi se share na karein!\n\n🛡️ *Stay Safe, Stay Anonymous!*`);
    }
    else if (command === 'fakeid') {
        const fName = ["Aarav", "Kabir", "Reyansh", "Vivaan"][Math.floor(Math.random() * 4)];
        const fAge = Math.floor(Math.random() * 10) + 20;
        await msg.reply(`👤 *GENERATED FAKE LOG SHEET (For testing):* \n\n📛 *Name:* ${fName} Sharma\n🎂 *Age:* ${fAge}\n🏙️ *City:* Noida, UP\n💻 *Profession:* Systems Tester\n🔑 *Access Token:* TS-${Math.floor(Math.random() * 90000) + 10000}`);
    }

    // ==========================================
    // 👑 6. SUPER OWNER POWER TOOLS
    // ==========================================
    else if (command === 'broadcast') {
        if (!args.length) return await msg.reply('❌ Broadcast karne ke liye message likho!');
        const bcMessage = args.join(' ');
        await msg.reply('📢 *Broadcast shuru ho raha hai...*');
        const chats = await client.getChats();
        let count = 0;
        for (let c of chats) {
            if (!c.isGroup) {
                await client.sendMessage(c.id._serialized, `📢 *Chintu Bot Broadcast:* \n\n${bcMessage}`);
                count++;
            }
        }
        await msg.reply(`✅ Successfully *${count}* dosto ko private chat me msg bhej diya!`);
    }
    else if (command === 'block') {
        const contact = await msg.getContact();
        await msg.reply('🚫 Is bande ko black-list kiya jaa raha hai...');
        await contact.block();
    }
    else if (command === 'unblock') {
        const contact = await msg.getContact();
        await msg.reply('✅ Is bande ko wapas unblock kar diya gaya hai.');
        await contact.unblock();
    }

    // ==========================================
    // 🎉 7. FUN ZONE & PRANKS
    // ==========================================
    else if (command === 'hack') {
        if (!args.length) return await msg.reply('❌ Kiska phone hack karna hai?');
        const target = args.join(' ');
        await msg.reply(`🕵️‍♂️ *Chintu Remote Terminal Framework v4.0 Chalu...* \n🎯 *Target:* ${target}`);
        setTimeout(async () => { await client.sendMessage(msg.from, `⚙️ ${target} ka WhatsApp database bypass ho raha hai... 35%`); }, 1000);
        setTimeout(async () => { await client.sendMessage(msg.from, `📁 File Manager storage clone ho chuki hai... 75%`); }, 2500);
        setTimeout(async () => { await client.sendMessage(msg.from, `🔥 *Hacking Successful!* \nChintu bhai, ${target} ka poora device ab aapke terminal me hai! 😎 (Prank)`); }, 4000);
    }
    else if (command === 'joke') {
        const jokes = [
            "Pappu: Papa mujhe ek ladki pasand hai, shaadi karni hai. \nPapa: Kya wo bhi tujhe pasand karti hai? \nPappu: Haan ji! \nPapa: Toh shaadi cancel, ladki ki pasand itni kharab hai ki main use apni bahu nahi bana sakta! 🤣",
            "Teacher: Sanju, Newton ka niyam batao. \nSanju: Sir, Newton kunware the, agar shaadi ho gayi hoti toh niyam ki jagah biwi ke nakhre jhel rahe hote! 🤪"
        ];
        await msg.reply(jokes[Math.floor(Math.random() * jokes.length)]);
    }
    else if (command === 'shayari') {
        const shayaris = [
            "Hath me Termux aur ankho me khwab... ⚡\nHamari sharafat hi hai jo abhi tak nahi aaya bura waqt aapka! 🔥",
            "Manzilen kya hai rasta kya hai, \nHausla ho toh faasla kya hai! 👑"
        ];
        await msg.reply(shayaris[Math.floor(Math.random() * shayaris.length)]);
    }
    else if (command === 'roast') {
        if (!args.length) return msg.reply('❌ Kiska roast karna hai?');
        await msg.reply(`😂 ${args.join(' ')} ki shakal dekh kar toh front camera bhi bolta hai - 'Bhai thoda door reh darr lag raha hai!'`);
    }
    else if (command === 'lovecalc') {
        if (!args.length) return await msg.reply('❌ Abe naam toh likho!');
        await msg.reply(`❤️ *Love Calculator:* \n\nChintu bot ke mutabik aapka aur *${args.join(' ')}* ka match *${Math.floor(Math.random() * 101)}%* perfect hai! 💖`);
    }

    // ==========================================
    // 🛠️ 8. SYSTEM & UTILITY
    // ==========================================
    else if (command === 'ping') {
        const start = Date.now();
        const response = await msg.reply('Speed check ho rahi hai... ⏳');
        await response.edit(`🚀 *PONG (Khatarnak Speed)!* \n⏱️ *Response Time:* ${Date.now() - start}ms`);
    }
    else if (command === 'alive') {
        await msg.reply('🟢 *Chintu Ultimate Bot poori tarah se zinda aur active hai bhai!* 🔥');
    }
    else if (command === 'owner') {
        await msg.reply('👑 *Bot Owner Info:* \n\nIs super-bot ke asli creator aur owner hamare jaan-bhai *Chintu King* hain! 😎⚡\nContact: +919412185706');
    }
});

console.log('Chintu mega bot ka engine chalu ho raha hai...');
client.initialize();
  
