import { FC, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getInvoices } from './data'

const UserItem: FC = () => {
  const invoices = getInvoices()
  const navigate = useNavigate()
  const { userId = null } = useParams()

  useEffect(() => {
    if (!invoices.some((inv) => inv.number === Number(userId))) {
      navigate('/404', { replace: true })
    }
  }, [])
  return <div style={{ border: '1px solid' }}>「{userId}」</div>
}

export default UserItem
