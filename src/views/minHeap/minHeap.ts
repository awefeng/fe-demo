/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 任务存放的数据结构
 * 类似小顶堆 将heap中最小的节点放在第一个
 * @flow strict
 */

export type Heap = Array<Node>
export type Node = {
  id: number
  sortIndex: number
}

/**
 * push一个任务
 * 先将任务放在队列末尾
 * 然后进行二分遍历，将最小的任务放在第一个
 */
export function push(heap: Heap, node: Node): void {
  const index = heap.length

  heap.push(node)
  siftUp(heap, node, index)
}

// 查看小顶堆的第一个任务
export function peek(heap: Heap): Node | null {
  return heap.length === 0 ? null : heap[0]
}

// 推出第一个任务
export function pop(heap: Heap): Node | null {
  if (heap.length === 0) {
    return null
  }

  const first = heap[0]
  const last = heap.pop() as Node

  if (last !== first) {
    heap[0] = last
    siftDown(heap, last, 0)
  }

  return first
}

/**
 * 上浮元素
 * 确保队列的第一个始终是sortIndex最小的
 *
 * 之所以不将入队的node直接和head[0]进行比较
 * 是因为想要将入队的node放在一个比较合适的位置，避免后续siftdown操作进行更多的遍历
 */
function siftUp(heap: Heap, node: Node, i: number) {
  let index = i

  while (index > 0) {
    // 获取队列中0到index的二分位置
    const parentIndex = (index - 1) >>> 1
    const parent = heap[parentIndex]

    /**
     * 如果中间位置的node和需要入队的node compare结果为正
     * 则表明需要入队的node需要继续往前移动
     * index为2或者1的时候 parentIndex会为0
     * 这样就比较了需要入队的node和head[0]
     */
    if (compare(parent, node) > 0) {
      // The parent is larger. Swap positions.
      heap[parentIndex] = node
      heap[index] = parent
      index = parentIndex
    } else {
      // The parent is smaller. Exit.
      return
    }
  }
}

/**
 * 通过小顶堆寻找队列中最小的最小的
 * 确保队列的第一个始终是sortIndex最小的
 */
function siftDown(heap: Heap, node: Node, i: number) {
  let index = i

  debugger
  const length = heap.length
  const halfLength = length >>> 1

  while (index < halfLength) {
    const leftIndex = (index + 1) * 2 - 1
    const left = heap[leftIndex]
    const rightIndex = leftIndex + 1
    const right = heap[rightIndex]

    // If the left or right node is smaller, swap with the smaller of those.
    if (compare(left, node) < 0) {
      // 先找到右子树中最小的
      if (rightIndex < length && compare(right, left) < 0) {
        heap[index] = right
        heap[rightIndex] = node
        index = rightIndex
      } else {
        // 右子树中最小的找到以后 再来比较左子树
        heap[index] = left
        heap[leftIndex] = node
        index = leftIndex
      }
    } else if (rightIndex < length && compare(right, node) < 0) {
      heap[index] = right
      heap[rightIndex] = node
      index = rightIndex
    } else {
      // Neither child is smaller. Exit.
      return
    }
  }
}

// 比较两个节点: sortIndex优先 sortIndex相同的情况再比较id
function compare(a: Node, b: Node) {
  // Compare sort index first, then task id.
  const diff = a.sortIndex - b.sortIndex

  return diff !== 0 ? diff : a.id - b.id
}
