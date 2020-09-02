const DEV = {
    fxtyc: 'http://120.24.168.112:31190/',
}
const TEST = {
    fxtyc: 'http://testjyzxapi.tostar.top/',
}
const PRE = {
    fxtyc: 'https://prejyzxapi.tostar.top/',
}
const PROD = {
    fxtyc: 'https://apijyzxpro.wbp5.com/',
}
const CROSS = new Map([
    ['development', DEV],
    ['test', TEST],
    ['pre', PRE],
    ['production', PROD],
])
// API
export const baseUrl = CROSS.get(process.env.NODE_ENV) || DEV

export const IMG_DOMAIN = {
    fxhost: 'http://imgs.wbp5.com',
}
export const STYLE_DOMAIN = {
    edhost: 'http://prejsapi.wbp5.com',
}
