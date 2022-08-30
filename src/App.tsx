import { FC, Fragment, useEffect } from 'react'
import React, { useState } from 'react'

import { atom, useRecoilSnapshot, useRecoilState, useRecoilValue } from 'recoil'
import { fakeState, fakeState2 } from './fakeState'

import RecursiveTree from './recursive_tree'
import useSticky from './hooks/useSticky'
import styled from 'styled-components'
import { numberToHex } from './DevTools/DebugInspector'

import {
  devToolsSearchState,
  devItemIsOpenState,
} from './DevTools/DebugInspector'

import { searchIsFocusedState } from './DevTools/DevtoolsHeader'

const nullState = atom<Set<string>>({
  key: `nullState`,
  default: new Set(),
})

const App: FC = () => {
  const snapshot = useRecoilSnapshot()
  const userInput = useRecoilValue(devToolsSearchState)
  const searchIsFocused = useRecoilValue(searchIsFocusedState)
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

        return (
          <Fragment key={'frag' + node.key}>
            {node.key.toLowerCase().includes(userInput) && (
              <StateItem
                key={'state:' + node.key}
                node={node}
                snapshot={snapshot}
                input={userInput}
                searchIsFocused={searchIsFocused}
              />
            )}
          </Fragment>
        )
      })}
    </>
  )
}

const StateItem: FC<{
  snapshot: any
  node: any
  input: string
  searchIsFocused: boolean
}> = ({ snapshot, node, input, searchIsFocused }) => {
  let { contents } = snapshot.getLoadable(node)
  const [ref, isStuck] = useSticky()
  const [isOpen, setIsOpen] = useRecoilState(devItemIsOpenState)

  const isDate = contents instanceof Date
  const isObject = typeof contents === `object` && contents && !isDate
  const isArray = Array.isArray(contents)
  const isSet = contents instanceof Set
  const isMap = contents instanceof Map

  if (isSet || isMap) {
    contents = Array.from(contents)
  }

  return (
    <div style={{ padding: '5px 5px' }}>
      <ItemHeader
        isStuck={isStuck && isOpen && (isObject || isArray)}
        className="json-mark"
        onClick={() =>
          setIsOpen((prev) => ({
            ...prev,
            [node.key]: !prev[node.key],
          }))
        }
        ref={ref}
      >
        <span>
          {isObject && !isArray && !isSet && !isMap && (
            <span className="json-mark">{`{${
              Object.keys(contents).length
            }} `}</span>
          )}
          {(isArray || isSet || isMap) && (
            <span className="json-mark">{`[${contents.length}] `}</span>
          )}
        </span>
        {node.key.split('').map((key: string, index: number) => {
          return (
            <ItemLetter
              highlight={input.includes(key.toLowerCase())}
              key={index}
            >
              {key}
            </ItemLetter>
          )
        })}
      </ItemHeader>
      {isOpen[node.key] && (
        <RecursiveTree
          key={node.key}
          branchName={'branch' + node.key}
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
const ItemLetter = styled.span<{ highlight: boolean }>`
  color: ${({ highlight, theme }) => (highlight ? theme.boolean : `inherit`)};
`
