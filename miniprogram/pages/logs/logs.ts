// logs.ts
// const util = require('../../utils/util.js')
import { formatTime } from '../../utils/util'

Page({
  data: {
    logs: [],
  },
  onLoad() {
    const that = this
    that.setData({
      logs: (wx.getStorageSync('logs') || []).map((log: string) => {
        return formatTime(new Date(log),false)
      }),
    })
  },
})
