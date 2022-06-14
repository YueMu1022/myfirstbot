import createembed from '../lib/embed.js'

/**
 * @param {import('discord.js').CommandInteraction<import('discord.js').CacheType>} i
 */

async function help(i) {
    var Embed = createembed()
    Embed.title = '幫助'
    Embed.description = '指令幫助'
    Embed.fields = [
        {
            "name": "投票功能",
            "value": "`/vote create <投票項目> <選項1> <選項2>...(選項3~6[選填])` 建立投票(按鈕)\n`/vote get <投票ID>` 查詢投票資訊",
            "inline": false
        },
        {
            "name": "匯率換算",
            "value": "`/forex <來源幣別(貨幣代號)> <目標幣別(貨幣代號)> <金額>` 換算貨幣",
            "inline": false
        },
        {
            "name": "計算功能",
            "value": "`/calc <算式(遵守JS規則)>` 計算數學算式( [+] / [-] / [*] / [/] )",
            "inline": false
        },
        {
            "name": "查看機器人延遲",
            "value": "`/ping` 會告訴你機器人的延遲",
            "inline": false
        },
        {
            "name": "幫助",
            "value": "`/help` 開啟此頁面",
            "inline": false
        },
        {
            "name": "生成隨機機率",
            "value": "`/random <隨機數名稱>` 開啟此頁面",
            "inline": false
        },
        {
            "name": "讓機器人幫你說話",
            "value": "`/say <內容>` 機器人將會說出你打的內容",
            "inline": false
        },
        {
            "name": "生成計時器",
            "value": "`/timer <計時器名稱>` 開啟此頁面",
            "inline": false
        },
        {
            "name": "管理員指令幫助",
            "value": "`/help 管理員` 開啟管理員指令幫助頁面",
            "inline": false
        }
    ]
    
    i.reply({ embeds: [Embed], ephemeral: true })
    return
}

export default help