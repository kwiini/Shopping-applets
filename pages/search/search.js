// pages/search/search.js
import {request} from "../../request/index"

Page({
  data: {
    goods: [],
    isFocus: false,
    inpValue: ""
  },
  TimeId: -1,
  // 输入框触发事件
  handleInput(e) {
    const {value} = e.detail
    if (!value.trim()) {
      this.setData({
        goods: [],
        isFocus: false
      })
      return // 非法输入
    }
    this.setData({
      isFocus: true
    })
    clearTimeout(this.TimeId)
    this.TimeId = setTimeout(() => {
      this.qsearch(value)
    }, 1000)
  },
  // 发送搜索建议请求
  async qsearch(query) {
    const res = await request({url: "/goods/qsearch", data: {query}})
    this.setData({
      goods: res
    })
  },
  // 点击取消
  handleCancel() {
    this.setData({
      inpValue: "",
      isFocus: false,
      goods: []
    })
  }
})