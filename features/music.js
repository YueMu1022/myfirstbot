import createembed from '../lib/embed.js'
import { MessageActionRow, MessageButton } from 'discord.js'
import biliApi from 'bili-api'

/**
 * @param {import('discord.js').CommandInteraction<import('discord.js').CacheType>} i
 * @param {import('discord-music-player').Player} player
 */

function index(i, player) {
    if (!i.guild) {
        var errEmbed = createembed()
        errEmbed.title = '音樂功能錯誤'
        errEmbed.description = '❌ 請不要在私訊使用音樂指令'
        i.reply({ embeds: [errEmbed], ephemeral: true })
        return
    }

    if (i.options.getSubcommand() == 'play') {
        play(i, player)
    } else if (i.options.getSubcommand() == 'skip') {
        skip(i, player)
    } else if (i.options.getSubcommand() == 'stop') {
        stop(i, player)
    } else if (i.options.getSubcommand() == 'loop') {
        loop(i, player)
    } else if (i.options.getSubcommand() == 'clear') {
        clear(i, player)
    } else if (i.options.getSubcommand() == 'progress') {
        progress(i, player)
    } else if (i.options.getSubcommand() == 'pause') {
        pause(i, player)
    } else if (i.options.getSubcommand() == 'resume') {
        resume(i, player)
    } else if (i.options.getSubcommand() == 'remove') {
        remove(i, player)
    } else if (i.options.getSubcommand() == 'queue') {
        queue(i, player)
    }
}

/**
 * @param {import('discord.js').CommandInteraction<import('discord.js').CacheType>} i
 * @param {import('discord-music-player').Player} player
 */

async function play(i, player) {
    var waitEmbed = createembed()
    waitEmbed.title = '播放'
    waitEmbed.description = '<a:loading:985065058390376449> 正在尋找歌曲...'
    await i.reply({ embeds: [waitEmbed], ephemeral: true })
    if (!i.member.voice.channel) {
        var errEmbed = createembed()
        errEmbed.title = '播放錯誤'
        errEmbed.description = '❌ 請先加入語音頻道'
        i.editReply({ embeds: [errEmbed], ephemeral: true })
        return
    }
    const guildqueue = player.getQueue(i.guild.id)
    var song = i.options.getString('關鍵字或網址')
    var errEmbed = createembed()
    if (song.startsWith('https://www.bilibili.com/')) {
        const bvid = song.replace('https://www.bilibili.com/video/', '').split('?')[0]
        const bilibilivideo = await biliApi({
            bvid: bvid
        }, ['title']).catch()
        const bilibilititle = bilibilivideo.view.data.title
        song = bilibilititle
    }
    const queue = player.createQueue(i.guild.id)
    await queue.join(i.member.voice.channel)
    queue.setData(i.channel.id)
    var played
    var Embed = createembed()
    if (song.includes('&list=') || song.startsWith('https://open.spotify.com/playlist/')) {
        Embed.title = '播放清單'
        played = await queue.playlist(song).catch(() => {
            if (!guildqueue) {
                queue.stop()
            }
            Embed.description = '❌ 找不到播放清單'
            i.editReply({ embeds: [Embed], ephemeral: true })
            return
        })
    }else{
        Embed.title = '播放'
        var havesong = true
        played = await queue.play(song).catch(() => {
            if (!guildqueue) {
                queue.stop()
            }
            Embed.description = '❌ 找不到歌曲'
            i.editReply({ embeds: [Embed], ephemeral: true })
            havesong = false
            return
        })
        if (havesong) {
            Embed.image.url = played.thumbnail
        }else{
            return
        }
    }
    Embed.description = `<a:check:985064886759456780> 已將[${played.name}](${played.url})加入到播放隊列\n\n> 🎤 ${played.author}\n> 🕘 ${played.duration}`
    i.editReply({ embeds: [Embed], ephemeral: true })
}

/**
 * @param {import('discord.js').CommandInteraction<import('discord.js').CacheType>} i
 * @param {import('discord-music-player').Player} player
 */

function skip(i, player) {
    const guildqueue = player.getQueue(i.guild.id)
    var song
    try {
        song = guildqueue.skip()
    } catch (error) {
        var errEmbed = createembed()
        errEmbed.title = '跳過歌曲錯誤'
        errEmbed.description = '❌ 目前沒有任何人撥放歌曲'
        i.reply({ embeds: [errEmbed], ephemeral: true })
        return
    }
    var Embed = createembed()
    Embed.title = '跳過'
    Embed.description = `<a:check:985064886759456780> 已將[${song.name}](${song.url})跳過`
    Embed.image.url = song.thumbnail
    i.reply({ embeds: [Embed], ephemeral: true })
}

/**
 * @param {import('discord.js').CommandInteraction<import('discord.js').CacheType>} i
 * @param {import('discord-music-player').Player} player
 */

function stop(i, player) {
    const guildqueue = player.getQueue(i.guild.id)
    try {
        guildqueue.stop()
    } catch (err) {
        var errEmbed = createembed()
        errEmbed.title = '停止播放錯誤'
        errEmbed.description = '❌ 目前沒有任何人撥放歌曲'
        i.reply({ embeds: [errEmbed], ephemeral: true })
        return
    }
    var Embed = createembed()
    Embed.title = '停止播放'
    Embed.description = '<a:check:985064886759456780> 已將播放隊列停止'
    i.reply({ embeds: [Embed], ephemeral: true })
}

/**
 * @param {import('discord.js').CommandInteraction<import('discord.js').CacheType>} i
 * @param {import('discord-music-player').Player} player
 */

function loop(i, player) {
    const RepeatMode = i.options.getNumber('類型')
    const guildqueue = player.getQueue(i.guild.id)
    guildqueue.setRepeatMode(RepeatMode)
    var Embed = createembed()
    var status
    if (RepeatMode == 0) {
        status = '不循環'
    } else if (RepeatMode == 1) {
        status = '循環單個曲目'
    } else if (RepeatMode == 2) {
        status = '循環整個撥放隊列'
    }
    Embed.title = '循環'
    Embed.description = `<a:check:985064886759456780> 已將循環狀態設定為 ${status}`
    i.reply({ embeds: [Embed], ephemeral: true })
}

/**
 * @param {import('discord.js').CommandInteraction<import('discord.js').CacheType>} i
 * @param {import('discord-music-player').Player} player
 */

function clear(i, player) {
    const guildqueue = player.getQueue(i.guild.id)
    try {
        guildqueue.clearQueue()
    } catch (error) {
        var errEmbed = createembed()
        errEmbed.title = '清空隊列錯誤'
        errEmbed.description = '❌ 目前沒有任何人撥放歌曲'
        i.reply({ embeds: [errEmbed], ephemeral: true })
        return
    }
    var Embed = createembed()
    Embed.title = '清除播放隊列'
    Embed.description = '<a:check:985064886759456780> 已成功清除播放隊列'
    i.reply({ embeds: [Embed], ephemeral: true })
}

/**
 * @param {import('discord.js').CommandInteraction<import('discord.js').CacheType>} i
 * @param {import('discord-music-player').Player} player
 */

function progress(i, player) {
    const guildqueue = player.getQueue(i.guild.id)
    var bar
    try {
        bar = guildqueue.createProgressBar({
            size: 50
        })
    } catch (error) {
        var errEmbed = createembed()
        errEmbed.title = '進度條錯誤'
        errEmbed.description = '❌ 目前沒有任何人撥放歌曲'
        i.reply({ embeds: [errEmbed], ephemeral: true })
        return
    }
    const song = guildqueue.nowPlaying
    var Embed = createembed()
    Embed.title = '播放進度'
    Embed.description = `正在播放[${song.name}](${song.url})\n${bar.prettier.replace(new RegExp(' ', 'gm'), '-')}`
    Embed.image.url = song.thumbnail
    i.reply({ embeds: [Embed], ephemeral: true })
}
//.replace('[', '<:pro_2:983239875069366312>').replace(new RegExp(" ", "gm"), '<:pro_4:983240390935191582>').replace(new RegExp("=", "gm"), '<:pro_1:983239243214233630>').replace(']', '<:pro_5:983240389081329705>').replace('%', '<:pro_3:983239873584578600>')
/**
 * @param {import('discord.js').CommandInteraction<import('discord.js').CacheType>} i
 * @param {import('discord-music-player').Player} player
 */

function pause(i, player) {
    const guildqueue = player.getQueue(i.guild.id)
    try {
        guildqueue.setPaused(true)
    } catch (error) {
        var errEmbed = createembed()
        errEmbed.title = '暫停播放錯誤'
        errEmbed.description = '❌ 目前沒有任何人撥放歌曲'
        i.reply({ embeds: [errEmbed], ephemeral: true })
        return
    }
    var Embed = createembed()
    Embed.title = '暫停播放隊列'
    Embed.description = '<a:check:985064886759456780> 已成功暫停播放'
    i.reply({ embeds: [Embed], ephemeral: true })
}

/**
 * @param {import('discord.js').CommandInteraction<import('discord.js').CacheType>} i
 * @param {import('discord-music-player').Player} player
 */

function resume(i, player) {
    const guildqueue = player.getQueue(i.guild.id)
    try {
        guildqueue.setPaused(false)
    } catch (error) {
        var errEmbed = createembed()
        errEmbed.title = '繼續播放錯誤'
        errEmbed.description = '❌ 目前沒有任何人撥放歌曲'
        i.reply({ embeds: [errEmbed], ephemeral: true })
        return
    }
    var Embed = createembed()
    Embed.title = '繼續播放隊列'
    Embed.description = '<a:check:985064886759456780> 已成功繼續播放'
    i.reply({ embeds: [Embed], ephemeral: true })
}

/**
 * @param {import('discord.js').CommandInteraction<import('discord.js').CacheType>} i
 * @param {import('discord-music-player').Player} player
 */

function remove(i, player) {
    const index = i.options.getNumber('編號') - 1
    const guildqueue = player.getQueue(i.guild.id)
    if (guildqueue.nowPlaying.isFirst) {
        var errEmbed = createembed()
        errEmbed.title = '移除歌曲錯誤'
        errEmbed.description = '❌ 這個項目目前撥放中\n如果需要跳過請使用/music skip'
        i.reply({ embeds: [errEmbed], ephemeral: true })
        return
    }
    const song = guildqueue.remove(index)
    if (!song) {
        var errEmbed = createembed()
        errEmbed.title = '移除歌曲錯誤'
        errEmbed.description = '❌ 目前沒有任何人撥放歌曲'
        i.reply({ embeds: [errEmbed], ephemeral: true })
        return
    }
    var Embed = createembed()
    Embed.title = '從隊列移除歌曲'
    Embed.description = `<a:check:985064886759456780> 已將[${song.name}](${song.url})從隊列中移除`
    Embed.image.url = song.thumbnail
    i.reply({ embeds: [Embed], ephemeral: true })
}

/**
 * @param {import('discord.js').CommandInteraction<import('discord.js').CacheType>} i
 * @param {import('discord-music-player').Player} player
 */

function queue(i, player) {
    const guildqueue = player.getQueue(i.guild.id)
    var songs
    try {
        songs = guildqueue.songs
    } catch (error) {
        var errEmbed = createembed()
        errEmbed.title = '隊列錯誤'
        errEmbed.description = '❌ 目前沒有任何人撥放歌曲'
        i.reply({ embeds: [errEmbed], ephemeral: true })
        return
    }
    var songsString = ''
    for (let index = 0; index < 10; index++) {
        const song = songs[index];
        if (song == undefined) {
            break
        }
        songsString += `${index + 1}. [${song.name}](${song.url})\n`
    }
    const nextbtn = new MessageButton()
        .setCustomId('music.next.20')
        .setEmoji('➡️')
        .setStyle('PRIMARY')
    if (songs.length < 11) {
        nextbtn.setDisabled(true)
        nextbtn.setCustomId('disabled')
    }
    const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('disableddef')
                .setEmoji('⬅️')
                .setStyle('PRIMARY')
                .setDisabled(true)
        )
        .addComponents(nextbtn)
    var Embed = createembed()
    Embed.title = '隊列'
    Embed.description = songsString
    i.reply({ embeds: [Embed], components: [row], ephemeral: true })
}

/**
 * @param {import('discord.js').ButtonInteraction<import('discord.js').CacheType>} i
 * @param {import('discord-music-player').Player} player
 */

function btnindex(i, player) {
    const data = i.customId.split('.')
    const goto = data[1]
    if (goto == 'next') {
        queuenextpage(i, player, data)
    } else {
        queueprepage(i, player, data)
    }
}

/**
 * @param {import('discord.js').ButtonInteraction<import('discord.js').CacheType>} i
 * @param {import('discord-music-player').Player} player
 * @param {String[]} data
 */

function queuenextpage(i, player, data) {
    const guildqueue = player.getQueue(i.guild.id)
    var nextend = Number(data[2])
    var songs
    try {
        songs = guildqueue.songs
    } catch (error) {
        var errEmbed = createembed()
        errEmbed.title = '隊列錯誤'
        errEmbed.description = '❌ 目前沒有任何人撥放歌曲'
        i.reply({ embeds: [errEmbed], ephemeral: true })
        return
    }
    var songsString = ''
    var havenextpage = true
    for (let index = nextend - 10; index < nextend; index++) {
        const song = songs[index];
        if (song == undefined) {
            havenextpage = false
            break
        }
        songsString += `${index + 1}. [${song.name}](${song.url})\n`
    }
    const nextbtn = new MessageButton()
        .setCustomId(`music.next.${nextend + 10}`)
        .setEmoji('➡️')
        .setStyle('PRIMARY')
    if (!havenextpage) {
        nextbtn.setDisabled(true)
        nextbtn.setCustomId('disabled')
    }
    const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId(`music.pre.${nextend - 10}`)
                .setEmoji('⬅️')
                .setStyle('PRIMARY')
        )
        .addComponents(nextbtn)
    var Embed = createembed()
    Embed.title = '隊列'
    Embed.description = songsString
    i.update({ embeds: [Embed], components: [row], ephemeral: true })
}

/**
 * @param {import('discord.js').ButtonInteraction<import('discord.js').CacheType>} i
 * @param {import('discord-music-player').Player} player
 * @param {String[]} data
 */

function queueprepage(i, player, data) {
    const guildqueue = player.getQueue(i.guild.id)
    var preend = Number(data[2])
    var songs
    try {
        songs = guildqueue.songs
    } catch (error) {
        var errEmbed = createembed()
        errEmbed.title = '隊列錯誤'
        errEmbed.description = '❌ 目前沒有任何人撥放歌曲'
        i.reply({ embeds: [errEmbed], ephemeral: true })
        return
    }
    var songsString = ''
    var haveprepage = true
    for (let index = preend - 10; index < preend; index++) {
        const song = songs[index];
        if (index == 0) {
            haveprepage = false
        }
        songsString += `${index + 1}. [${song.name}](${song.url})\n`
    }
    const prebtn = new MessageButton()
        .setCustomId(`music.pre.${preend - 10}`)
        .setEmoji('⬅️')
        .setStyle('PRIMARY')
    if (!haveprepage) {
        prebtn.setDisabled(true)
        prebtn.setCustomId('disabled')
    }
    const row = new MessageActionRow()
        .addComponents(prebtn)
        .addComponents(
            new MessageButton()
                .setCustomId(`music.next.${preend + 10}`)
                .setEmoji('➡️')
                .setStyle('PRIMARY')
        )
    var Embed = createembed()
    Embed.title = '隊列'
    Embed.description = songsString
    i.update({ embeds: [Embed], components: [row], ephemeral: true })
}

export default { index: index, btn: btnindex }