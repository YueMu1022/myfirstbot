/**
 * @param {import('discord.js').User} author
 * @returns {String}
 */

function getimageurl (author) {
    if (author.avatarURL({'dynamic': true}) == null) {
        return author.defaultAvatarURL
    }else{
        return author.avatarURL({'dynamic': true})
    }
}

export default getimageurl