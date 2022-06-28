// 載入npm包
import { Client, Intents } from 'discord.js';
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_VOICE_STATES] });
import 'dotenv/config';
import { Player } from 'discord-music-player';
const player = new Player(client)
// 載入指令包
import cmdvote from './cmd/vote.js';
import ping from './cmd/ping.js';
import calc from './cmd/calc.js';
import random from './cmd/random.js';
import music from './features/music.js'
// 載入管理員指令包
import pull from './cmd/admin/pull.js';
import sync from './cmd/admin/sync.js';
// 載入功能包
import vote from './features/vote.js';
import btnrole from './features/btnrole.js';
// 載入lib
import errcall from './lib/err.js'
import deploycmd from './lib/deploy-cmd.js';
import createembed from './lib/embed.js';

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
        if (i.customId.startsWith('role')) {
            btnrole.buttonclick(i)
            return
        }
    }else if (i.isSelectMenu()) {
        if (i.customId == 'role') {
            selectRole.select(i)
        }
    }else if (i.isCommand()) {
        if (i.commandName == 'ping') {
            ping(i);
            return;
        };
        if (i.commandName == 'vote') {
            cmdvote(i);
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
        if (i.commandName == 'music') {
            music.index(i, player);
            return;
        };
        if (i.commandName == 'rolebutton') {
            btnrole.createrole(i)
            return
        }
    }else if (i.isModalSubmit()) {
        if (i.customId.startsWith('role')) {
            btnrole.modalsubmit(i)
            return
        }
    }
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

player.on('queueEnd', async (queue) => {
    const channel = await client.channels.fetch(queue.data)
    var Embed = createembed()
    Embed.title = '播放'
    Embed.description = '隊列已撥放完畢!機器人已退出語音頻道'
    channel.send({ embeds: [Embed] })
})

player.on('channelEmpty', async (queue) => {
    const channel = await client.channels.fetch(queue.data)
    var Embed = createembed()
    Embed.title = '播放'
    Embed.description = '所有使用者均已退出語音頻道!機器人已退出語音頻道'
    channel.send({ embeds: [Embed] })
})
// 登入
client.login(process.env.TOKEN)