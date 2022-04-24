import { lazy } from 'react'
import { USER_ROLE_ENUM } from '@/constants/user'
import { RouteProps } from '@/types/routes'
import { Navigate, Outlet } from 'react-router-dom'
import { lazyLoad } from './index'

const routes: RouteProps[] = [
  {
    path: '/',
    element: <Outlet />,
    children: [
      { index: true, element: <Navigate replace to='/welcome' /> },
      {
        path: 'welcome',
        element: lazyLoad(lazy(() => import('@/views/welcome')))
      },
      {
        path: 'login',
        element: lazyLoad(lazy(() => import('@/views/login')))
      },
      {
        path: 'key-test',
        element: lazyLoad(lazy(() => import('@/views/keyTest')))
      },
      {
        path: 'settings',
        meta: {
          auth: true,
          roles: [USER_ROLE_ENUM.ADMIN, USER_ROLE_ENUM.GUEST]
        },
        element: lazyLoad(lazy(() => import('@/views/settings')))
      },
      {
        path: 'user-center',
        element: lazyLoad(lazy(() => import('@/views/userCenter'))),
        meta: {
          auth: true,
          unRoles: [USER_ROLE_ENUM.GUEST]
        },
        children: [
          { index: true, element: 'select a user' },
          {
            path: ':userId',
            element: lazyLoad(lazy(() => import('@/views/userCenter/userItem')))
          }
        ]
      }
    ]
  },
  { path: '*', element: lazyLoad(lazy(() => import('@/views/404'))) }
]

export default routes
