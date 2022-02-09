import { FC } from 'react'
import { useParams } from 'react-router-dom'

const UserItem: FC = () => {
  const { userId = null } = useParams()

  return <div style={{ border: '1px solid' }}>「{userId}」</div>
}

export default UserItem
