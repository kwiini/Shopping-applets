// pages/goods_list/goods_list.js
import {request} from "../../request/index"
import regeneratorRuntime from "../../lib/runtime/runtime"

Page({
  data: {
    tabs: [
      {
        id: 0,
        value: '综合',
        isActive: true
      },
      {
        id: 1,
        value: '销量',
        isActive: false
      },
      {
        id: 2,
        value: '价格',
        isActive: false
      },
    ],
    goodsList: []
  },
  // 接口参数
  QueryParams: {
    query: "",
    cid: "",
    pagenum: 1,
    pagesize: 10,
  },
  // 总页数
  totalPages: 1,
  onLoad(options) {
    this.QueryParams.cid = options.cid || ""
    this.QueryParams.query = options.query || ""
    this.getGoodsList()
  },
  // 获取列表数据
  async getGoodsList() {
    const res = await request({url: '/goods/search', data: this.QueryParams})
    const total = res.total
    this.totalPages = Math.ceil(total / this.QueryParams.pagesize)
    this.setData({
      goodsList: [...this.data.goodsList, ...res.goods]
    })
    wx.stopPullDownRefresh()
  },
  // 标题点击事件
  handleTabsItemChange(e) {
    const {index} = e.detail
    let {tabs} = this.data
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false)
    this.setData({
      tabs
    })
  },
  // 上滑加载
  onReachBottom() {
    // 判断是否有下一页
    if (this.QueryParams.pagenum >= this.totalPages) {
      // console.log('%c' + "没有下一页数据", "color:red:font-size:100rpx;background-image:linear-gradient(to right,#0094ff,pink)");
      wx.showToast({
        title: '没有下一页数据',
      });
    } else {
      // console.log('%c' + "有下一页数据", "color:red:font-size:100rpx;background-image:linear-gradient(to right,#0094ff,pink)");
      this.QueryParams.pagenum++
      this.getGoodsList()
    }
  },
  // 下拉刷新
  onPullDownRefresh() {
    // console.log('%c' + "刷新", "color:red:font-size:100rpx;background-image:linear-gradient(to right,#0094ff,pink)");
    this.setData({
      goodsList: [],
    })
    this.QueryParams.pagenum = 1
    this.getGoodsList()
  }
})