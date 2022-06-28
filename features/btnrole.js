import { Modal, MessageActionRow, TextInputComponent, MessageButton } from 'discord.js'
import createembed from '../lib/embed.js'

/**
 * @param {import('discord.js').CommandInteraction<import('discord.js').CacheType>} i
 */

function createrole(i) {
    if (!i.member.permissions.has('ADMINISTRATOR')) {
        const errEmbed = createembed()
        errEmbed.title = '權限不足'
        errEmbed.description = '執行此命令需要管理者`ADMINISTRATOR`權限'
        i.reply({ embeds: [errEmbed], ephemeral: true })
        return
    }
    const roles = [
        i.options.getRole('身分組1'),
        i.options.getRole('身分組2', false),
        i.options.getRole('身分組3', false)
    ].filter((r) => {
        return r != null
    })
    const repeat = roles.filter((r, index) => {
        return roles.indexOf(r) != index
    })
    if (repeat.length) {
        var errEmbed = createembed()
        errEmbed.title = '身分組選擇訊息錯誤'
        errEmbed.description = '❌ 請確認沒有重複的身分組'
        i.reply({ embeds: [errEmbed], ephemeral: true })
        return
    }
    const rolecolors = [
        i.options.getString('身分組1的顏色'),
        i.options.getString('身分組2的顏色', false),
        i.options.getString('身分組3的顏色', false)
    ].filter((r) => {
        return r != null
    })
    if (rolecolors.length != roles.length) {
        var errEmbed = createembed()
        errEmbed.title = '身分組選擇訊息錯誤'
        errEmbed.description = '❌ 請確認每個身分組沒有缺少對應的顏色'
        i.reply({ embeds: [errEmbed], ephemeral: true })
        return
    }
    
    var modal = new Modal()
        .setTitle('建立身分組選擇訊息(按鈕)');
    var cid = 'role'
    for (let index = 0; index < roles.length; index++) {
        const e = roles[index];
        cid = cid + `.${e.id}`
    }
    cid = cid + `.${rolecolors.join('.')}`
    modal.setCustomId(cid)
    var title = new TextInputComponent()
        .setCustomId('title')
        .setLabel('標題')
        .setStyle('SHORT')
        .setRequired(true)
    var titlerow = new MessageActionRow()
        .addComponents(title)
    var description = new TextInputComponent()
        .setCustomId('description')
        .setLabel('內容')
        .setStyle('PARAGRAPH')
        .setRequired(true)
        .setPlaceholder('如需使用自訂表情符號，請在任意聊天室輸入反斜線後輸入表情符號，發送訊息後將訊息內容輸入至你想加入表情符號的地方')
    var descriptionrow = new MessageActionRow()
        .addComponents(description)
    modal.addComponents(titlerow, descriptionrow)
    i.showModal(modal)
}

/**
 * @param {import('discord.js').ModalSubmitInteraction<import('discord.js').CacheType>} i
 */

async function modalsubmit(i) {
    const data = i.customId.split('.')
    data.shift('role')
    const roles = data.filter((d) => {
        return !isNaN(Number(d))
    })
    const styles = data.filter((d) => {
        return isNaN(Number(d))
    })
    const title = i.fields.getTextInputValue('title')
    const description = i.fields.getTextInputValue('description')
    var Embed = createembed()
    Embed.title = title
    Embed.description = description
    const row = new MessageActionRow()
    for (let index = 0; index < roles.length; index++) {
        const roleid = roles[index];
        const style = styles[index]
        const role = await i.guild.roles.fetch(roleid)
        row.addComponents(
            new MessageButton()
                .setCustomId(`role.${roleid}`)
                .setLabel(role.name)
                .setStyle(style)
        );
    }
    i.channel.send({ embeds: [Embed], components: [row] })
    var replyEmbed = createembed()
    replyEmbed.title = '身分組選擇訊息'
    replyEmbed.description = '已成功建立身分組選擇訊息'
    i.reply({ embed: [replyEmbed], ephemeral: true})
}

/**
 * @param {import('discord.js').ButtonInteraction<import('discord.js').CacheType>} i
 */

async function buttonclick(i) {
    const roleid = i.customId.split('.')[1]
    const role = await i.guild.roles.fetch(roleid)
    var Embed = createembed()
    Embed.title = '身分組'
    if (i.member.roles.cache.get(roleid)) {
        i.member.roles.remove(role)
        Embed.description = `已移除身分組[${role.name}]`
    }else{
        i.member.roles.add(role)
        Embed.description = `已新增身分組[${role.name}]`
    }
    i.reply({ embeds: [Embed], ephemeral: true })
}

export default {createrole, modalsubmit, buttonclick}