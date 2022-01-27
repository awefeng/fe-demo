// @ts-nocheck
import axios from 'axios'
import type { Method, AxiosRequestConfig, AxiosResponse } from 'axios'
import { notification } from 'antd'

const fetch = <R>(
  url: string,
  {
    method,
    baseUrl = '',
    data = undefined,
    then = undefined,
    ...others
  }: {
    method: Method
    baseUrl?: string
    data?: any
    then?: any
    [key: string]: any
  }
): Promise<R> => {
  /**
   * 1. 是否有自定义的header 或者其他从config传入的配置
   * 从这里进行完善
   */
  let headers = {
    'Content-Type': 'application/json'
    //TODO 鉴权？
  }

  if (others.headers) {
    headers = Object.assign(headers, others.headers)
  }

  // 2. 定义请求的Config
  const requestConfig: AxiosRequestConfig = {
    method,
    url,
    timeout: 10000,
    data,
    headers,
    ...others
  }

  // 3. 根据环境和传参决定baseurl
  // 优化点 抽出不同的axios实例
  if (baseUrl) {
    requestConfig.baseURL = baseUrl
  } else {
    // 开发环境根据 devServer proxy来替换
    // 其他环境从配置读取
    if (process.env.ENV !== ENV.DEV) {
      requestConfig.baseURL = config.baseUrl
    }
  }

  // 如果是自己传入了后续处理方法 则用后续的处理方法
  if (typeof then === 'function') {
    return axios(requestConfig).then(then)
  }

  return axios(requestConfig)
    .then((res) => {
      return new Promise((resolve, reject) => {
        // 根据API规范文档进行处理
        const { code } = res.data

        if (code === 0) {
          resolve(res.data as R)
        } else {
          reject(res)
        }
      })
    })
    .catch(async (res: AxiosResponse) => {
      // 统一的错误请求处理
      // TODO 登录过期 API规范文档规定的报错code 错误兜底 等
      const { status, data } = res

      if (status === 401) {
        await new Promise<void>((resolve) => {
          notification.error({ message: data?.msg ?? '鉴权过期，请重新登录！' })
          setTimeout(() => {
            resolve()
          }, 2000)
        }).then(logOut)
      } else {
        // TODO  其他情况
        // 抛出业务错误信息
        throw new Error(data?.msg ?? '请求错误~，服务器开小差了')
      }
    })
}

export default fetch
