import { USER_ROLE_ENUM } from '@/constants/user'
import { useAuth } from '@/utils/auth'
import { Button } from 'antd'
import { FC, Fragment } from 'react'
import { useSelector } from 'react-redux'

const Setting: FC = () => {
  const { name } = useSelector((state) => state.user)
  const { canUse } = useAuth()

  return (
    <Fragment>
      <h1>这是设置界面, 欢迎你 - {name}</h1>
      {canUse(USER_ROLE_ENUM.ADMIN) && <Button>只有ADMIN看见哦</Button>}
    </Fragment>
  )
}

export default Setting
