import http from '@/utils/http'
interface LoginInfo {
  username: string
  password: string
}
export const login = (info: LoginInfo) =>
    http.post('/login/loginByAccount', info, {
        codes: { sures: ['4601a00'], err: ['4601a12', '4601a14'] },
    })