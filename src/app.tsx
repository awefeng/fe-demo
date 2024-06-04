import { createRoot } from 'react-dom/client'
import store from '@/store'
import '@/global.less'
import { Provider } from 'react-redux'
import React, { FC, useMemo } from 'react'
import { BrowserRouter, useRoutes } from 'react-router-dom'
import routes from '@/routes/config'
import { RouterAuth, screenRoutesByRole } from '@/routes/index'
import { cloneDeep } from 'lodash'
import { I18nextProvider } from 'react-i18next'
import i18n from './i18n'

const App: FC = () => {
  const { role } = store.getState().user

  console.log('当前用户角色', role)
  const curRoutes = useMemo(() => {
    return screenRoutesByRole(cloneDeep(routes))
  }, [role])
  const Element = useRoutes(curRoutes)

  return <RouterAuth>{Element}</RouterAuth>
}

export const root = document.getElementById('app')

root &&
  createRoot(root).render(
    <React.StrictMode>
      <I18nextProvider i18n={i18n}>
        <Provider store={store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>
      </I18nextProvider>
    </React.StrictMode>
  )
