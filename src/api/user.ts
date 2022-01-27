import fetch from '@/request'

// 获取用户信息
export function getUserInfo(
  userId: string
): Promise<{ data: { userId: string; name: string; blabala: any } }> {
  return fetch('/user/info', { method: 'GET', params: { userId } })
}
