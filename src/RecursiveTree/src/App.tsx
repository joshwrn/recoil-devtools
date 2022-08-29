import React, { FC, useState } from 'react'
import { useRecoilSnapshot, useRecoilState } from 'recoil'
import { fakeState } from '../../fakeState'
import RecursiveTree from './components/recursive_tree'

function App() {
  const fake = useRecoilState(fakeState)
  const snapshot = useRecoilSnapshot()

  snapshot.retain()

  const list = Array.from(snapshot.getNodes_UNSTABLE())
  return (
    <>
      {list.map((item) => {
        const node = item
        const param = node.key.split(`__`)[1]
        const { contents } = snapshot.getLoadable(node)
        const data = contents instanceof Set ? Array.from(contents) : contents
        console.log({ contents })

        return <StateItem node={node} snapshot={snapshot} />
      })}
    </>
  )
}

const StateItem: FC<{ snapshot: any; node: any }> = ({ snapshot, node }) => {
  const { contents } = snapshot.getLoadable(node)
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div style={{ padding: '5px' }}>
      <span onClick={() => setIsOpen(!isOpen)}>
        {node.key}
        {isOpen && ':'}
      </span>
      {isOpen && <RecursiveTree key={node.key} contents={contents} />}
    </div>
  )
}

export default App
