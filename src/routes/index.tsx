import React, { FC, Fragment, Suspense } from 'react'
import { Spin } from 'antd'
import { RouteProps } from '@/types/routes'
import { matchRoutes, Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/utils/auth'
import store from '@/store'
import routes from './config'

// 懒加载
export function lazyLoad(Comp: React.LazyExoticComponent<any>): React.ReactNode {
  return (
    <Suspense
      fallback={
        <Spin
          size='large'
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        />
      }
    >
      <Comp />
    </Suspense>
  )
}

// 通过用户角色筛选路由
export function screenRoutesByRole(routes: RouteProps[]) {
  const { role } = store.getState().user

  return routes
    .map((route) => {
      if (route.meta) {
        const { roles: canIn, unRoles: cantIn } = route.meta

        // 以unRoles 优先
        if (Array.isArray(cantIn) && cantIn.includes(role)) return null

        if (Array.isArray(canIn) && !canIn.includes(role)) return null
      }

      if (!route.children) return route
      route.children = screenRoutesByRole(route.children)
      return route
    })
    .filter((i) => i !== null) as RouteProps[]
}

// 路由登录权限组件
export const RouterAuth: FC<{ children: any }> = ({ children }) => {
  const { isLogin } = useAuth()
  const location = useLocation()
  const mathchs = matchRoutes(routes, location)
  const isNeedLogin = mathchs?.some((item) => {
    const route: RouteProps = item.route

    // 没有配置字段的直接返回
    if (!route.meta) return false
    // 返回是否需要登录
    return route.meta.auth
  })

  if (isNeedLogin && !isLogin) {
    console.log('需要登录')
    // 跳转到登录
    return <Navigate to='/login' state={{ from: location.pathname }} replace />
  }

  // return children as React.ReactElement
  return <Fragment>{children}</Fragment>
}
