import { FC, Fragment, useEffect } from 'react'

import {
  atom,
  useRecoilSnapshot,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil'
import { fakeState, fakeState2 } from '../fakeState'

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

const stickyState = atom<null | string>({
  key: `stickyState`,
  default: null,
})

const Sticky = styled(motion.div)<{ width: number }>`
  position: fixed;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.primaryText};
  top: 60px;
  right: 0;
  justify-content: flex-end;
  padding: 0 10px;
  backdrop-filter: blur(5px);
  width: ${({ width }) => width - 1}px;
  height: 30px;
  background: ${({ theme }) => theme.headerBackground + numberToHex(0.5)};
  border-bottom: ${({ theme }) =>
    `1px solid ${theme.faintOutline + numberToHex(0.7)}`};
  border-top: ${({ theme }) =>
    `1px solid ${theme.faintOutline + numberToHex(0.7)}`};
`

const List: FC = () => {
  const snapshot = useRecoilSnapshot()
  const userInput = useRecoilValue(devToolsSearchState)
  const searchIsFocused = useRecoilValue(searchIsFocusedState)
  const fake = useRecoilValue(fakeState)
  const fake2 = useRecoilValue(fakeState2)
  const [set, setSet] = useRecoilState(nullState)
  const sticky = useRecoilValue(stickyState)
  const { width, position } = useRecoilValue(recoilDevToolsSettingsState)

  snapshot.retain()

  const list = Array.from(snapshot.getNodes_UNSTABLE())

  return (
    <>
      <AnimatePresence>
        {sticky && (
          <Sticky
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            width={width}
          >
            {sticky}
          </Sticky>
        )}
      </AnimatePresence>
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
  const setSticky = useSetRecoilState(stickyState)

  useEffect(() => {
    if (isStuck && isOpen[node.key]) {
      setSticky(type)
    } else {
      setSticky(null)
    }
  }, [isStuck])

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

  return (
    <div style={{ padding: '5px 5px' }}>
      <ItemHeader
        isStuck={isStuck && isOpen[node.key] && (isObject || isArray)}
        onClick={() =>
          setIsOpen((prev) => ({
            ...prev,
            [node.key]: !prev[node.key],
          }))
        }
        ref={ref}
      >
        <InnerHeader>
          <span title={type}>
            <Badge length={length} />
            <span>
              {node.key.split('').map((key: string, index: number) => {
                return (
                  <ItemLetter
                    highlight={
                      input.includes(key.toLowerCase()) && searchIsFocused
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
  )
}

export default List

const ItemHeader = styled.span<{ isStuck: boolean }>`
  display: inline-block;
  transform: ${({ isStuck }) => (isStuck ? `translateY(5px)` : `none`)};
  position: sticky;
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
