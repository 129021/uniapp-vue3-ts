// 拦截 request请求
// 拦截uploadFlie文件上传

import { useMemberStore } from '@/stores'

// 1. 非HTTP开头需要拼接地址
// 2. 请求超时时间设置为10s
// 3. 添加小程序请求头标识
// 4. 添加token请求头标识

const baseURL = 'https://pcapi-xiaotuxian-front-devtest.itheima.net'

const httpInterceptor = {
  invoke(options: UniApp.RequestOptions) {
    // request 触发前拼接 url
    if (!options.url.startsWith('http')) {
      options.url = baseURL + options.url
    }

    ;(options.timeout = 10000),
      (options.header = {
        ...options.header,
        'source-client': 'miniapp',
      })

    const memberStore = useMemberStore()
    const token = memberStore.profile?.token
    if (token) {
      options.header.Authorization = token
    }
  },
}

uni.addInterceptor('requets', httpInterceptor)
uni.addInterceptor('uploadFile', httpInterceptor)

// 请求函数
// @param UniApp.RequestOptions
// @returns Promise
// 1. 返回promise对象
// 2. 请求成功
// 2.1提取核心数据res.data
// 2.2 添加类型，支持泛型
// 3. 请求失败
// 3.1 网络错误 -》提示更换网络
// 3.2 401 -》清理用户信息，跳转到登录页
// 3.3 其他错误 -》根据后端错误信息轻提示

interface Data<T> {
  code: string
  msg: string
  result: T
}

export const http = <T>(options: UniApp.RequestOptions) => {
  return new Promise<Data<T>>((resolve, rejecct) => {
    uni.request({
      ...options,
      success(res) {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(res.data as Data<T>)
        } else if (res.statusCode == 401) {
          const memberStore = useMemberStore()
          memberStore.clearProfile()
          uni.navigateTo({ url: '/pages/login/login' })
          rejecct(res)
        } else {
          // 其他错误
          uni.showToast({
            icon: 'none',
            title: (res.data as Data<T>).msg || '请求错误',
          })
          rejecct(res)
        }
        // console.log(res)
      },
      fail(err) {
        console.log(err)
        rejecct(err)
        uni.showToast({
          icon: 'none',
          title: '请求失败',
        })
      },
    })
  })
}
