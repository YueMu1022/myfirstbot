import createembed from '../lib/embed.js'

/**
 * @param {import('discord.js').CommandInteraction<import('discord.js').CacheType>} i
 */

function random (i) {
    const rng = Math.floor(Math.random() * 101)
    var Embed = createembed()
    Embed.title = '隨機機率'
    Embed.description = `${rng}%`
    
    i.reply({ embeds: [ Embed ], ephemeral: true })
}

export default random