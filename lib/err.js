import createembed from "./embed.js"

/**
 * @param {import("discord.js").Client<Boolean>} client
 * @param {Error} err
 */

async function errcall (err, client) {
    const botauthor = await client.users.fetch('891242744989769799')
    var Embed = createembed()
    Embed.title = '機器人出問題啦'
    Embed.description = `\`\`\`${err.stack}\`\`\``
    botauthor.send({ embeds: [Embed] })
}

export default errcall