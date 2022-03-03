import React, { FC, Fragment, Suspense } from 'react'
import { Spin } from 'antd'
import { USER_ROLE_ENUM } from '@/constants/user'
import { RouteProps } from '@/types/routes'
import { matchRoutes, Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '@/utils/auth'

function lazyLoad(Comp: React.LazyExoticComponent<any>): React.ReactNode {
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

const routes: RouteProps[] = [
  {
    path: '/',
    element: (
      <div>
        主页
        <Outlet />
      </div>
    ),
    children: [
      { index: true, element: <Navigate replace to='/welcome' /> },
      {
        path: 'welcome',
        element: lazyLoad(React.lazy(() => import('@/views/welcome')))
      },
      {
        path: 'login',
        element: lazyLoad(React.lazy(() => import('@/views/login')))
      },
      {
        path: 'settings',
        meta: {
          auth: true,
          roles: [USER_ROLE_ENUM.ADMIN]
        },
        element: lazyLoad(React.lazy(() => import('@/views/settings')))
      },
      {
        path: 'user-center',
        element: lazyLoad(React.lazy(() => import('@/views/userCenter'))),
        meta: {
          auth: true,
          unRoles: [USER_ROLE_ENUM.GUEST]
        },
        children: [
          { index: true, element: 'select a user' },
          {
            path: ':userId',
            element: lazyLoad(
              React.lazy(() => import('@/views/userCenter/userItem'))
            )
          }
        ]
      }
    ]
  },
  { path: '*', element: lazyLoad(React.lazy(() => import('@/views/404'))) }
]

export default routes

export const RouterAuth: FC = ({ children }) => {
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
