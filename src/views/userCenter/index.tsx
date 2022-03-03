import { FC, Fragment } from 'react'
import { Outlet, NavLink } from 'react-router-dom'
import { getInvoices } from './data'

const UserCenter: FC = () => {
  const invoices = getInvoices()

  return (
    <Fragment>
      <div style={{ width: '1000px', height: '100px', border: '1px solid' }}>
        <h1>用户中心</h1>

        {invoices.map((invo) => {
          return (
            <NavLink
              to={`/user-center/${invo.number}`}
              key={invo.number}
              style={({ isActive }) => {
                return {
                  display: 'block',
                  margin: '1rem 0',
                  color: isActive ? 'red' : ''
                }
              }}
            >
              {invo.name}| {'  '}
            </NavLink>
          )
        })}
        <Outlet />
      </div>
    </Fragment>
  )
}

export default UserCenter
