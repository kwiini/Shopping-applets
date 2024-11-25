// pages/category/category.js
import {request} from "../../request/index"
import regeneratorRuntime from "../../lib/runtime/runtime"

Page({
  data: {
    leftMenuList: [],
    rightContent: [],
    currentIndex: 0,
    scrollTop: 0,
  },
  Cates: [],
  onLoad(options) {
    // 0. web 与 小程序区别
      // 1. 代码方法
        // web: localStorage.setItem('key', 'value')
        // 小程序：wx.setStorageSync('key', 'value')
      // 2. 类型转换
        // web: 先调用 toString()
        // 小程序：不需要
    // 1. 判断本地存储 {time: Date.now(), data: [...]}
    // 2. 没有历史，直接发送新请求
    // 3. 反之使用本地存储
    
    // 1. 获取本地存储中的数据
    const Cates = wx.getStorageSync('cates')
    // 2. 判断
    if (!Cates) {
      // 不存在
      this.getCates()
    } else {
      // 定义过期时间
      if (Date.now() - Cates.time > 1000 * 10) {
        this.getCates()
      } else {
        this.Cates = Cates.data
        let leftMenuList = this.Cates.map(v => v.cat_name)
        let rightContent = this.Cates[0].children
        this.setData({
          leftMenuList,
          rightContent
        })
      }
    }
  },
  // 获取分类数据
  async getCates() {
    // request({
    //   url: '/categories'
    // })
    // .then(res => {
    //   this.Cates = res.data.message
    //   // 接口数据存入本地
    //   wx.setStorageSync('cates', {time: Date.now(), data: this.Cates})
    //   let leftMenuList = this.Cates.map(v => v.cat_name)
    //   let rightContent = this.Cates[0].children
    //   this.setData({
    //     leftMenuList,
    //     rightContent
    //   })
    // })
    
    // 1. 使用 async await
    const res = await request({url: '/categories'})
    // this.Cates = res.data.message
    this.Cates = res
    // 接口数据存入本地
    wx.setStorageSync('cates', {time: Date.now(), data: this.Cates})
    let leftMenuList = this.Cates.map(v => v.cat_name)
    let rightContent = this.Cates[0].children
    this.setData({
      leftMenuList,
      rightContent
    })
  },
  // 左侧菜单的点击事件
  handleItemTap(e) {
    // 1. 获取被点击的标题索引
    // 2. 给 data 中的 cuurentIndex 赋值
    //  3. 根据索引渲染右侧内容
    const {index} = e.currentTarget.dataset
    let rightContent = this.Cates[index].children
    this.setData({
      currentIndex: index,
      rightContent,
      // 设置右侧内容的 scroll-view 标签顶部距离
      scrollTop: 0
    })
  }
})