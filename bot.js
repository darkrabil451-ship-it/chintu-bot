const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// ==========================================
// 1. बोट सेटअप (Render Docker Compatibility)
// ==========================================
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
// 2. कनेक्शन इवेंट्स
// ==========================================
client.on('qr', (qr) => {
    console.log('\n=========================================');
    console.log('--- व्हाट्सएप से बोट कनेक्ट करें ---');
    console.log('=========================================');
    qrcode.generate(qr, { small: true });
    console.log('\n👉 ऊपर दिए गए QR कोड को व्हाट्सएप से स्कैन करो भाई!');
});

client.on('ready', () => {
    console.log('\n🟢 चिंटू भाई, आपका अल्टीमेट सुपर बोट ऑनलाइन हो चुका है! 🔥');
});

// ==========================================
// 3. मेगा बोट लॉजिक और कमांड्स
// ==========================================
client.on('message', async (msg) => {
    const messageBody = msg.body.trim();
    const lowerText = messageBody.toLowerCase();
    const prefix = '.'; // बोट का मुख्य प्रिफिक्स

    // --- स्मार्ट ऑटो रिप्लाई (बिना प्रिफिक्स के) ---
    if (lowerText === 'hi' || lowerText === 'hello' || lowerText === 'bhai') {
        await msg.reply('नमस्ते भाई! मैं चिंटू का पर्सनल व्हाट्सएप सुपर-बोट हूँ। सारे धांसू कमांड्स देखने के लिए *.menu* टाइप करें। 🔥🤖');
        return;
    }
    if (lowerText === 'good morning') {
        await msg.reply('सुप्रभात भाई! आपका दिन शुभ हो। 🌅');
        return;
    }
    if (lowerText === 'good night') {
        await msg.reply('शुभ रात्रि भाई! सो जाओ अब, सपने में बोट मत चलाना। 😴');
        return;
    }

    // अगर मैसेज प्रिफिक्स से शुरू नहीं होता तो आगे मत बढ़ो
    if (!messageBody.startsWith(prefix)) return;

    // कमांड और आर्गुमेंट्स अलग करना
    const args = messageBody.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    // ==========================================
    // श्रेणी 1: मेनू और हेल्प (MENU & HELP)
    // ==========================================
    if (command === 'menu' || command === 'help') {
        const menuText = `🤖 *⚡ चिंटू अल्टीमेट सुपर बोट ⚡* 🤖

*📸 [इन्स्टाग्राम कमांड्स]*
👉 *.ig [यूज़रनेम]* - प्रोफाइल डिटेल्स देखें।
👉 *.iglink* - इंस्टाग्राम ओपन करने की डायरेक्ट लिंक।
👉 *.igdownload [लिंक]* - रील्स डाउनलोड गाइड।

*🧠 [एआई (AI) और राइटिंग]*
👉 *.ai [सवाल]* - चिंटू स्मार्ट एआई से पूछें।
👉 *.gpt [सवाल]* - कोडिंग या स्क्रिप्ट लिखवाएं।
👉 *.google [सवाल]* - सर्च करने का स्मार्ट तरीका।

*👥 [ग्रुप एडमिन टूल्स]*
👉 *.tagall* - ग्रुप के सभी मेंबर्स को एक साथ टैग करें।
👉 *.mute* - ग्रुप चैट बंद करें (Admins Only)।
👉 *.unmute* - ग्रुप चैट खोलें (For Everyone)।
👉 *.groupinfo* - ग्रुप का पूरा इतिहास और डेटा।
👉 *.admins* - ग्रुप के सभी एडमींस की लिस्ट।

*🎉 [फन और प्रैंक्स]*
👉 *.hack [नाम]* - दोस्त का प्रैंक टर्मक्स हैकिंग।
👉 *.joke* - एक धमाकेदार हंसगुल्ला चुटकुला।
👉 *.shayari* - कड़क एटीट्यूड/लव हिंदी शायरी।
👉 *.roast [नाम]* - दोस्त की खतरनाक रोस्टिंग (मजाक)।
👉 *.lovecalc [नाम]* - लव परसेंटेज कैलकुलेटर।

*🛠️ [सिस्टम और टूल्स]*
👉 *.ping* - बोट रिस्पॉन्स स्पीड चेक करें।
👉 *.alive* - बोट एक्टिविटी स्टेटस देखें।
👉 *.say [मैसेज]* - बोट से अपनी बात रिपीट करवाएं।
👉 *.date* - आज की तारीख और समय जानें।
👉 *.owner* - बोट के मालिक की जानकारी।

💡 _शॉर्टकट: कोई भी कमांड चलाने के लिए उसके पहले बिंदी (.) लगाएं, जैसे: .ping_`;
        await msg.reply(menuText);
    }

    // ==========================================
    // श्रेणी 2: इंस्टाग्राम कमांड्स (INSTAGRAM)
    // ==========================================
    else if (command === 'ig') {
        if (!args.length) return await msg.reply('❌ कृपया इंस्टाग्राम का यूज़रनेम लिखें। \nउदाहरण: `.ig chintu_dev`');
        const username = args[0].replace('@', '');
        await msg.reply(`📸 *इंस्टाग्राम प्रोफाइल सर्च:* \n\n👤 *यूज़रनेम:* @${username}\n🔗 *डायरेक्ट लिंक:* https://instagram.com/${username}\n\n💡 _चिंटू भाई, आप ऊपर दी गई लिंक पर क्लिक करके सीधे प्रोफाइल पर जा सकते हैं!_`);
    }

    else if (command === 'iglink') {
        await msg.reply('📸 डायरेक्ट इंस्टाग्राम पर जाने के लिए यहाँ क्लिक करें: \n👉 https://instagram.com');
    }

    else if (command === 'igdownload') {
        if (!args.length) return await msg.reply('❌ कृपया इंस्टाग्राम रील की लिंक डालें। \nउदाहरण: `.igdownload https://instagram.com/reel/...`');
        await msg.reply('📥 *रील डाउनलोडर मॉड्यूल:* \n\nभाई रेंडर के फ्री लिनक्स सर्वर पर डायरेक्ट वीडियो डाउनलोडिंग और मीडिया सेंडिंग ब्लॉक है, इसलिए आप इस लिंक को कॉपी करके किसी भी *' + 'SaveFrom' + '* या *' + 'SnapInsta' + '* वेबसाइट पर डालकर 1 सेकंड में एचडी वीडियो डाउनलोड कर सकते हैं! 🔥');
    }

    // ==========================================
    // श्रेणी 3: एआई कमांड्स (AI / GPT)
    // ==========================================
    else if (command === 'ai' || command === 'gpt') {
        if (!args.length) return await msg.reply('❌ एआई से क्या पूछना है? आगे लिखें। \nउदाहरण: `.ai जावास्क्रिप्ट क्या है?`');
        const question = args.join(' ');
        await msg.reply(`🧠 *चिंटू एआई का जवाब:* \n\nआपने पूछा: "${question}"\n\nबोट सर्वर पर एकदम एक्टिव है भाई! रेंडर पर बाहरी एआई API कनेक्ट करने के लिए बस आपकी गिटहब सीक्रेट की (Secret Key) चाहिए, तब तक मैं आपके सारे लोकल कमांड्स बिना रुके हैंडल कर रहा हूँ!`);
    }

    else if (command === 'google') {
        if (!args.length) return await msg.reply('❌ क्या सर्च करना है? आगे लिखें।');
        const query = encodeURIComponent(args.join(' '));
        await msg.reply(`🔍 *गूगल सर्च लिंक तैयार है:* \n👉 https://www.google.com/search?q=${query}`);
    }

    // ==========================================
    // श्रेणी 4: ग्रुप एडमिन टूल्स (GROUP TOOLS)
    // ==========================================
    else if (command === 'tagall') {
        const chat = await msg.getChat();
        if (!chat.isGroup) return await msg.reply('❌ भाई, यह कमांड सिर्फ व्हाट्सएप ग्रुप में काम करता है!');
        
        let mentions = [];
        let text = `📢 *ग्रुप के सभी भाइयों ध्यान दो (Tag All):* \n\n`;
        for (let participant of chat.participants) {
            const contact = await client.getContactById(participant.id._serialized);
            mentions.push(contact);
            text += `@${participant.id.user} `;
        }
        await chat.sendMessage(text, { mentions });
    }

    else if (command === 'mute') {
        const chat = await msg.getChat();
        if (!chat.isGroup) return await msg.reply('❌ यह सिर्फ ग्रुप के लिए है!');
        await chat.setMessagesAdminsOnly(true);
        await msg.reply('🤫 *ग्रुप को म्यूट कर दिया गया है!* अब सिर्फ एडमींस ही मैसेज भेज पाएंगे।');
    }

    else if (command === 'unmute') {
        const chat = await msg.getChat();
        if (!chat.isGroup) return await msg.reply('❌ यह सिर्फ ग्रुप के लिए है!');
        await chat.setMessagesAdminsOnly(false);
        await msg.reply('📢 *ग्रुप को अनम्यूट कर दिया गया है!* अब सभी मेंबर्स मैसेज कर सकते हैं।');
    }

    else if (command === 'groupinfo') {
        const chat = await msg.getChat();
        if (!chat.isGroup) return await msg.reply('❌ यह सिर्फ ग्रुप के लिए है!');
        await msg.reply(`👥 *ग्रुप का नाम:* ${chat.name}\n🆔 *ग्रुप आईडी:* ${chat.id._serialized}\n👥 *कुल मेंबर्स:* ${chat.participants.length}\n🔒 *सिर्फ एडमिन मैसेज:* ${chat.isReadOnly ? 'हाँ' : 'ना'}`);
    }

    else if (command === 'admins') {
        const chat = await msg.getChat();
        if (!chat.isGroup) return await msg.reply('❌ यह सिर्फ ग्रुप के लिए है!');
        let adminText = `👑 *ग्रुप के सभी एडमींस:* \n\n`;
        for (let participant of chat.participants) {
            if (participant.isAdmin || participant.isSuperAdmin) {
                adminText += `• @${participant.id.user}\n`;
            }
        }
        await msg.reply(adminText);
    }

    // ==========================================
    // श्रेणी 5: फन और प्रैंक्स (FUN & PRANKS)
    // ==========================================
    else if (command === 'hack') {
        if (!args.length) return await msg.reply('❌ किसका सिस्टम हैक करना है? आगे नाम लिखो भाई।');
        const target = args.join(' ');
        await msg.reply(`🕵️‍♂️ *टर्मक्स हैकिंग फ्रेमवर्क चालू हो रहा है...* \n🎯 *टारगेट:* ${target}`);
        setTimeout(async () => { await client.sendMessage(msg.from, `⚙️ ${target} का व्हाट्सएप डेटाबेस डंप किया जा रहा है... 25%`); }, 1500);
        setTimeout(async () => { await client.sendMessage(msg.from, `📁 गुप्त चैट्स और आईपी एड्रेस एक्सट्रेक्ट हो रहे हैं... 60%`); }, 3000);
        setTimeout(async () => { await client.sendMessage(msg.from, `🔥 *सफलतापूर्वक हैक पूरा हुआ!* \nचिंटू भाई, ${target} का पूरा फोन अब आपके कंट्रोल में है! 😎 (Just Prank)`); }, 4500);
    }

    else if (command === 'joke') {
        const jokes = [
            "पप्पू: पापा मुझे एक लड़की बहुत पसंद है, शादी करनी है। \nपापा: क्या वो भी तुम्हें पसंद करती है? \nपप्पू: हाँ जी! \nपापा: तो समझो शादी कैंसिल, लड़की की पसंद इतनी खराब है तो मैं उसे अपनी बहू नहीं बनाऊंगा! 🤣",
            "टीचर: संजू, न्यूटन का नियम बताओ। \nसंजू: सर, न्यूटन कुंवारे थे, अगर शादी हो गई होती तो नियम की जगह बीवी के नखरे झेल रहे होते! 🤪",
            "डॉक्टर: आपको आराम की सख्त जरूरत है, नींद की गोली बीवी को खिला दो। 🤫"
        ];
        await msg.reply(jokes[Math.floor(Math.random() * jokes.length)]);
    }

    else if (command === 'shayari') {
        const shayaris = [
            "मंजिलें क्या है रास्ता क्या है, \nहौसला हो तो फासला क्या है! 🔥",
            "चलता रहा अगर चिंटू भाई का यह बोट... ⚡\nतो व्हाट्सएप की दुनिया में मच जाएगा तहलका और बहुत सारा शोर! 😎",
            "अपना अंदाज कुछ ऐसा है, \nजब हम बोलते हैं तो दुश्मन भी कहते हैं वाह भाई क्या बात है!"
        ];
        await msg.reply(shayaris[Math.floor(Math.random() * shayaris.length)]);
    }

    else if (command === 'roast') {
        if (!args.length) return await msg.reply('❌ किसका रोस्ट करना है? नाम लिखो।');
        const name = args.join(' ');
        const roasts = [
            `😂 ${name} की शक्ल देखकर तो कैमरा भी बोलता है - भाई थोड़ा फिल्टर लगा ले प्लीज!`,
            `😜 ${name} इतना सीधा है कि इसे मच्छर भी काटता है तो ये बोलता है - थैंक्यू भाई, खून चेक करने के लिए!`
        ];
        await msg.reply(roasts[Math.floor(Math.random() * roasts.length)]);
    }

    else if (command === 'lovecalc') {
        if (!args.length) return await msg.reply('❌ किसका नाम कैलकुलेट करना है? उदाहरण: `.lovecalc राहुल`');
        const name = args.join(' ');
        const percentage = Math.floor(Math.random() * 101);
        await msg.reply(`❤️ *लव कैलकुलेटर परिणाम:* \n\nचिंटू बोट के अनुसार आपका और *${name}* का मैच *${percentage}%* परफेक्ट है! 💖`);
    }

    // ==========================================
    // श्रेणी 6: सिस्टम और यूटिलिटी (UTILITY)
    // ==========================================
    else if (command === 'ping') {
        const start = Date.now();
        const response = await msg.reply('स्पीड चेक हो रही है... ⏳');
        await response.edit(`🚀 *पोंग (Pong)!* \n⏱️ *बोट रिस्पॉन्स टाइम:* ${Date.now() - start}ms\n⚡ *सर्वर स्टेटस:* एकदम मक्खन!`);
    }

    else if (command === 'alive') {
        await msg.reply('🟢 *चिंटू सुपर बोट एकदम एक्टिव, ऑनलाइन और तोड़-फोड़ मचाने के लिए तैयार है भाई!* 🔥');
    }

    else if (command === 'say') {
        if (!args.length) return await msg.reply('❌ आगे मैसेज लिखें। उदाहरण: `.say चिंटू भाई जिंदाबाद`');
        await client.sendMessage(msg.from, args.join(' '));
    }

    else if (command === 'date') {
        const today = new Date();
        await msg.reply(`📅 *आज की तारीख और समय:* \n\n${today.toString()}`);
    }

    else if (command === 'owner') {
        await msg.reply('👑 *बोट ओनर इन्फो:* \n\nइस बोट के असली मालिक और किंग *चिंटू भाई* हैं! 😎⚡');
    }
});

// ==========================================
// 4. बोट इंजन स्टार्ट
// ==========================================
console.log('चिंटू मेगा बोट का इंजन चालू हो रहा है, कृपया 10 सेकंड रुकें...');
client.initialize();
  
