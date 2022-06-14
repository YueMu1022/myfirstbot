// 載入npm包
import { Client, Intents } from 'discord.js';
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_VOICE_STATES] });
import 'dotenv/config';
import { Player } from 'discord-music-player';
const player = new Player(client)
// 載入指令包
import cmdvote from './cmd/vote.js';
import ping from './cmd/ping.js';
import forex from './cmd/forex.js';
import help from './cmd/help.js';
import calc from './cmd/calc.js';
import random from './cmd/random.js';
import timer from './cmd/timer.js';
import music from './features/music.js'
// 載入管理員指令包
import pull from './cmd/admin/pull.js';
import sync from './cmd/admin/sync.js';
// 載入功能包
import vote from './features/vote.js';
// 載入lib
import errcall from './lib/err.js'
import deploycmd from './lib/deploy-cmd.js';
import createembed from './lib/embed.js'

const prefix = process.env.prefix

client.on('ready', () => {
    console.log('ready!');
    client.user.setActivity('嗨你好', {
        type: 'PLAYING'
    });
    deploycmd(client.application.commands);
});

player.on('error', (err) => {
    errcall(err, client)
})

client.on('error', (err) => {
    errcall(err, client)
})

process.on('uncaughtException', (err) => {
    errcall(err, client)
})

process.on('unhandledRejection', (err) => {
    errcall(err, client)
})

client.on('interactionCreate', (i) => {
    if (i.isButton()) {
        if (i.customId.startsWith('vote')) {
            vote.btnclick(i)
            return
        }
        if (i.customId.startsWith('music')) {
            music.btn(i, player)
            return
        }
    };

    if (i.isSelectMenu()) {
        if (i.customId == 'role') {
            selectRole.select(i)
        }
    };
    
    if (i.isCommand()) {
        if (i.commandName == 'ping') {
            ping(i);
            return;
        };
        if (i.commandName == 'vote') {
            cmdvote(i);
            return;
        };
        if (i.commandName == 'forex') {
            forex(i);
            return;
        };
        if (i.commandName == 'help') {
            help(i);
            return;
        };
        if (i.commandName == 'calc') {
            calc(i);
            return;
        };
        if (i.commandName == 'random') {
            random(i);
            return;
        };
        if (i.commandName == 'timer') {
            timer(i);
            return;
        };
        if (i.commandName == 'music') {
            music.index(i, player);
            return;
        }
        // admin
        if (i.user.id != '891242744989769799' && i.user.id != '410036441129943050' && i.user.id != '831883841417248778') {
            var errEmbed = createembed()
            errEmbed.title = '指令錯誤'
            errEmbed.description = '❌ 這些指令只有機器人擁有者可以執行'
            i.reply({ embeds: [errEmbed], ephemeral: true })
            return
        }
    };
});

client.on('messageCreate', (msg) => {
    if (!msg.content.startsWith(prefix) || msg.author.id != '984620726436921364') {
        return
    }
    if (msg.content.startsWith(`${prefix}sync`)) {
        sync(msg)
    }else if (msg.content.startsWith(`${prefix}pull`)) {
        pull(msg)
    }
})
// 登入
client.login(process.env.TOKEN)