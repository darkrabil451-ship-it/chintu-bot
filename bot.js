// ============================================================
//   CHINTU BOT v1.0 — Upgraded Edition
//   WhatsApp Group Management Bot
//   Connect: Phone Number (Pairing Code) — No QR needed!
// ============================================================

const { Client, LocalAuth } = require('whatsapp-web.js');
const readline = require('readline');

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: { args: ['--no-sandbox'] }
});

// ─────────────────────────────────────────
//  PAIRING CODE — Number se connect karo
// ─────────────────────────────────────────
client.on('ready', () => {
    console.log('\n✅ CHINTU BOT ONLINE — READY TO ROCK!\n');
});

client.on('authenticated', () => {
    console.log('\n🔐 Authenticated! Bot chal raha hai...\n');
});

client.on('auth_failure', () => {
    console.log('\n❌ Auth fail! Dobara try karo.\n');
});

// Pairing code generate karo
client.on('qr', async () => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    rl.question('\n📱 Apna WhatsApp number likho (country code ke sath, e.g. 91xxxxxxxxxx): ', async (number) => {
        rl.close();
        number = number.replace(/[^0-9]/g, ''); // Sirf numbers
        try {
            const code = await client.requestPairingCode(number);
            console.log(`\n✅ Tumhara Pairing Code: ${code}`);
            console.log('\n👉 WhatsApp kholो → Linked Devices → Link with Phone Number → Yeh code enter karo\n');
        } catch (e) {
            console.log('\n❌ Error:', e.message);
        }
    });
});

// ─────────────────────────────────────────
//  DATA STORE
// ─────────────────────────────────────────
const warnings = {};
const mutedUsers = {};
const groupSettings = {};

const MAX_WARNINGS = 3;

function getSettings(groupId) {
    if (!groupSettings[groupId]) {
        groupSettings[groupId] = {
            antiLink: true,
            welcomeMsg: '👋 Welcome to the group, @user! Please read the rules.',
            rules: '📌 Rules:\n1. No links\n2. No spam\n3. Respect everyone',
        };
    }
    return groupSettings[groupId];
}

// ─────────────────────────────────────────
//  WELCOME / GOODBYE
// ─────────────────────────────────────────
client.on('group_join', async (notification) => {
    const chat = await notification.getChat();
    const settings = getSettings(chat.id._serialized);
    const contact = await notification.getContact();
    const msg = settings.welcomeMsg.replace('@user', `@${contact.id.user}`);
    await chat.sendMessage(msg, { mentions: [contact] });
});

client.on('group_leave', async (notification) => {
    const chat = await notification.getChat();
    const contact = await notification.getContact();
    await chat.sendMessage(`👋 Goodbye *${contact.pushname || contact.number}*! Take care.`);
});

// ─────────────────────────────────────────
//  MESSAGE HANDLER
// ─────────────────────────────────────────
client.on('message', async (msg) => {
    const chat = await msg.getChat();
    if (!chat.isGroup) return;

    const sender = msg.author || msg.from;
    const groupId = chat.id._serialized;
    const settings = getSettings(groupId);

    const participants = chat.participants;
    const senderParticipant = participants.find(p => p.id._serialized === sender);
    const isAdmin = senderParticipant?.isAdmin || senderParticipant?.isSuperAdmin;
    const isBotAdmin = participants.find(p => p.id._serialized === client.info.wid._serialized)?.isAdmin;

    const body = msg.body.trim();
    const linkRegex = /(https?:\/\/|www\.|bit\.ly|t\.me|wa\.me|youtu\.be|tinyurl|discord\.gg)/i;

    // ── ANTI-LINK ──────────────────────────────────────────
    if (settings.antiLink && linkRegex.test(body) && !isAdmin) {
        try { await msg.delete(true); } catch (e) {}

        if (!warnings[groupId]) warnings[groupId] = {};
        if (!warnings[groupId][sender]) warnings[groupId][sender] = 0;
        warnings[groupId][sender]++;

        const warnCount = warnings[groupId][sender];
        const contact = await msg.getContact();

        if (warnCount >= MAX_WARNINGS) {
            if (isBotAdmin) {
                await chat.removeParticipants([sender]);
                await chat.sendMessage(`🚫 *${contact.pushname || contact.number}* ko 3 warnings ke baad remove kar diya gaya.`);
                warnings[groupId][sender] = 0;
            } else {
                await chat.sendMessage(`⚠️ @${contact.id.user} — Warning ${warnCount}/${MAX_WARNINGS}\n(Bot ko admin banao taake kick ho sake)`, { mentions: [contact] });
            }
        } else {
            await chat.sendMessage(`⚠️ @${contact.id.user} — Warning *${warnCount}/${MAX_WARNINGS}*\n🔗 Links bheja *mana* hai!\n${warnCount === 2 ? '⚠️ Yeh aakhri warning hai!' : ''}`, { mentions: [contact] });
        }
        return;
    }

    // ── MUTED USER ─────────────────────────────────────────
    if (!mutedUsers[groupId]) mutedUsers[groupId] = new Set();
    if (mutedUsers[groupId].has(sender) && !isAdmin) {
        try { await msg.delete(true); } catch (e) {}
        return;
    }

    if (!body.startsWith('!')) return;

    const args = body.slice(1).split(' ');
    const command = args[0].toLowerCase();

    const mentionedContacts = await msg.getMentions();
    const targetContact = mentionedContacts[0] || null;
    const targetId = targetContact?.id._serialized;

    // 🔓 ये कमांड्स सब लोग (Members + Admins) देख सकते हैं बिना रोक-टोक के
    if (command === 'help') {
        await msg.reply(
            `🤖 *CHINTU BOT Commands*\n\n` +
            `!help — Yeh menu dekho\n` +
            `!rules — Group rules dekho\n` +
            `!stats — Group ki details dekho\n` +
            `!insta — My Instagram Account 📸\n\n` +
            `👑 *Admins Only Commands:*\n` +
            `!warn @user — Warning do\n` +
            `!clearwarn @user — Clear warnings\n` +
            `!warnings @user — Check warnings\n` +
            `!kick @user — Member ko kick karo\n` +
            `!mute @user — Member ko mute karo\n` +
            `!unmute @user — Member ko unmute karo\n` +
            `!mutechat — Poore group ko lock karo 🔒\n` +
            `!unmutechat — Group chat unlock karo 🔓\n` +
            `!promote @user — Admin banao 👑\n` +
            `!demote @user — Admin se hatao 📉\n` +
            `!antilink on/off — Link protection toggle\n` +
            `!tagall <msg> — Sab ko tag karo\n` +
            `!setrules <text> — Rules badlo\n\n` +
            `_Upgraded Edition_ 🖤`
        );
        return;
    }

    if (command === 'rules') {
        await chat.sendMessage(settings.rules);
        return;
    }

    if (command === 'insta') {
        await chat.sendMessage(`📸 *Follow me on Instagram:* \nhttps://www.instagram.com/darkrabil400?igsh=cjlwYnFqaHhmZmdz`);
        return;
    }

    // 🔒 इसके नीचे के सारे पावरफुल कमांड्स के लिए ADMIN होना ज़रूरी है
    if (!isAdmin) {
        await msg.reply('❌ Yeh command sirf *admins* ke liye hai!');
        return;
    }

    switch (command) {

        case 'warn': {
            if (!targetContact) { await msg.reply('❌ Sahi istemaal: !warn @user'); break; }
            if (!warnings[groupId]) warnings[groupId] = {};
            if (!warnings[groupId][targetId]) warnings[groupId][targetId] = 0;
            warnings[groupId][targetId]++;
            const wc = warnings[groupId][targetId];
            await chat.sendMessage(`⚠️ @${targetContact.id.user} ko warning di gayi — *${wc}/${MAX_WARNINGS}*`, { mentions: [targetContact] });
            if (wc >= MAX_WARNINGS && isBotAdmin) {
                await chat.removeParticipants([targetId]);
                await chat.sendMessage(`🚫 3 warnings — *${targetContact.pushname || targetContact.number}* remove!`);
                warnings[groupId][targetId] = 0;
            }
            break;
        }

        case 'kick': {
            if (!targetContact) { await msg.reply('❌ Sahi istemaal: !kick @user'); break; }
            if (!isBotAdmin) { await msg.reply('❌ Bot ko admin banao!'); break; }
            await chat.removeParticipants([targetId]);
            await msg.reply(`✅ *${targetContact.pushname || targetContact.number}* kick ho gaya.`);
            break;
        }

        case 'mute': {
            if (!targetContact) { await msg.reply('❌ Sahi istemaal: !mute @user'); break; }
            mutedUsers[groupId].add(targetId);
            await chat.sendMessage(`🔇 @${targetContact.id.user} mute ho gaya.`, { mentions: [targetContact] });
            break;
        }

        case 'unmute': {
            if (!targetContact) { await msg.reply('❌ Sahi istemaal: !unmute @user'); break; }
            mutedUsers[groupId]?.delete(targetId);
            await chat.sendMessage(`🔊 @${targetContact.id.user} unmute ho gaya.`, { mentions: [targetContact] });
            break;
        }

        case 'mutechat': {
            if (!isBotAdmin) { await msg.reply('❌ Bot ko admin banao taake chat lock ho sake!'); break; }
            await chat.setMessagesAdminsOnly(true);
            await chat.sendMessage('🔒 *Group Chat Locked!* Ab sirf Admins hi naye message bhej sakte hain.');
            break;
        }

        case 'unmutechat': {
            if (!isBotAdmin) { await msg.reply('❌ Bot ko admin banao taake chat unlock ho sake!'); break; }
            await chat.setMessagesAdminsOnly(false);
            await chat.sendMessage('🔓 *Group Chat Unlocked!* Ab sabhi members message bhej sakte hain.');
            break;
        }

        case 'promote': {
            if (!targetContact) { await msg.reply('❌ Sahi istemaal: !promote @user'); break; }
            if (!isBotAdmin) { await msg.reply('❌ Bot ko admin banao!'); break; }
            await chat.promoteParticipants([targetId]);
            await chat.sendMessage(`👑 @${targetContact.id.user} ab is group ke *Admin* hain!`, { mentions: [targetContact] });
            break;
        }

        case 'demote': {
            if (!targetContact) { await msg.reply('❌ Sahi istemaal: !demote @user'); break; }
            if (!isBotAdmin) { await msg.reply('❌ Bot ko admin banao!'); break; }
            await chat.demoteParticipants([targetId]);
            await chat.sendMessage(`📉 @${targetContact.id.user} ko *Admin* pad se hata diya gaya hai.`, { mentions: [targetContact] });
            break;
        }

        case 'warnings': {
            if (!targetContact) { await msg.reply('❌ Sahi istemaal: !warnings @user'); break; }
            const wc = warnings[groupId]?.[targetId] || 0;
            await msg.reply(`📊 @${targetContact.id.user} warnings: *${wc}/${MAX_WARNINGS}*`);
            break;
        }

        case 'clearwarn': {
            if (!targetContact) { await msg.reply('❌ Sahi istemaal: !clearwarn @user'); break; }
            if (warnings[groupId]) warnings[groupId][targetId] = 0;
            await chat.sendMessage(`✅ @${targetContact.id.user} warnings clear!`, { mentions: [targetContact] });
            break;
        }

        case 'antilink': {
            const val = args[1]?.toLowerCase();
            if (val === 'on') { settings.antiLink = true; await msg.reply('✅ Anti-Link ON'); }
            else if (val === 'off') { settings.antiLink = false; await msg.reply('✅ Anti-Link OFF'); }
            else await msg.reply(`🔗 Anti-Link: *${settings.antiLink ? 'ON' : 'OFF'}*\nUse: !antilink on/off`);
            break;
        }

        case 'setrules': {
            const newRules = args.slice(1).join(' ');
            if (!newRules) { await msg.reply('❌ !setrules <text>'); break; }
            settings.rules = newRules;
            await msg.reply('✅ Rules update ho gayi!');
            break;
        }

        case 'tagall': {
            const text = args.slice(1).join(' ') || '📢 Announcement!';
            const mentions = chat.participants.map(p => p.id._serialized);
            const mentionContacts = await Promise.all(mentions.map(id => client.getContactById(id)));
            const mentionText = mentionContacts.map(c => `@${c.id.user}`).join(' ');
            await chat.sendMessage(`${text}\n\n${mentionText}`, { mentions: mentionContacts });
            break;
        }

        case 'stats': {
            const total = chat.participants.length;
            const admins = chat.participants.filter(p => p.isAdmin || p.isSuperAdmin).length;
            const totalWarnings = Object.values(warnings[groupId] || {}).reduce((a, b) => a + b, 0);
            await msg.reply(`📊 *Group Stats*\n👥 Members: ${total}\n👑 Admins: ${admins}\n⚠️ Warnings: ${totalWarnings}\n🔗 Anti-Link: ${settings.antiLink ? 'ON' : 'OFF'}`);
            break;
        }

        default:
            await msg.reply('❓ Unknown command. !help likho.');
    }
});

// ─────────────────────────────────────────
//  START
// ─────────────────────────────────────────
client.initialize();
          
