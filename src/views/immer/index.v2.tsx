import { FC, Fragment, useState } from 'react'
import { Button, Space } from 'antd'
import { produce } from 'immer'

interface TodoProps {
  readonly name: string
  readonly time: Date
}

const ImmerTest: FC = () => {
  const [myTodos, setMyTodos] = useState<TodoProps[]>([])
  const addMyTodo = () => {
    const nextTodo = produce(myTodos, (draft) => {
      draft.push({
        name: `${Math.random()} +  测试`,
        time: new Date()
      })
    })

    setMyTodos(nextTodo)
  }
  const updateMyTodoCurried = produce(
    (draft: TodoProps[], add: { index: number; todo: Partial<TodoProps> }) => {
      draft[add.index] = {
        ...draft[add.index],
        ...add.todo
      }
    }
  )
  const updateMyTodo = (index: number, todo: Partial<TodoProps>) => {
    const nextTodo = produce(myTodos, (draft) => {
      draft[index] = {
        ...draft[index],
        ...todo
      }
    })

    setMyTodos(nextTodo)
  }
  const delMyTodo = (index: number) => {
    const nextTodos = produce(myTodos, (draft) => {
      draft.splice(index, 1)
    })

    setMyTodos(nextTodos)
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
            const nextTodo = updateMyTodoCurried(myTodos, {
              index: 0,
              todo: { name: `${Math.random()} +  测试` }
            })

            setMyTodos(nextTodo)
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
