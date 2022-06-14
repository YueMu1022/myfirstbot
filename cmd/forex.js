import request from 'request'
import 'dotenv/config'
import createembed from '../lib/embed.js'

/**
 * @param {import('discord.js').CommandInteraction<import('discord.js').CacheType>} i
 */

async function forex (i) {
    var from = i.options.getString('from')
    var to = i.options.getString('to')
    const count = i.options.getNumber('count')
    var Embed = createembed()
    if (count < 0.01) {
        Embed.title = '匯率錯誤'
        Embed.description = '❌ 數字過低，最低值為0.01'
        return
    }
    from = from.toUpperCase()
    to = to.toUpperCase()
    const dataUrl = `https://v6.exchangerate-api.com/v6/${process.env.forexKey}/latest/${from}`
    request(dataUrl, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            const res = JSON.parse(body)
            const rest = res.conversion_rates[to]
            Embed.title = '匯率'
            Embed.description = `${count}\`${from}\`價值${count * Number(rest)}\`${to}\``
        }else{
            Embed.title = '匯率錯誤'
            Embed.description = `❌ api請求失敗\`\`\`JSON\n${body}\`\`\`請確認幣值是否填錯，本功能不支援比特幣`
        }
        i.reply({ embeds: [Embed], ephemeral: true })
    })
    return
}

export default forex