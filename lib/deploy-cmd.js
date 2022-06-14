/**
 * @param {import("discord.js").ApplicationCommandManager<import("discord.js").ApplicationCommand<{ guild: import("discord.js").GuildResolvable; }>, { guild: import("discord.js").GuildResolvable; }, null>} cmd
 */

function deploycmd(cmd) {
    cmd.create({
        name: 'ping',
        description: '和機器人打乒乓球'
    })

    cmd.create({
        name: 'help',
        description: '取得指令幫助',
    })

    cmd.create({
        name: 'vote',
        description: '投票系統',
        options: [
            {
                name: 'create',
                description: '建立投票',
                type: 'SUB_COMMAND',
                options: [
                    {
                        name: '投票項目',
                        description: '讓大家知道投票的項目是什麼',
                        required: true,
                        type: 'STRING'
                    },
                    {
                        name: '選項1',
                        description: '第一個選項',
                        required: true,
                        type: 'STRING'
                    },
                    {
                        name: '選項2',
                        description: '第二個選項',
                        required: true,
                        type: 'STRING'
                    },
                    {
                        name: '選項3',
                        description: '第三個選項',
                        type: 'STRING'
                    },
                    {
                        name: '選項4',
                        description: '第四個選項',
                        type: 'STRING'
                    },
                    {
                        name: '選項5',
                        description: '第五個選項',
                        type: 'STRING'
                    },
                    {
                        name: '選項6',
                        description: '第六個選項',
                        type: 'STRING'
                    }
                ]
            },
            {
                name: 'get',
                description: '查詢投票資訊',
                type: 'SUB_COMMAND',
                options: [
                    {
                        name: '投票id',
                        description: '從投票訊息中拿到的ID',
                        required: true,
                        type: 'STRING'
                    }
                ]
            }
        ]
    })

    cmd.create({
        name: 'forex',
        description: '查詢匯率',
        options: [
            {
                name: 'from',
                description: '來源幣別',
                required: true,
                type: 'STRING',
            },
            {
                name: 'to',
                description: '目標幣別',
                required: true,
                type: 'STRING'
            },
            {
                name: 'count',
                description: '價格',
                required: true,
                type: 'NUMBER'
            }
        ]
    })

    cmd.create({
        name: 'calc',
        description: '計算算式',
        options: [
            {
                name: '算式',
                description: '算式',
                required: true,
                type: 'STRING'
            }
        ]
    })

    cmd.create({
        name: 'random',
        description: '生成隨機機率'
    })

    cmd.create({
        name: 'timer',
        description: '建立計時器',
        options: [
            {
                name: 'name',
                description: '計時器名稱',
                required: true,
                type: 'STRING'
            },
            {
                name: 'time',
                description: '時間(min)',
                required: true,
                type: 'NUMBER'
            }
        ]
    })

    cmd.create({
        name: 'music',
        description: '音樂功能',
        options: [
            {
                name: 'play',
                description: '播放歌曲',
                type: 'SUB_COMMAND',
                options: [
                    {
                        name: '關鍵字或網址',
                        description: 'Youtube或spotify影片/播放清單的關鍵字或url',
                        required: true,
                        type: 'STRING'
                    }
                ]
            },
            {
                name: 'skip',
                description: '跳過目前曲目',
                type: 'SUB_COMMAND'
            },
            {
                name: 'stop',
                description: '停止播放',
                type: 'SUB_COMMAND'
            },
            {
                name: 'loop',
                description: '循環歌曲',
                type: 'SUB_COMMAND',
                options: [
                    {
                        name: '類型',
                        description: '循環類型',
                        required: true,
                        type: 'NUMBER',
                        choices: [
                            {
                                name: '循環單個曲目',
                                value: 1
                            },
                            {
                                name: '循環整個撥放隊列',
                                value: 2
                            },
                            {
                                name: '不循環曲目',
                                value: 0
                            }
                        ]
                    }
                ]
            },
            {
                name: 'clear',
                description: '清除歌曲隊列',
                type: 'SUB_COMMAND'
            },
            {
                name: 'progress',
                description: '顯示撥放到了哪裡',
                type: 'SUB_COMMAND'
            },
            {
                name: 'pause',
                description: '暫停播放',
                type: 'SUB_COMMAND'
            },
            {
                name: 'resume',
                description: '繼續撥放',
                type: 'SUB_COMMAND'
            },
            {
                name: 'remove',
                description: '移除曲目',
                type: 'SUB_COMMAND',
                options: [
                    {
                        name: '編號',
                        description: '曲目編號',
                        required: true,
                        type: 'NUMBER'
                    }
                ]
            },
            {
                name: 'queue',
                description: '顯示隊列內容',
                type: 'SUB_COMMAND'
            }
        ]
    })
}

export default deploycmd