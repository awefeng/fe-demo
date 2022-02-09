import React, { Suspense } from 'react'
import type { RouteObject } from 'react-router-dom'
import { Spin } from 'antd'

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

const routes: RouteObject[] = [
  {
    path: '/',
    element: lazyLoad(React.lazy(() => import('@/views/welcome'))),
    children: [
      {
        path: 'settings',
        element: lazyLoad(React.lazy(() => import('@/views/settings')))
      },
      {
        path: 'user-center',
        element: lazyLoad(React.lazy(() => import('@/views/userCenter'))),
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
