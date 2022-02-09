import ReactDOM from 'react-dom'
import store from '@/store'
import './global.less'
import 'antd/dist/antd.less'
import Welcome from './views/welcome'
import Settings from './views/settings'
import UserCenter from './views/userCenter'
import { Provider } from 'react-redux'
import React, { FC } from 'react'
import { BrowserRouter, Route, Routes, useRoutes } from 'react-router-dom'
import NotFound from './views/404'
import UserItem from './views/userCenter/userItem'
import routes from './routes/config'

const App: FC = () => {
  const Element = useRoutes(routes)

  return <Provider store={store}>{Element}</Provider>
}

ReactDOM.render(
  // <React.StrictMode>
  //   <Provider store={store}>
  //     <BrowserRouter>
  //       <Routes>
  //         <Route path='/' element={<Welcome />}>
  //           <Route path='settings' element={<Settings />}></Route>
  //           <Route path='user-center' element={<UserCenter />}>
  //             <Route
  //               index
  //               element={
  //                 <main style={{ padding: '1rem' }}>
  //                   <p>Select an user</p>
  //                 </main>
  //               }
  //             />
  //             <Route path=':userId' element={<UserItem />}></Route>
  //           </Route>
  //         </Route>
  //         <Route path='*' element={<NotFound />}></Route>
  //       </Routes>
  //     </BrowserRouter>
  //   </Provider>
  // </React.StrictMode>,
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('app')
)
