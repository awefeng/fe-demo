import { USER_ROLE_ENUM } from '@/constants/user'
import { dispatch } from '@/store'
import { init, setUserInfo } from '@/store/user'
import store from '@/store'

/**
 * 这里本该是读取登录态
 * 我们直接写死 每次进来都是未登录
 */
let isLogin = false

const signIn = () => {
  isLogin = true
  dispatch(
    setUserInfo({
      userId: '123',
      name: 'awefeng',
      phone: '',
      role: USER_ROLE_ENUM.ADMIN
    })
  )
}
const signOut = () => {
  isLogin = false
  dispatch(init())
}
// 角色功能控制
const canUse = (canUseRole: USER_ROLE_ENUM | USER_ROLE_ENUM[]): boolean => {
  const { role } = store.getState().user

  if (Array.isArray(canUseRole)) return canUseRole.includes(role)
  return role === canUseRole
}

export function useAuth() {
  return {
    signIn,
    signOut,
    isLogin,
    canUse
  }
}
