import React, { Suspense } from 'react'
import type { RouteObject } from 'react-router-dom'
import { Spin } from 'antd'
import { Navigate } from 'react-router-dom'
import { USER_ROLE_ENUM } from '@/constants/user'

// 扩展Route定义
export interface RouteProps extends RouteObject {
  meta?: {
    auth?: boolean
    roles?: USER_ROLE_ENUM[]
    unRoles?: USER_ROLE_ENUM[]
  }
  children?: RouteProps[]
}

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
    children: [
      {
        path: 'welcome',
        index: true,
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
          auth: true
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
