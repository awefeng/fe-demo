import { FC, Fragment, useState } from 'react'

const ShowKey: FC = () => {
  const arr = new Array(10000).fill('')
  const [list, setList] = useState(arr)

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
          return <li key={index}>{item + index}</li>
        })}
      </ul>
    </Fragment>
  )
}

export default ShowKey
