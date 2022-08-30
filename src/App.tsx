import { FC, useEffect } from 'react'
import React, { useState } from 'react'

import { atom, useRecoilSnapshot, useRecoilState, useRecoilValue } from 'recoil'
import { fakeState, fakeState2 } from './fakeState'

import RecursiveTree from './recursive_tree'
import useSticky from './hooks/useSticky'

const nullState = atom<Set<string>>({
  key: `nullState`,
  default: new Set(),
})

const App: FC = () => {
  const snapshot = useRecoilSnapshot()
  const fake = useRecoilValue(fakeState)
  const fake2 = useRecoilValue(fakeState2)
  const [set, setSet] = useRecoilState(nullState)

  snapshot.retain()

  const list = Array.from(snapshot.getNodes_UNSTABLE())
  return (
    <>
      {list.map((item) => {
        const node = item
        const param = node.key.split(`__`)[1]
        const { contents } = snapshot.getLoadable(node)
        const data = contents instanceof Set ? Array.from(contents) : contents

        return <StateItem key={node.key} node={node} snapshot={snapshot} />
      })}
    </>
  )
}

const StateItem: FC<{ snapshot: any; node: any }> = ({ snapshot, node }) => {
  let { contents } = snapshot.getLoadable(node)
  const [isStuck, ref] = useSticky()
  const [isOpen, setIsOpen] = useState(false)

  const isDate = contents instanceof Date
  const isObject = typeof contents === `object` && contents && !isDate
  const isArray = Array.isArray(contents)
  const isSet = contents instanceof Set
  const isMap = contents instanceof Map

  if (isSet || isMap) {
    contents = Array.from(contents)
  }

  useEffect(() => {
    console.log(isStuck, node.key)
  }, [isStuck])

  return (
    <div style={{ padding: `5px` }}>
      <span
        style={{
          position: 'sticky',
          top: 0,
          backdropFilter: `blur(10px)`,
          cursor: 'pointer',
          border: isStuck ? `1px solid blue` : `1px solid transparent`,
        }}
        className="json-mark test"
        onClick={() => setIsOpen(!isOpen)}
        ref={ref}
      >
        <span>
          {isObject && !isArray && (
            <span className="json-mark">{`{${
              Object.keys(contents).length
            }} `}</span>
          )}
          {isArray && (
            <span className="json-mark">{`[${contents.length}] `}</span>
          )}
        </span>
        {node.key}
        {isOpen && <span className="json-mark">:</span>}
      </span>
      {isOpen && (
        <RecursiveTree
          key={node.key}
          branchName={node.key}
          contents={contents}
        />
      )}
    </div>
  )
}

export default App
