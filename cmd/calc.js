import stringcalc from '@johnrob1880/string-calc'
import createembed from '../lib/embed.js'

/**
 * @param {import('discord.js').CommandInteraction<import('discord.js').CacheType>} i
 */

function calc (i) {
    const formula = i.options.getString('算式')
    var Embed = createembed()
    Embed.title = '計算'
    var iserr = false
    var output
    try {
        output = stringcalc(formula, () => {
            iserr = true
        })
    } catch (err) {
        iserr = true
    }

    if (!iserr) {
        Embed.description = `${formula}=${output}`
    }else{
        Embed.title = '計算錯誤'
        Embed.description = '❌ 請確認算式是否完全正確'
    }

    i.reply({ embeds: [Embed], ephemeral: true })
}

export default calc