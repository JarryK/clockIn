import axios from 'axios'

const isBlank = (value) => {
    if (value == '' || value == null)
        return true;
    let regu = "^[ ]+$";
    let re = new RegExp(regu);
    return re.test(value);
}

const timeout = 120000
const baseUrl = '/api'
// axios 实例化
const request = axios.create({
    timeout,
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    }
})

/**
 * 请求拦截 配置header请求参数
 */
request.interceptors.request.use(
    config => {
        // 可以在此处处理请求前需要的处理逻辑
        let tokenId = localStorage.getItem('tokenId')
        let token = localStorage.getItem('token')
        if (isBlank(tokenId)) {
            tokenId = ''
        }
        if (isBlank(token)) {
            token = ''
        }
        let headers = {
            'X-APIServer-TK': token
        }
        // 合并请求头
        if (config.headers) {
            Object.assign(config.headers, headers)
        } else {
            config.headers = headers
        }
        // 加入baseUrl
        if (config.url) {
            config.url = baseUrl + config.url
        }
        return config
    },
    error => {
        // 对请求错误做些什么
        console.error(error)
        return Promise.reject(error)
    }
)

/**
 * 响应拦截器
 */
 request.interceptors.response.use(
    response => {
        return response
    },
    error => {
        // 对响应错误做些什么
        return Promise.reject(error)
    }
)

/**
 * 封装请求方法
 * @param reqUrl 请求地址
 * @param method 请求方式
 * @param parameter 参数
 * @param checkSuccess 是否检查调用成功
 * @param needLoad 是否需要遮罩
 * @param headers 头部信息
 * @returns {Promise<unknown>}
 */
export async function httpRequest(reqUrl, method = 'post', parameter = {}, checkSuccess = true, needLoad = true, headers = {}) {
    let requestTime = new Date().getTime()
    let _p = {
        'requestTime': requestTime,
        'requestId': 'TL' + requestTime
    }
    parameter = Object.assign(parameter || {}, _p)
    // 处理请求地址
    let requestUrl = reqUrl
    if (method.toLowerCase() === 'get') {
        requestUrl = `${reqUrl}?`
        for (const key in parameter) {
            if (Object.prototype.hasOwnProperty.call(parameter, key)) {
                requestUrl += `${key}=${parameter[key]}&`
            }
        }
        requestUrl = requestUrl.substring(0, requestUrl.length - 1)
        parameter = null
    }
    // 请求数据
    let {data} = await request({
        method: method,
        url: requestUrl,
        data: parameter,
        headers: headers
    }).finally(() => {
    })
    if (!checkSuccess) {
        return Promise.resolve(data)
    } else if (data && String(data.code)) {
        if (String(data.code) === '0') {
            return Promise.resolve(data)
        } else {
            alert(JSON.stringify(data))
            return Promise.reject(data)
        }
    }
}
