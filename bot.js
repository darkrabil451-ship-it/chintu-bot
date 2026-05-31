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
// 🔗 पेयरिंग कोड लिंक सिस्टम (No QR Code Needed!)
// ==========================================
client.on('qr', async (qr) => {
    // चिंटू भाई, आपका नंबर यहाँ एकदम परफेक्ट सेट कर दिया है!
    const myPhoneNumber = '919412185706'; 

    console.log('\n=========================================');
    console.log(`🤖 Chintu bhai, pairing code request bhej rahe hain target number: ${myPhoneNumber} par...`);
    console.log('=========================================');

    try {
        const pairingCode = await client.requestPairingCode(myPhoneNumber);
        
        console.log('\n🔥 --- AAPKA PAIRING CODE TAIYAR HAI --- 🔥');
        console.log(`👉  [  ${pairingCode.toUpperCase()}  ]  👈`);
        console.log('=========================================');
        console.log('Bhai, ye code aapke WhatsApp par notification me bhi aaya hoga.');
        console.log('Ya fir WhatsApp -> Linked Devices -> Link with phone number me jaakar ye code daal do!');
        console.log('=========================================\n');
    } catch (err) {
        console.log('❌ Pairing code lene me दिक्कत आई: ', err.message);
    }
});

client.on('ready', () => {
    console.log('\n🟢 Chintu bhai, aapka tagda bot bina QR ke successfully link ho gaya aur ONLINE hai! 🔥');
});

// ==========================================
// ⚡ MEGA BOT COMMANDS (PURE HINGLISH STYLE)
// ==========================================
client.on('message', async (msg) => {
    const messageBody = msg.body.trim();
    const lowerText = messageBody.toLowerCase();
    const prefix = '.'; 

    // --- Smart Auto Reply (Bina prefix ke) ---
    if (lowerText === 'hi' || lowerText === 'hello' || lowerText === 'bhai') {
        await msg.reply('Namaste bhai! Main Chintu bhai ka personal super-bot hoon. Saare tagde commands dekhne ke liye *.menu* ya *.help* type karo! 🔥🤖');
        return;
    }
    if (lowerText === 'good morning' || lowerText === 'gm') {
        await msg.reply('Suprabhat bhai! Ekdam jhakaas subah ho aapki. 🌅');
        return;
    }
    if (lowerText === 'good night' || lowerText === 'gn') {
        await msg.reply('Shubh ratri bhai! So jao ab chupchaap, sapne me bot mat chalana. 😴');
        return;
    }

    if (!messageBody.startsWith(prefix)) return;

    const args = messageBody.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    // ==========================================
    // 📜 1. MENU & HELP
    // ==========================================
    if (command === 'menu' || command === 'help') {
        const menuText = `🤖 *⚡ CHINTU ULTIMATE SUPER BOT ⚡* 🤖

*📸 [ INSTAGRAM COMMANDS ]*
👉 *.ig [username]* - Kisi ki bhi profile link aur info nikaalo.
👉 *.iglink* - Insta par jaane ki direct link.
👉 *.igdownload [link]* - Reel download karne ka sahi tareeka.

*🧠 [ AI & GOOGLE SMART TOOLS ]*
👉 *.ai [sawal]* - Chintu Smart AI se kuch bhi poocho.
👉 *.gpt [sawal]* - Coding ya script likhvane ka gpt tool.
👉 *.google [sawal]* - Google search karne ki mast link.

*👥 [ WHATSAPP GROUP TOOLS ]*
👉 *.tagall* - Group ke saare laundo ko ek sath tag karo.
👉 *.mute* - Group chat band (Only for Admins).
👉 *.unmute* - Group chat chalu (Sabke liye).
👉 *.groupinfo* - Group ka poora data aur kundli.
👉 *.admins* - Group ke asli rajaon (Admins) ki list.

*👑 [ SUPER OWNER POWER TOOLS ]*
👉 *.broadcast [text]* - Ek sath sab dosto ko chat me message bhejo.
👉 *.block* - Is chat ke bande ko block karo.
👉 *.unblock* - Blocked bande ko wapas unblock karo.

*🎉 [ FUN & PRANK ZONE ]*
👉 *.hack [naam]* - Dost ka phone hack karne ka asli dikhava (Prank).
👉 *.joke* - Ek kaddak haste-haste lot-pot karne wala chutkula.
👉 *.shayari* - Full attitude aur jordaar hindi shayari.
👉 *.roast [naam]* - Dost ki khatarnak beizzati (Kewal majak).
👉 *.lovecalc [naam]* - Love percentage check karo.

*🛠️ [ SYSTEM & UTILITY ]*
👉 *.ping* - Bot ki running speed check karo.
👉 *.alive* - Bot online hai ya so raha hai dekho.
👉 *.say [message]* - Jo bologe, bot wahi repeat karega.
👉 *.date* - Aaj ki tarikh aur time jano.
👉 *.owner* - Is bot ke asli baap ki jaankari.

💡 _Note: Koi bhi command chalane ke liye pehle dot (.) lagana zaroori hai bhai!_`;
        await msg.reply(menuText);
    }

    // ==========================================
    // 📸 2. INSTAGRAM COMMANDS
    // ==========================================
    else if (command === 'ig') {
        if (!args.length) return await msg.reply('❌ Abe username toh likho! \nExample: \`.ig chintu_dev\`');
        const username = args[0].replace('@', '');
        await msg.reply(`📸 *Instagram Profile Search:* \n\n👤 *Username:* @${username}\n🔗 *Direct Link:* https://instagram.com/${username}\n\nBhai, upar wali link par click karke seedhe profile check kar lo! 😎`);
    }
    else if (command === 'iglink') {
        await msg.reply('📸 Chalo seedhe Instagram par chalo bhai: \n👉 https://instagram.com');
    }
    else if (command === 'igdownload') {
        if (!args.length) return await msg.reply('❌ Kisi reel ki link toh daalo bhai!');
        await msg.reply('📥 *Reel Downloader Module:* \n\nBhai Render ke free server par direct video sending block hoti hai. Isliye is link ko copy karo aur *SaveFrom* ya *SnapInsta* website par dalke 1 second me gallery me save kar lo! 🔥');
    }

    // ==========================================
    // 🧠 3. AI & GOOGLE TOOLS
    // ==========================================
    else if (command === 'ai' || command === 'gpt') {
        if (!args.length) return await msg.reply('❌ Abe AI se kya poochhna hai? Aage toh likho. \nExample: \`.ai termux kya hai\`');
        const question = args.join(' ');
        await msg.reply(`🧠 *Chintu AI ka Jordaar Jawaab:* \n\nAapne poochha: "${question}"\n\nBot server par ekdam active hai bhai! External AI API connect karne ke liye bas GitHub secret key chahiye, tab tak main aapke baaki saare heavy commands fatfat handle kar raha hoon!`);
    }
    else if (command === 'google') {
        if (!args.length) return await msg.reply('❌ Google par kya dhoondhna hai?');
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
        if (!chat.isGroup) return await msg.reply('❌ Sirf group me kaam karega.');
        await chat.setMessagesAdminsOnly(true);
        await msg.reply('🤫 *Group ko mute kar diya gaya hai!* Ab kewal admins hi message bhej payenge.');
    }
    else if (command === 'unmute') {
        const chat = await msg.getChat();
        if (!chat.isGroup) return await msg.reply('❌ Sirf group me kaam karega.');
        await chat.setMessagesAdminsOnly(false);
        await msg.reply('📢 *Group ko unmute kar diya hai!* Ab sab log chatting kar sakte hain.');
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
    // 👑 5. SUPER OWNER POWER TOOLS
    // ==========================================
    else if (command === 'broadcast') {
        if (!args.length) return await msg.reply('❌ Broadcast karne ke liye aage message likho bhai!');
        const bcMessage = args.join(' ');
        await msg.reply('📢 *Broadcast shuru ho raha hai...*');
        const chats = await client.getChats();
        let count = 0;
        for (let c of chats) {
            if (!c.isGroup) {
                await client.sendMessage(c.id._serialized, `📢 *Chintu Bot Broadcast Message:* \n\n${bcMessage}`);
                count++;
            }
        }
        await msg.reply(`✅ Successfully *${count}* dosto ko message bhej diya gaya hai!`);
    }
    else if (command === 'block') {
        const contact = await msg.getContact();
        await msg.reply('🚫 Is bande ko block kiya jaa raha hai...');
        await contact.block();
    }
    else if (command === 'unblock') {
        const contact = await msg.getContact();
        await msg.reply('✅ Is bande ko unblock kar diya gaya hai.');
        await contact.unblock();
    }

    // ==========================================
    // 🎉 6. FUN & PRANKS
    // ==========================================
    else if (command === 'hack') {
        if (!args.length) return await msg.reply('❌ Abe kiska system hack karna hai? Naam toh likho.');
        const target = args.join(' ');
        await msg.reply(`🕵️‍♂️ *Termux hacking framework chalu ho raha hai...* \n🎯 *Target:* ${target}`);
        setTimeout(async () => { await client.sendMessage(msg.from, `⚙️ ${target} ka WhatsApp database dump ho raha hai... 45%`); }, 1500);
        setTimeout(async () => { await client.sendMessage(msg.from, `🔥 *Hacking Successful!* \nChintu bhai, ${target} ka poora phone ab aapke control me hai! 😎 (Just Prank)`); }, 3500);
    }
    else if (command === 'joke') {
        const jokes = [
            "Pappu: Papa mujhe ek ladki pasand hai, shaadi karni hai. \nPapa: Kya wo bhi tujhe pasand karti hai? \nPappu: Haan ji! \nPapa: Toh shaadi cancel, ladki ki pasand itni kharab hai ki main use apni bahu nahi bana sakta! 🤣",
            "Teacher: Sanju, Newton ka niyam batao. \nSanju: Sir, Newton kunware the, agar shaadi ho gayi hoti toh niyam ki jagah biwi ke nakhre jhel rahe hote! 🤪"
        ];
        await msg.reply(jokes[Math.floor(Math.random() * jokes.length)]);
    }
    else if (command === 'shayari') {
        await msg.reply("Manzilen kya hai rasta kya hai, \nHausla ho toh faasla kya hai! 🔥");
    }
    else if (command === 'roast') {
        if (!args.length) return await msg.reply('❌ Kiska roast karna hai? Naam likho.');
        await msg.reply(`😂 ${args.join(' ')} ki shakal dekh kar toh camera bhi bolta hai - 'Bhai thoda filter laga le please!'`);
    }
    else if (command === 'lovecalc') {
        if (!args.length) return await msg.reply('❌ Abe naam toh likho jiske sath check karna hai!');
        await msg.reply(`❤️ *Love Calculator Result:* \n\nChintu bot ke mutabik aapka aur *${args.join(' ')}* ka match *${Math.floor(Math.random() * 101)}%* perfect hai! 💖`);
    }

    // ==========================================
    // 🛠️ 7. SYSTEM & UTILITY
    // ==========================================
    else if (command === 'ping') {
        const start = Date.now();
        const response = await msg.reply('Speed check ho rahi hai... ⏳');
        await response.edit(`🚀 *PONG!* \n⏱️ *Bot Response Time:* ${Date.now() - start}ms`);
    }
    else if (command === 'alive') {
        await msg.reply('🟢 *Chintu super bot ekdam active aur online hai bhai!* Tod-fod machane ke liye taiyar hai. 🔥');
    }
    else if (command === 'say') {
        if (!args.length) return;
        await client.sendMessage(msg.from, args.join(' '));
    }
    else if (command === 'date') {
        await msg.reply(`📅 *Aaj ki Date aur Time:* \n\n${new Date().toString()}`);
    }
    else if (command === 'owner') {
        await msg.reply('👑 *Bot Owner Info:* \n\nIs bot ke asli maalik aur king hamare *Chintu bhai* hain! 😎⚡\nContact: +919412185706');
    }
});

console.log('Chintu mega bot ka engine chalu ho raha hai...');
client.initialize();
  
