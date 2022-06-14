import vote from '../features/vote.js'

/**
 * @param {import('discord.js').CommandInteraction<import('discord.js').CacheType>} i
 */

function index(i) {
    if (i.options.getSubcommand() == 'create') {
        vote.createvote(i)
    } else if (i.options.getSubcommand() == 'get') {
        vote.getvotedata(i)
    }
}

export default index