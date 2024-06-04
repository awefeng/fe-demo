import { Button, Divider, Select } from 'antd'
import { FC, Fragment } from 'react'
import styles from './index.less'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { I18N_LANGUAGES } from '@/constants/i18n'
import '@/i18n/index'

const Welcome: FC = () => {
  const navigate = useNavigate()
  const { t, i18n } = useTranslation('welcome')

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
      国际化: {t('nihao')}
      <br />
      当前语言：{i18n.language}, 切换语言:
      <Select
        className={styles['i18n-select']}
        value={i18n.language}
        onChange={(v) => {
          debugger
          i18n.changeLanguage(v)
        }}
        options={[
          { label: '中文', value: I18N_LANGUAGES.ZH_CN },
          { label: '英文', value: I18N_LANGUAGES.EN_US },
          { label: '繁体', value: I18N_LANGUAGES.ZH_TW }
        ]}
      />
    </Fragment>
  )
}

export default Welcome
