import { FC, Fragment, useState } from 'react'

const ShowKey: FC = () => {
  const [list, setList] = useState([1, 2, 3, 4, 5])

  return (
    <Fragment>
      <button
        onClick={() => {
          setList(list.map((item) => item + 1))
        }}
      >
        +1
      </button>
      <ul>
        {list.map((item, index) => {
          return <li key={index}>{item}</li>
        })}
      </ul>
    </Fragment>
  )
}

export default ShowKey
