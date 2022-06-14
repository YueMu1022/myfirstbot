import createembed from '../lib/embed.js'

/**
 * @param {import('discord.js').CommandInteraction<import('discord.js').CacheType>} i
 */

function ping(i) {
    var Embed = createembed()
    Embed.title = 'ping'
    Embed.description = `🏓pong! ${i.client.ws.ping}ms`
    
    i.reply({ embeds: [Embed], ephemeral: true })
    return
}

export default ping