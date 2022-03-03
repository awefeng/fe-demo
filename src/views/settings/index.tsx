import { FC } from 'react'
import { useSelector } from 'react-redux'

const Setting: FC = () => {
  const { name } = useSelector((state) => state.user)

  return <h1>这是设置界面, 欢迎你 - {name}</h1>
}

export default Setting
