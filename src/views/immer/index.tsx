import { FC, Fragment } from 'react'
import { Button, Space } from 'antd'
import { useImmer } from 'use-immer'

interface TodoProps {
  readonly name: string
  readonly time: Date
}

const ImmerTest: FC = () => {
  const [myTodos, setMyTodos] = useImmer<TodoProps[]>([])
  const addMyTodo = () => {
    setMyTodos((draft) => {
      draft.push({
        name: `${Math.random()} +  测试`,
        time: new Date()
      })
    })
  }
  const updateMyTodo = (index: number, todo: Partial<TodoProps>) => {
    setMyTodos((draft) => {
      draft[index] = {
        ...draft[index],
        ...todo
      }
    })
  }
  const delMyTodo = (index: number) => {
    setMyTodos((draft) => {
      draft.splice(index, 1)
    })
  }

  return (
    <Fragment>
      <div>Immer测试页</div>
      My Todos:
      <ul>
        {myTodos.map((todo, index) => {
          return (
            <li key={index}>
              {todo.name} | {todo.time.toLocaleString()}
            </li>
          )
        })}
      </ul>
      <Space direction='horizontal'>
        <Button onClick={addMyTodo}>addTodo</Button>
        <Button
          onClick={() => {
            updateMyTodo(0, { name: `${Math.random()} +  测试` })
          }}
        >
          updateTodo
        </Button>
        <Button
          onClick={() => {
            delMyTodo(0)
          }}
        >
          delTodo
        </Button>
      </Space>
    </Fragment>
  )
}

export default ImmerTest
