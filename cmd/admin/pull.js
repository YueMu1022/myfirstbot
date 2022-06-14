import { exec } from 'child_process';
import createembed from '../../lib/embed.js'

/**
 * @param {import('discord.js').Message<boolean>} msg
 */

async function pull (msg) {
    var waitEmbed = createembed()
    waitEmbed.title = '更新程式碼'
    waitEmbed.description = '<a:loading:985065058390376449> 正在更新程式碼...'
    const reply = await msg.reply({ embeds: [waitEmbed] })
    var Embed = createembed()
    Embed.title = '更新程式碼'
    exec('git pull -f', (err, stdout) => {
        if (err) {
            Embed.description = `❌ 失敗!!\`\`\`${err}\`\`\``
        }else{
            Embed.description = `<a:check:985064886759456780> 成功!!\`\`\`${stdout}\`\`\``
        }
        reply.edit({ embeds: [Embed] })
    })
}

export default pull