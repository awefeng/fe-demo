import { Button, message } from 'antd'
import { FC, Fragment } from 'react'
import styles from './index.less'
import { useDispatch, useSelector } from 'react-redux'
import { setUserInfo } from '@/store/user'

const Welcome: FC = () => {
  const dispath = useDispatch()
  const { name } = useSelector((state) => state.user)

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
    </Fragment>
  )
}

export default Welcome
