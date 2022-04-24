import { createRoot } from 'react-dom/client'
import store from '@/store'
import '@/global.less'
import 'antd/dist/antd.less'
import { Provider } from 'react-redux'
import React, { FC, useMemo } from 'react'
import { BrowserRouter, useRoutes } from 'react-router-dom'
import routes from '@/routes/config'
import { RouterAuth, screenRoutesByRole } from '@/routes/index'

const App: FC = () => {
  const { role } = store.getState().user

  console.log('当前用户角色', role)
  const curRoutes = useMemo(() => {
    return screenRoutesByRole(routes)
  }, [role])
  const Element = useRoutes(curRoutes)

  return <RouterAuth>{Element}</RouterAuth>
}

export const root = document.getElementById('app')

root &&
  createRoot(root).render(
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  )
