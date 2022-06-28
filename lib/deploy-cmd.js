/**
 * @param {import("discord.js").ApplicationCommandManager<import("discord.js").ApplicationCommand<{ guild: import("discord.js").GuildResolvable; }>, { guild: import("discord.js").GuildResolvable; }, null>} cmd
 */

function deploycmd(cmd) {
    cmd.set([
        {
            name: 'ping',
            description: '和機器人打乒乓球'
        },
        {
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
        },
        {
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
        },
        {
            name: 'random',
            description: '生成隨機機率'
        },
        {
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
        },
        {
            name: 'rolebutton',
            description: '建立身分組選擇訊息(按鈕)',
            options: [
                {
                    name: '身分組1',
                    description: '第一個按鈕代表的身分組',
                    required: true,
                    type: 'ROLE'
                },
                {
                    name: '身分組1的顏色',
                    description: '第一個按鈕的顏色',
                    required: true,
                    type: 'STRING',
                    choices: [
                        {
                            name: '灰色',
                            value: 'SECONDARY'
                        },
                        {
                            name: '藍色',
                            value: 'PRIMARY'
                        },
                        {
                            name: '綠色',
                            value: 'SUCCESS'
                        },
                        {
                            name: '紅色',
                            value: 'DANGER'
                        }
                    ]
                },
                {
                    name: '身分組2',
                    description: '第二個按鈕代表的身分組',
                    required: false,
                    type: 'ROLE'
                },
                {
                    name: '身分組2的顏色',
                    description: '第二個按鈕的顏色',
                    required: false,
                    type: 'STRING',
                    choices: [
                        {
                            name: '灰色',
                            value: 'SECONDARY'
                        },
                        {
                            name: '藍色',
                            value: 'PRIMARY'
                        },
                        {
                            name: '綠色',
                            value: 'SUCCESS'
                        },
                        {
                            name: '紅色',
                            value: 'DANGER'
                        }
                    ]
                },
                {
                    name: '身分組3',
                    description: '第三個按鈕代表的身分組',
                    required: false,
                    type: 'ROLE'
                },
                {
                    name: '身分組3的顏色',
                    description: '第一個按鈕的顏色',
                    required: false,
                    type: 'STRING',
                    choices: [
                        {
                            name: '灰色',
                            value: 'SECONDARY'
                        },
                        {
                            name: '藍色',
                            value: 'PRIMARY'
                        },
                        {
                            name: '綠色',
                            value: 'SUCCESS'
                        },
                        {
                            name: '紅色',
                            value: 'DANGER'
                        }
                    ]
                }
            ]
        }
    ])
}

export default deploycmd