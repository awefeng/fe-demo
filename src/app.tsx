import ReactDOM from 'react-dom'
import store from '@/store'
import './global.less'
import 'antd/dist/antd.less'
import { Provider } from 'react-redux'
import React, { FC } from 'react'
import { BrowserRouter, useRoutes } from 'react-router-dom'
import routes, { RouterAuth } from './routes/config'

const App: FC = () => {
  const Element = useRoutes(routes)

  return (
    <Provider store={store}>
      <RouterAuth>{Element}</RouterAuth>
    </Provider>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('app')
)
