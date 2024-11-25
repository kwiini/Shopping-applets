// pages/goods_detail/goods_detail.js
import {request} from "../../request/index"
import regeneratorRuntime from "../../lib/runtime/runtime"

Page({
  /**
   * 页面的初始数据
   */
  data: {
    goodsObj: {},
    isCollected: false
  },
  // 对象
  GoodsInfo: {},
  /**
   * 生命周期函数--监听页面加载
   */
  onShow(e) {
    let pages = getCurrentPages()
    let currentPage = pages[pages.length - 1]
    let options = currentPage.options
    const {goods_id} = options
    this.getGoodsDetail(goods_id)

    
  },
  // 获取详情数据
  async getGoodsDetail(goods_id) {
    const goodsObj = await request({url: "/goods/detail", data: {goods_id}})
    this.GoodsInfo = goodsObj
    let collect = wx.getStorageSync("collect") || []
    let isCollected = collect.some(v => v.goods_id === this.GoodsInfo.goods_id)
    this.setData({
      goodsObj: {
        goods_name: goodsObj.goods_name,
        goods_price: goodsObj.goods_price,
        goods_introduce: goodsObj.goods_introduce.replace(/\.webp/g, '.jpg'),
        pics: goodsObj.pics
      },
      isCollected
    })
  },
  // 预览大图
  handlePreviewImage(e) {
    // console.log('%c' + "预览大图", "color:red:font-size:100rpx;background-image:linear-gradient(to right,#0094ff,pink)");
    const urls = this.GoodsInfo.pics.map(v => v.pics_mid)
    const current = e.currentTarget.dataset.url
    wx.previewImage({
      current,
      urls
    });
  },
  // 加入购物车
  handleCartAdd() {
    let cart = wx.getStorageSync("cart") || []
    let index = cart.findIndex(v => v.goods_id === this.GoodsInfo.goods_id)
    if (index === -1) {
      this.GoodsInfo.num = 1
      this.GoodsInfo.checked = true
      cart.push(this.GoodsInfo)
    } else {
      cart[index].num++
    }
    wx.setStorageSync("cart", cart)
    wx.showToast({
      title: '加入成功',
      icon: 'success',
      mask: true
    });
  },
  // 收藏
  handleCollect() {
    let isCollected = false
    let collect = wx.getStorageSync("collect") || []
    let index = collect.findIndex(v => v.goods_id === this.GoodsInfo.goods_id)
    if (index !== -1) {
      collect.splice(index, 1)
      isCollected = false
      wx.showToast({
        title: '取消成功',
        icon: 'success',
        mask: true
      })
    } else {
      collect.push(this.GoodsInfo)
      isCollected = true
      wx.showToast({
        title: '收藏成功',
        icon: 'success',
        mask: true
      })
    }
    wx.setStorageSync("collect", collect)
    this.setData({
      isCollected
    })
  }
})