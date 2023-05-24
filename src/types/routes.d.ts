import type { IndexRouteObject, NonIndexRouteObject } from 'react-router-dom'
import { USER_ROLE_ENUM } from '@/constants/user'

interface CustomRouteFields {
  meta?: {
    auth?: boolean
    // roles和unRoles冲突的时候，冲突的部分以unRoles为准
    roles?: USER_ROLE_ENUM[] // 空数组代表没有谁可以访问
    unRoles?: USER_ROLE_ENUM[] // 空数组代表没有谁不可以访问
  }
}

type AppIndexRouteObject = IndexRouteObject & CustomRouteFields
type AppNonIndexRouteObject = Omit<NonIndexRouteObject, 'children'> &
  CustomRouteFields & {
    children?: (AppIndexRouteObject | AppNonIndexRouteObject)[]
  }

export type RouteProps = AppIndexRouteObject | AppNonIndexRouteObject
