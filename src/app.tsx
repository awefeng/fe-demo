import ReactDOM from 'react-dom'
import store from '@/store'
import './global.less'
import 'antd/dist/antd.less'
import { Provider } from 'react-redux'
import React, { FC } from 'react'
import {
  BrowserRouter,
  matchRoutes,
  useLocation,
  useRoutes
} from 'react-router-dom'
import routes from './routes/config'

const App: FC = () => {
  const Element = useRoutes(routes)
  const { pathname } = useLocation()
  const routers = matchRoutes(routes, location)

  console.log(pathname, routers)
  debugger
  return <Provider store={store}>{Element}</Provider>
}

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('app')
)
