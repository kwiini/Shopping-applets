// pages/pay/pay.js
import {getSetting, chooseAddress, openSetting, showModal, showToast, requestPayment} from "../../utils/asyncWx"
import regeneratorRuntime from "../../lib/runtime/runtime"
import {request} from "../../request/index"

Page({
  data: {
    address: {},
    cart: [],
    totalPrice: 0,
    totalNum: 0
  },
  onShow() {
    const address = wx.getStorageSync('address')
    let cart = wx.getStorageSync("cart") || []
    cart = cart.filter(v => v.checked)
    this.setData({
      address
    })
    let totalPrice = 0
    let totalNum = 0
    cart.forEach(v => {
      totalPrice += v.num * v.goods_price
      totalNum += v.num
    })
    this.setData({
      cart,
      totalPrice,
      totalNum,
      address
    })
  },
  // 支付
  async handleOrderPay() {
    try {
      // 判断 token
      const token = wx.getStorageSync("token");
      if (!token) {
        wx.navigateTo({
          url: '/pages/auth/auth'
        })
        return
      }
      // const header = {Authorization: token}
      const order_price = this.data.totalPrice
      const consignee_addr = this.data.address.all
      const cart = this.data.cart
      let goods = []
      cart.forEach(v => goods.push({
        goods_id: v.goods_id,
        goods_number: v.num,
        goods_price: v.goods_price
      }))
      const orderParams = {order_price, consignee_addr, goods}
      const {order_number} = await request({url: "/my/orders/create", method: "POST", data: orderParams})
      const {pay} = await request({url: "/my/orders/req_unifiedorder", method: "POST", data: {order_number}})
      await requestPayment(pay)
      const res = await request({url: "/my/orders/chkOrder", method: "POST", data: {order_number}})
      await showToast({title: "支付成功"})
      let newCart = wx.getStorageSync("cart")
      newCart = newCart.filter(v => !v.checked)
      wx.setStorageSync("cart", newCart);
      // 跳转
      wx.navigateTo({
        url: '/pages/order/order'
      })
    } catch (error) {
      await showToast({title: "支付失败"})
      console.log(error)
    }
  }
})