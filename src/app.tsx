import ReactDOM from 'react-dom'
import React from 'react'
import store from '@/store'
import './global.less'
import 'antd/dist/antd.less'
import Welcome from './views/welcome'
import { Provider } from 'react-redux'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Welcome />
    </Provider>
  </React.StrictMode>,
  document.getElementById('app')
)
