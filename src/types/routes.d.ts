import type { RouteObject } from 'react-router-dom'
import { USER_ROLE_ENUM } from '@/constants/user'

// 扩展Route定义
export interface RouteProps extends RouteObject {
  meta?: {
    auth?: boolean
    // roles和unRoles冲突的时候，冲突的部分以unRoles为准
    roles?: USER_ROLE_ENUM[] // 空数组代表没有谁可以访问
    unRoles?: USER_ROLE_ENUM[] // 空数组代表没有谁不可以访问
  }
  children?: RouteProps[]
}
