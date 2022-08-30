import { FC, useEffect } from 'react'
import React, { useState } from 'react'

import { atom, useRecoilSnapshot, useRecoilState, useRecoilValue } from 'recoil'
import { fakeState, fakeState2 } from './fakeState'

import RecursiveTree from './recursive_tree'
import useSticky from './hooks/useSticky'
import styled from 'styled-components'
import { numberToHex } from './DevTools/DebugInspector'

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

  return (
    <div style={{ padding: `5px` }}>
      <ItemHeader
        isStuck={isStuck && isOpen && (isObject || isArray)}
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
        {/* {isOpen && <span className="json-mark">:</span>} */}
      </ItemHeader>
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

const ItemHeader = styled.span<{ isStuck: boolean }>`
  display: inline-block;
  width: ${({ isStuck }) => (isStuck ? `calc(100% + 15px)` : `auto`)};
  transform: ${({ isStuck }) => (isStuck ? `translateX(-10px)` : `none`)};
  padding: ${({ isStuck }) => (isStuck ? `0 15px` : `0`)};
  position: sticky;
  top: 0;
  backdrop-filter: ${({ isStuck }) => (isStuck ? `blur(30px)` : `none`)};
  cursor: pointer;
  background: ${({ isStuck, theme }) =>
    isStuck ? theme.headerBackground + numberToHex(0.5) : `transparent`};
`
