// 同时发送异步代码次数
let ajaxTimes = 0

export const request = (params) => {
    let header = {...params.header}
    if (params.url.includes("/my/")) {
        header["Authorization"] = wx.getStorageSync("token")
    }
    ajaxTimes++
    // 加载中
    wx.showLoading({
        title: '加载中',
        mask: true
    })
    setTimeout(() => {
        wx.hideLoading()
    }, 5000);
    // 公共 url
    const baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1"
    return new Promise((resolve, reject) => {
        wx.request({
            ...params,
            header,
            url: baseUrl + params.url,
            success: (result) => {
                resolve(result.data.message)
            },
            fail: (err) => {
                reject(err)
            },
            complete: () => {
                ajaxTimes--
                if (ajaxTimes === 0) {
                    wx.hideLoading()
                }
            }
        });
    })
}