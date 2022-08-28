import React, { FC, useState } from 'react'
import { useRecoilSnapshot, useRecoilState } from 'recoil'
import { fakeState } from '../../fakeState'
import RecursiveTree from './components/recursive_tree'
import { mockOrgTreeList } from './data'
import { TreeBranch } from './types/types'

const onSelect = (value: TreeBranch) => {
  // You can put whatever here
}

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

        return (
          <div style={{ padding: '5px' }}>
            <RecursiveTree
              key={node.key}
              listMeta={[{ [item.key]: contents }]}
              onSelectCallback={onSelect}
            />
          </div>
        )
      })}
    </>
  )
}

export default App
