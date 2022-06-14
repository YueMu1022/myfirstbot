import deploycmd from '../../lib/deploy-cmd.js'
import createembed from '../../lib/embed.js'

/**
 * @param {import('discord.js').Message<boolean>} msg
 */

async function sync (msg) {
    const Embed = createembed()
    Embed.title = '重新同步指令'
    Embed.description = '<a:check:985064886759456780> 已成功同步'
    await msg.reply({ embeds: [Embed] })
    const cmd = i.client.application.commands
    await cmd.set([])
    deploycmd(cmd)
}

export default sync