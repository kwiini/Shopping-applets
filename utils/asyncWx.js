export const getSetting = () => {
    return new Promise((resolve, reject) => {
        wx.getSetting({
            success: (result)=>{
                resolve(result)
            },
            fail: (err)=>{
                reject(err)
            }
        })
    })
}

export const chooseAddress = () => {
    return new Promise((resolve, reject) => {
        wx.chooseAddress({
            success: (result)=>{
                resolve(result)
            },
            fail: (err)=>{
                reject(err)
            }
        })
    })
}

export const openSetting = () => {
    return new Promise((resolve, reject) => {
        wx.openSetting({
            success: (result)=>{
                resolve(result)
            },
            fail: (err)=>{
                reject(err)
            }
        })
    })
}

export const showModal = ({content}) => {
    return new Promise((resolve, reject) => {
        wx.showModal({
            title: '提示',
            content,
            success: (result) => {
                resolve(result)
            },
            fail: (err) => {
                reject(err)
            }
          })
    })
}

export const showToast = ({title}) => {
    return new Promise((resolve, reject) => {
        wx.showToast({
            title,
            icon: 'none',
            success: (result) => {
                resolve(result)
            },
            fail: (err) => {
                reject(err)
            }
        })
    })
}

export const login = () => {
    return new Promise((resolve, reject) => {
        wx.login({
            timeout: 10000,
            success: (result) => {
                resolve(result)
            },
            fail: (err) => {
                reject(err)
            }
        })
    })
}

export const requestPayment = (pay) => {
    return new Promise((resolve, reject) => {
        wx.requestPayment({
            // ...pay,
            //
            timeStamp: '1490840662',
            nonceStr: '5K8264ILTKCH16CQ2502SI8ZNMTM67VS',
            package: 'prepay_id=wx2017033010242291fcfe0db70013231072',
            signType: 'MD5',
            paySign: 'MD5(appId=wx972d215aef566e18&nonceStr=5K8264ILTKCH16CQ2502SI8ZNMTM67VS&package=prepay_id=wx2017033010242291fcfe0db70013231072&signType=MD5&timeStamp=1490840662&key=qazwsxedcrfvtgbyhnujmikolp111111) = 22D9B4E54AB1950F51E0649E8810ACD6',
            //
            success: (result) => {
                resolve(result)
            },
            fail: (err) => {
                reject(err)
            }
        });
    })
}