// index.js
//Page Object
// 0. 引入请求代码
import { request } from "../../request/index"

Page({
  data: {
    swiperList: [],
    catesList: [],
    floorList: [],
  },
  //options(Object)
  onLoad: function(options){
    // 1. promise 发送异步请求获取数据
    // wx.request({
    //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
    //   success: (result)=>{
    //     this.setData({
    //       swiperList: result.data.message
    //     })
    //   }
    // });
    this.getSwiperList()
    this.getCatesList()
    this.getFloorList()
  },
  // 获取轮播图数据
  getSwiperList() {
    request({url: '/home/swiperdata'})
    .then(result => {
      this.setData({
        swiperList: result
      })
    })
  }, 
  // 获取分类导航数据
  getCatesList() {   
    request({url: '/home/catitems'})
    .then(result => {
      this.setData({  
        catesList: result
      })
    })
  },
  // 获取楼层数据
  getFloorList() {
    request({url: '/home/floordata'})
    .then(result => {
      this.setData({
        floorList: result
      })
    })
  }
});
