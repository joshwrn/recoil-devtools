import { FC, Fragment, useEffect, useRef } from 'react'

import {
  atom,
  useRecoilSnapshot,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil'
import { fakeState, fakeState2, fakeState3 } from '../fakeState'

import RecursiveTree from './RecursiveTree'
import useSticky from '../hooks/useSticky'
import styled from 'styled-components'

import { searchIsFocusedState } from './Header'
import { numberToHex } from '../utils/color'
import {
  devItemIsOpenState,
  devToolsSearchState,
  recoilDevToolsSettingsState,
} from '../state/storage'
import Badge from './Badge'
import { Mark } from '../styles/Styles'
import { AnimatePresence, motion } from 'framer-motion'

const nullState = atom<Set<string>>({
  key: `nullState`,
  default: new Set([]),
})

const List: FC = () => {
  const snapshot = useRecoilSnapshot()
  const userInput = useRecoilValue(devToolsSearchState)
  const searchIsFocused = useRecoilValue(searchIsFocusedState)
  const fake = useRecoilValue(fakeState)
  const fake2 = useRecoilValue(fakeState2)
  const fake3 = useRecoilValue(fakeState3)
  const [set, setSet] = useRecoilState(nullState)

  snapshot.retain()

  const list = Array.from(snapshot.getNodes_UNSTABLE())

  return (
    <>
      {list.map((item) => {
        const node = item
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
  const type = Object.prototype.toString.call(contents).slice(8, -1)
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

  let length = 0
  if (Array.isArray(contents)) length = contents.length
  if (typeof contents === `object` && contents)
    length = Object.keys(contents).length

  const wordStart = node.key.toLowerCase().indexOf(input)

  return (
    <>
      <div style={{ padding: '5px 5px' }}>
        <div
          style={{
            width: '100px',
            height: '1px',
            position: 'sticky',
            top: '-1px',
          }}
          ref={ref}
        />
        <AnimatePresence>
          {isStuck && isOpen[node.key] && (
            <Sticky
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {type}
            </Sticky>
          )}
        </AnimatePresence>
        <ItemHeader
          isStuck={isStuck && isOpen[node.key] && (isObject || isArray)}
          onClick={() =>
            setIsOpen((prev) => ({
              ...prev,
              [node.key]: !prev[node.key],
            }))
          }
        >
          <InnerHeader>
            <span title={type}>
              <Badge length={length} />
              <span>
                {node.key.split('').map((key: string, index: number) => {
                  return (
                    <ItemLetter
                      highlight={
                        index >= wordStart &&
                        index <= wordStart + input.length - 1 &&
                        searchIsFocused
                      }
                      key={index}
                    >
                      {key}
                    </ItemLetter>
                  )
                })}
              </span>
            </span>
          </InnerHeader>
        </ItemHeader>
        {isOpen[node.key] && (
          <RecursiveTree
            key={node.key}
            branchName={'branch' + node.key}
            contents={contents}
          />
        )}
      </div>
    </>
  )
}

export default List

const ItemHeader = styled.span<{ isStuck: boolean }>`
  display: inline-block;
  transform: ${({ isStuck }) => (isStuck ? `translateY(5px)` : `none`)};
  position: sticky;
  backdrop-filter: blur(10px);
  top: 0;
  z-index: 1;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
`
const InnerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const ItemLetter = styled.span<{ highlight: boolean }>`
  color: ${({ highlight, theme }) =>
    highlight ? theme.boolean : theme.primaryText};
`
const Sticky = styled(motion.div)`
  position: sticky;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.primaryText};
  top: 0px;
  justify-content: flex-end;
  padding-right: 15px;
  backdrop-filter: blur(5px);
  backface-visibility: hidden;
  transform: translateZ(0) scale(1, 1);
  width: calc(100% + 20px);
  transform: translateX(-15px);
  height: 30px;
  background: ${({ theme }) => theme.headerBackground + numberToHex(0.5)};
  border-bottom: ${({ theme }) =>
    `1px solid ${theme.faintOutline + numberToHex(0.7)}`};
  border-top: ${({ theme }) =>
    `1px solid ${theme.faintOutline + numberToHex(0.7)}`};
`
