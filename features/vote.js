import { v4 as uuidv4 } from 'uuid'
import { MessageButton, MessageActionRow } from 'discord.js'
import createembed from '../lib/embed.js'
import getimageurl from '../lib/getavater.js'

var vl = []


/**
 * @param {import('discord.js').CommandInteraction<import('discord.js').CacheType>} i
 */

async function vote(i) {
    const content = i.options.getString('投票項目')
    var select = []
    select.push(i.options.getString('選項1'))
    select.push(i.options.getString('選項2'))
    select.push(i.options.getString('選項3', false))
    select.push(i.options.getString('選項4', false))
    select.push(i.options.getString('選項5', false))
    select.push(i.options.getString('選項6', false))

    const id = uuidv4().replace(new RegExp("-", "gm"), '')
    const selectcount = getconut(select)
    var Embed = createembed()
    var replyEmbed = createembed()
    var dmEmbed = createembed()

    Embed.title = '投票'
    Embed.author.name = i.user.tag
    Embed.author.icon_url = getimageurl(i.user)
    delete Embed.author.url
    Embed.description = content

    var row = new MessageActionRow()
    var row2 = new MessageActionRow()
    var readypush = {
        id: id,
        content: content,
        user: i.user,
        Option: [],
        users: {},
        msg: undefined,
        time: new Date()
    }

    for (let idx = 0; idx < selectcount; idx++) {
        if (idx != 5) {
            const e = select[idx]
            row.addComponents(
                new MessageButton()
                    .setCustomId(`vote.${idx + 1}.${id}`)
                    .setLabel(`${e} [0]`)
                    .setStyle('PRIMARY')
            )
        }
    }

    if (selectcount == 6) {
        row2.addComponents(
            new MessageButton()
                .setCustomId(`vote.6.${id}`)
                .setLabel(`${select[5]} [0]`)
                .setStyle('PRIMARY')
        )
    }

    for (let i = 0; i < selectcount; i++) {
        const e = select[i];
        readypush.Option.push({
            name: e,
            count: 0
        })
    }

    dmEmbed.title = '投票'
    dmEmbed.description = `<a:check:985064886759456780> 投票建立成功!\n你可以隨時結束投票\n想查詢投票的話可以輸入\`/vote get ${id}\`\n投票項目：${content}`
    var dmrow = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId(`vote.del.${id}`)
                .setLabel('結束投票')
                .setStyle('DANGER')
                .setEmoji('⏹️')
        )

    try {
        await i.user.send({ embeds: [dmEmbed], components: [dmrow] })
    } catch (error) {
        var Embederr = createembed()
        Embederr.title = '投票錯誤'
        Embederr.description = '私訊無法發送，請開啟此設定'
        Embederr.image.url = 'https://github.com/MuMapleTW/mybot/blob/master/image/opendm.png?raw=true'
        i.reply({ embeds: [Embederr], ephemeral: true })
        return
    }

    replyEmbed.title = '投票'
    replyEmbed.description = '<a:check:985064886759456780> 已成功建立投票'
    i.reply({ embeds: [replyEmbed], ephemeral: true })

    var readysend = {
        embeds: [Embed],
        components: [row],
        content: `投票ID：${id}`
    }

    if (selectcount == 6) {
        readysend.components.push(row2)
    }
    readypush.msg = await i.channel.send(readysend)

    vl.push(readypush)
}

/**
 * @param {import('discord.js').ButtonInteraction<import('discord.js').CacheType>} i
 */

function btnclick(i) {
    const data = i.customId.split('.')
    const sel = data[1]
    for (let index = 0; index < vl.length; index++) {
        var d = vl[index];
        if (d.id != data[2]) {
            return
        }
        if (sel == 'del') {
            del(i, d, index)
            return
        }
        if (d.users[i.user.id] == sel) {
            var Embed = createembed()
            Embed.title = '投票'
            Embed.description = '想洗票阿'
            i.reply({ embeds: [Embed], ephemeral: true })
            return
        } else if (d.users[i.user.id] != undefined) {
            d.Option[Number(d.users[i.user.id]) - 1].count--
        }
        d.Option[Number(sel) - 1].count++
        var row = new MessageActionRow()
        var row2 = new MessageActionRow()
        for (let idx = 0; idx <= d.Option.length - 1; idx++) {
            if (idx != 5) {
                const opti = d.Option[idx]
                row.addComponents(
                    new MessageButton()
                        .setCustomId(`vote.${idx + 1}.${d.id}`)
                        .setLabel(`${opti.name} [${opti.count}]`)
                        .setStyle('PRIMARY')
                )
            }
        }
        var readyupdate = {
            components: [row]
        }
        if (d.Option.length == 6) {
            const opti = d.Option[5]
            row2.addComponents(
                new MessageButton()
                    .setCustomId(`vote.6.${d.id}`)
                    .setLabel(`${opti.name} [${opti.count}]`)
                    .setStyle('PRIMARY')
            )
            readyupdate.components.push(row2)
        }
        i.update(readyupdate)
        d.users[i.user.id] = sel
        vl[index] = d
    }
}

/**
 * @param {String[]} select
 */

function getconut(select) {
    if (select[2] == null) {
        return 2
    } else if (select[3] == null) {
        return 3
    } else if (select[4] == null) {
        return 4
    } else if (select[5] == null) {
        return 5
    } else {
        return 6
    }
}

/**
 * @param {import('discord.js').CommandInteraction<import('discord.js').CacheType>} i
 */

function getvotedata(i) {
    const id = i.options.getString('投票id')
    for (let index = 0; index < vl.length; index++) {
        const d = vl[index];
        if (d.id == id) {
            var Embed = createembed()
            Embed.title = '投票查詢'
            Embed.fields.push({
                name: '投票項目',
                value: d.content,
                inline: false
            })

            for (let i = 0; i < d.Option.length; i++) {
                const e = d.Option[i];
                Embed.fields.push({
                    name: `選項${i + 1}`,
                    value: `${e.name} [${e.count}]`,
                    inline: false
                })
            }

            i.reply({ embeds: [Embed], ephemeral: true })
            return
        }
        var errEmbed = createembed()
        errEmbed.title = '投票查詢錯誤'
        errEmbed.description = '請確認投票是否存在，結束後的投票無法查詢'
        i.reply({ embeds: [errEmbed], ephemeral: true })
    }
    if (vl.length == 0) {
        var errEmbed = createembed()
        errEmbed.title = '投票查詢錯誤'
        errEmbed.description = '請確認投票是否存在，結束後的投票無法查詢'
        i.reply({ embeds: [errEmbed], ephemeral: true })
    }
}


/**
 * @param {import('discord.js').ButtonInteraction<import('discord.js').CacheType>} i
 * @param {{id: String, content: String, user: import('discord.js').User, Option: {name: String, count: Number}[], users: String[], msg: import('discord.js').Message<boolean>, time: Date}} d
 * @param {Number} index
 */

function del(i, d, index) {
    var editEmbed = createembed()
    editEmbed.title = '投票已結束'
    editEmbed.author.name = i.user.tag
    editEmbed.author.icon_url = getimageurl(i.user)
    delete editEmbed.author.url
    editEmbed.description = `${d.content}\n\n投票結束於<t:${Math.floor(Date.now() / 1000)}:F>`
    editEmbed.timestamp = d.time

    var row = new MessageActionRow()
    var row2 = new MessageActionRow()

    for (let idx = 0; idx <= d.Option.length - 1; idx++) {
        if (idx != 5) {
            const opti = d.Option[idx]
            row.addComponents(
                new MessageButton()
                    .setCustomId(`disabled${idx}`)
                    .setLabel(`${opti.name} [${opti.count}]`)
                    .setStyle('PRIMARY')
                    .setDisabled(true)
            )
        }
    }
    var dmrow = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId(`disabled`)
                .setLabel('已結束投票')
                .setStyle('DANGER')
                .setEmoji('⏹️')
                .setDisabled(true)
        )
    if (d.Option.length == 6) {
        const opti = d.Option[5]
        row2.addComponents(
            new MessageButton()
                .setCustomId(`disabled5`)
                .setLabel(`${opti.name} [${opti.count}]`)
                .setStyle('PRIMARY')
                .setDisabled(true)
        )
        d.msg.edit({ content: null, embeds: [editEmbed], components: [row, row2] })
    } else {
        d.msg.edit({ content: null, embeds: [editEmbed], components: [row] })
    }
    i.update({ components: [dmrow] })
    vl.splice(index, 1)
}

export default { createvote: vote, getvotedata: getvotedata, btnclick: btnclick }