import { FC, Fragment, useState } from 'react'
import { pop, push } from './minHeap'
import type { Heap } from './minHeap'
import { Button, message } from 'antd'

const KeyTest: FC = () => {
  const [heap, setHeap] = useState<Heap>([])
  const popNode = () => {
    const temp = JSON.parse(JSON.stringify(heap))
    const first = pop(temp)

    if (first) {
      message.success(`推出了sortIndex:${first.sortIndex},id: ${first.id}`)
    }

    debugger
    setHeap(temp)
  }
  const pushNode = () => {
    const sortIndex = Math.floor(Math.random() * 100 + 1)
    const temp = JSON.parse(JSON.stringify(heap))

    push(temp, { sortIndex, id: sortIndex })
    setHeap(temp)
  }

  return (
    <Fragment>
      <h1>小顶堆</h1>
      <Button onClick={popNode}>POP</Button>
      <Button onClick={pushNode}>PUSH一个随机数</Button>
      <br />
      当前小顶堆：
      {heap.map((node) => (
        <p key={node.sortIndex}>{JSON.stringify(node)}</p>
      ))}
    </Fragment>
  )
}

export default KeyTest
