/**
 * @returns {{ color: Number, title: String, author: { name: String, icon_url: String, url: String }, description: String, fields: { name: String, value: String, inline: Boolean }[], timestamp: Date, image: { url: String, width: Number, height: Number }, footer: { text: String } }} return a discord api embed object
 */

function createembed () {
    var Embed = {
        color: 0xAFEEEE,
        title: '',
        author: {
            name: '玥幕 YueMu#4139',
            icon_url: 'https://avatars.githubusercontent.com/u/96234201?v=4',
            url: 'https://github.com/NyoMaple',
        },
        description: '',
        fields: [],
        timestamp: new Date(),
        image: {
            url: ''
        },
        footer: {
            text: ''
        }
    };
    
    return Embed
}

export default createembed