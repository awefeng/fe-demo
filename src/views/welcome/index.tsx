import { Button, message } from 'antd'
import { FC, Fragment } from 'react'
import styles from './index.less'
import { useDispatch, useSelector } from 'react-redux'
import { setUserInfo } from '@/store/user'
import { Link, Outlet, useNavigate } from 'react-router-dom'

const Welcome: FC = () => {
  const dispath = useDispatch()
  const { name } = useSelector((state) => state.user)
  const navigate = useNavigate()

  return (
    <Fragment>
      <Button
        type='primary'
        danger
        onClick={() => {
          dispath(setUserInfo({ name: 'awefeng' }))
          message.success('登录成功')
        }}
      >
        登录 awefeng
      </Button>
      <div className={styles.welcome}>欢迎: {name}</div>
      <nav
        style={{
          borderBottom: 'solid 1px',
          paddingTop: '1rem'
        }}
      >
        <Button
          onClick={() => {
            navigate('/settings')
          }}
        >
          测试router
        </Button>
        <Link to='/settings'>设置</Link> |{' '}
        <Link to='/user-center'>用户中心</Link>
      </nav>
      <Outlet />
    </Fragment>
  )
}

export default Welcome
