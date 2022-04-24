import { FC, Fragment } from 'react'
import ShowKey from './showKey'

const KeyTest: FC = () => {
  return (
    <Fragment>
      <h1>渲染列表中的Key</h1>
      <ShowKey />
    </Fragment>
  )
}

export default KeyTest
