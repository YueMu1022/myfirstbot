import { setTimeout } from 'timers/promises'
import createembed from '../lib/embed.js'

/**
 * @param {import('discord.js').CommandInteraction<import('discord.js').CacheType>} i
 */

async function timer (i) {
    const name = i.options.getString('name')
    const time = i.options.getNumber('time')

    if (time < 1) {
        var errtimeEmbed = createembed()
        errtimeEmbed.title = '計時器錯誤'
        errtimeEmbed.description = '❌ 時間不得<1分鐘'

        i.reply({ embeds: [errtimeEmbed], ephemeral: true })
        return
    }

    var Embed = createembed()

    Embed.title = '計時器'
    Embed.description = '<a:check:985064886759456780> 已成功建立計時器'

    i.reply({ embeds: [Embed], ephemeral: true })

    await setTimeout(time*60*1000)

    var Embeddm = createembed()
    Embeddm.title = `計時器已結束`
    Embeddm.description = `已完成計時：${name}\n經過時間：${time}分鐘`
    
    try {
        await i.user.send({ embeds: [Embeddm] })
    } catch (error) {
        var Embederr = createembed()
        Embederr.title = '計時器錯誤'
        Embederr.description = '❌ 私訊無法發送，請開啟此設定'
        Embederr.image.url = 'https://github.com/MuMapleTW/mybot/blob/master/image/opendm.png?raw=true'

        i.channel?.send({ content: i.user.toString(), embeds: [Embederr] })
    }
}

export default timer