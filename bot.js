const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// ==========================================
// 1. सर्वर कॉन्फ़िगरेशन (Render Docker Fix)
// ==========================================
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--single-process',
            '--disable-gpu'
        ],
        executablePath: '/usr/bin/google-chrome-stable'
    }
});

// ==========================================
// 2. बोट इवेंट्स (QR कोड जनरेटर)
// ==========================================
client.on('qr', (qr) => {
    console.log('\n=========================================');
    console.log('--- व्हाट्सएप से बोट कनेक्ट करें ---');
    console.log('=========================================');
    qrcode.generate(qr, { small: true });
    console.log('\n👉 ऊपर दिए गए QR कोड को अपने व्हाट्सएप से स्कैन करो भाई!');
});

client.on('ready', () => {
    console.log('\n=========================================');
    console.log('🎉 चिंटू भाई, आपका सुपर व्हाट्सएप बोट ऑनलाइन है!');
    console.log('=========================================');
});

// ==========================================
// 3. बोट के सारे कमांड्स (Mega Features)
// ==========================================
client.on('message', async (msg) => {
    const messageBody = msg.body.trim();
    const lowerText = messageBody.toLowerCase();
    const prefix = '.'; // बोट का प्रिफिक्स

    // --- ऑटो रिप्लाई (बिना प्रिफिक्स के) ---
    if (lowerText === 'hi' || lowerText === 'hello' || lowerText === 'bhai') {
        await msg.reply('नमस्ते भाई! मैं चिंटू का पर्सनल व्हाट्सएप सुपर-बोट हूँ। सारे खतरनाक कमांड्स देखने के लिए *.menu* टाइप करें। 🔥🤖');
        return;
    }

    // अगर मैसेज प्रिफिक्स (.) से शुरू नहीं होता तो आगे मत बढ़ो
    if (!messageBody.startsWith(prefix)) return;

    // कमांड और उसके आर्गुमेंट्स को अलग करना
    const args = messageBody.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    // 📜 1. MEGA MENU COMMAND
    if (command === 'menu' || command === 'help') {
        const menuText = `🤖 *⚡ चिंटू सुपर बोट मेनू ⚡* 🤖

*📸 --- इंस्टाग्राम कमांड्स ---*
👉 *.ig [यूज़रनेम]* - किसी भी इंस्टाग्राम प्रोफाइल की लिंक और डिटेल्स निकालें।
👉 *.igdownload [लिंक]* - इंस्टाग्राम रील्स डाउनलोड करने का तरीका जानें।

*🧠 --- एआई (AI) कमांड्स ---*
👉 *.ai [सवाल]* - आर्टिफिशियल इंटेलिजेंस (AI) से कुछ भी पूछें।
👉 *.gpt [सवाल]* - चैटजीपीटी से अपनी कोडिंग या स्क्रिप्ट लिखवाएं।

*🎉 --- फन और एंटरटेनमेंट ---*
👉 *.joke* - एक बढ़िया सा चुटकुला सुनें।
👉 *. शायरी* - एक कड़क हिंदी शायरी सुनें।
👉 *.hack [नाम]* - दोस्त का प्रैंक हैकिंग स्टेटस दिखाएं।

*👥 --- ग्रुप एडमिन टूल्स ---*
👉 *.tagall* - ग्रुप के सभी मेंबर्स को एक साथ मेंशन करें।
👉 *.mute* - ग्रुप चैट बंद करें (सिर्फ एडमिन)।
👉 *.unmute* - ग्रुप चैट चालू करें (सबके लिए)।
👉 *.groupinfo* - ग्रुप का पूरा डेटा निकालें।

*🛠️ --- सिस्टम और जनरल ---*
👉 *.ping* - बोट की रनिंग स्पीड चेक करें।
👉 *.alive* - बोट ऑनलाइन स्टेटस देखें।
👉 *.say [मैसेज]* - बोट से कोई भी बात रिपीट करवाएं।

💡 _शॉर्टकट: कोई भी कमांड चलाने के लिए उसके पहले बिंदी (.) लगाएं, जैसे: .menu_`;
        await msg.reply(menuText);
    }

    // 📸 2. INSTAGRAM PROFILE COMMAND
    else if (command === 'ig') {
        if (!args.length) {
            await msg.reply('❌ कृपया इंस्टाग्राम का यूज़रनेम लिखें भाई! \nउदाहरण: `.ig chintu_username`');
            return;
        }
        const username = args[0].replace('@', '');
        const igInfo = `📸 *इंस्टाग्राम प्रोफाइल इन्फो:*
        
👤 *यूज़रनेम:* @${username}
🔗 *प्रोफाइल लिंक:* https://instagram.com/${username}

💡 _नोट: इस प्रोफाइल की रील्स या डीपी डाउनलोड करने के लिए आप लिंक कॉपी करके बोट पर डाल सकते हैं!_`;
        await msg.reply(igInfo);
    }

    // 📥 3. INSTAGRAM REEL DOWNLOAD GUIDE
    else if (command === 'igdownload') {
        if (!args.length) {
            await msg.reply('❌ कृपया इंस्टाग्राम रील/वीडियो की लिंक डालें। \nउदाहरण: `.igdownload https://instagram.com/reel/...`');
            return;
        }
        await msg.reply('📥 *डाउनलोडर एक्टिवेट हो रहा है...* \n\nभाई रेंडर के फ्री सर्वर पर डायरेक्ट वीडियो डाउनलोडिंग ब्लॉक है, इसलिए आप इस लिंक को किसी भी ऑनलाइन डाउनलोडर वेबसाइट पर पेस्ट करके 1 सेकंड में वीडियो गैलरी में सेव कर सकते हैं! 🔥');
    }

    // 🧠 4. AI / GPT COMMAND
    else if (command === 'ai' || command === 'gpt') {
        if (!args.length) {
            await msg.reply('❌ एआई से क्या पूछना है? आगे लिखें। \nउदाहरण: `.ai टर्मक्स क्या है?`');
            return;
        }
        const question = args.join(' ');
        await msg.reply(`🧠 *चिंटू एआई का जवाब:* \n\nआपने पूछा: "${question}"\n\nबोट एकदम एक्टिव है भाई! रेंडर पर एआई चालू करने के लिए गिटहब में अपनी API की डालनी होगी, तब तक मैं आपके सारे लोकल कमांड्स फटाफट हैंडल कर रहा हूँ!`);
    }

    // ⚡ 5. PING COMMAND
    else if (command === 'ping') {
        const start = Date.now();
        const response = await msg.reply('चेक कर रहा हूँ... ⏳');
        const end = Date.now();
        await response.edit(`🚀 *पोंग!* बोट एकदम झकास चल रहा है।\n⏱️ *स्पीड:* ${end - start}ms`);
    }

    // 🟢 6. ALIVE COMMAND
    else if (command === 'alive') {
        await msg.reply('🟢 *चिंटू बोट एकदम एक्टिव और ऑनलाइन है भाई!* तोड़-फोड़ मचाने के लिए तैयार है। 🔥');
    }

    // 🎉 7. JOKE COMMAND
    else if (command === 'joke') {
        const jokes = [
            "पप्पू: पापा मुझे एक लड़की बहुत पसंद है, मैं उससे शादी करना चाहता हूँ। \nपाप्पा: क्या वो भी तुम्हें पसंद करती है? \nपप्पू: हाँ जी, हाँ! \nपापा: तो समझो, लड़की की पसंद कितनी खराब है, शादी कैंसिल! 🤣",
            "टीचर: न्यूटन का नियम बताओ। \nसंजू: सर, न्यूटन की शादी नहीं हुई थी, अगर हुई होती तो नियम की जगह 'पत्नी के नखरे' ढूँढ रहे होते! 🤪"
        ];
        const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
        await msg.reply(randomJoke);
    }

    // ✍️ 8. SHAYARI COMMAND
    else if (command === 'शायरी' || command === 'shayari') {
        const shayaris = [
            "चलता रहा अगर चिंटू भाई का यह बोट... ⚡\nतो व्हाट्सएप की दुनिया में मच जाएगा तहलका और बहुत सारा शोर! 😎",
            "मंजिलें क्या है रास्ता क्या है, \nहौसला हो तो फासला क्या है! 🔥"
        ];
        const randomShayari = shayaris[Math.floor(Math.random() * shayaris.length)];
        await msg.reply(randomShayari);
    }

    // 💻 9. HACK PRANK COMMAND
    else if (command === 'hack') {
        if (!args.length) {
            await msg.reply('❌ किसका सिस्टम हैक करना है? आगे नाम लिखो। \nउदाहरण: `.hack राहुल`');
            return;
        }
        const target = args.join(' ');
        await msg.reply(`🕵️‍♂️ *हैकिंग टूल चालू हो रहा है...* \n🎯 टारगेट: ${target}`);
        
        setTimeout(async () => {
            await client.sendMessage(msg.from, `⚙️ ${target} का व्हाट्सएप डेटाबेस निकाला जा रहा है... 25%`);
        }, 2000);
        setTimeout(async () => {
            await client.sendMessage(msg.from, `📁 मीडिया और गुप्त चैट्स लोड हो रहे हैं... 65%`);
        }, 4000);
        setTimeout(async () => {
            await client.sendMessage(msg.from, `🔥 *सफलतापूर्वक हैक पूरा हुआ!* \nचिंटू भाई, ${target} का पूरा सिस्टम अब आपके कंट्रोल में है! 😉 (Just Prank)`);
        }, 6000);
    }

    // 💬 10. SAY COMMAND
    else if (command === 'say') {
        if (!args.length) {
            await msg.reply('❌ आगे मैसेज लिखें। उदाहरण: `.say जय श्री राम`');
            return;
        }
        await client.sendMessage(msg.from, args.join(' '));
    }

    // 👋 11. TAGALL COMMAND
    else if (command === 'tagall') {
        const chat = await msg.getChat();
        if (!chat.isGroup) {
            await msg.reply('❌ भाई, यह कमांड सिर्फ ग्रुप में काम करता है!');
            return;
        }
        let mentions = [];
        let text = `📢 *ग्रुप के सभी भाइयों ध्यान दो:* \n\n`;
        for (let participant of chat.participants) {
            const contact = await client.getContactById(participant.id._serialized);
            mentions.push(contact);
            text += `@${participant.id.user} `;
        }
        await chat.sendMessage(text, { mentions });
    }

    // 🤫 12. MUTE COMMAND
    else if (command === 'mute') {
        const chat = await msg.getChat();
        if (!chat.isGroup) return await msg.reply('❌ यह सिर्फ ग्रुप के लिए है!');
        await chat.setMessagesAdminsOnly(true);
        await msg.reply('🤫 *ग्रुप को म्यूट कर दिया गया है!* अब सिर्फ एडमिन मैसेज कर सकते हैं।');
    }

    // 📢 13. UNMUTE COMMAND
    else if (command === 'unmute') {
        const chat = await msg.getChat();
        if (!chat.isGroup) return await msg.reply('❌ यह सिर्फ ग्रुप के लिए है!');
        await chat.setMessagesAdminsOnly(false);
        await msg.reply('📢 *ग्रुप को अनम्यूट कर दिया गया है!* अब सब लोग मैसेज कर सकते हैं।');
    }

    // 👥 14. GROUP INFO COMMAND
    else if (command === 'groupinfo') {
        const chat = await msg.getChat();
        if (!chat.isGroup) return await msg.reply('❌ यह सिर्फ ग्रुप के लिए है!');
        await msg.reply(`👥 *ग्रुप नाम:* ${chat.name}\n🆔 *आईडी:* ${chat.id._serialized}\n👥 *कुल मेंबर्स:* ${chat.participants.length}`);
    }
});

// ==========================================
// 4. बोट इंजन चालू करना
// ==========================================
console.log('चिंटू सुपर बोट का इंजन चालू हो रहा है, कृपया थोड़ा इंतज़ार करें...');
client.initialize();
          
