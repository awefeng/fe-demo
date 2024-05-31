import { Button, Divider } from 'antd'
import { FC, Fragment } from 'react'
import styles from './index.less'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const Welcome: FC = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()

  return (
    <Fragment>
      <div className={styles.welcome}>欢迎</div>
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
        <Link to='/settings'>设置</Link> | <Link to='/user-center'>用户中心</Link> |
        <Link to='/key-test'>测试页</Link>
      </nav>
      <Outlet />
      <Divider />
      国际化: {t('welcome')}
    </Fragment>
  )
}

export default Welcome
