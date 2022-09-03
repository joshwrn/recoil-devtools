import type { FC } from "react"
import { useState, useMemo, Fragment } from "react"

import { AnimatePresence, motion } from "framer-motion"
import type { RecoilState, RecoilValue, Snapshot } from "recoil"
import { useRecoilSnapshot, useRecoilState, useRecoilValue } from "recoil"
import styled from "styled-components"

import useSticky from "../hooks/useSticky"
import {
  devItemIsOpenState,
  devToolsSearchState,
  recoilDevToolsSettingsState,
} from "../state/storage"
import { numberToHex } from "../utils/color"
import Badge from "./Badge"
import { searchIsFocusedState } from "./Header"
import RecursiveTree from "./RecursiveTree"

/* eslint-disable max-lines */

const List: FC = () => {
  const snapshot = useRecoilSnapshot()
  const userInput = useRecoilValue(devToolsSearchState)
  const searchIsFocused = useRecoilValue(searchIsFocusedState)
  const { width, transparency, position } = useRecoilValue(
    recoilDevToolsSettingsState
  )
  const [allAtoms, setAllAtoms] = useState<RecoilState<unknown>[]>([])
  const [allAtomFamilies, setAllAtomFamilies] = useState<any[]>([])

  useMemo(() => {
    const list = Array.from(snapshot.getNodes_UNSTABLE())
    const atomFamilies: any = new Map()
    const temp: any = []
    list.map((item) => {
      console.log(item)
      if (item.key.includes(`__`)) {
        const [key, id] = item.key.split(`__`)
        if (!atomFamilies.has(key)) {
          atomFamilies.set(key, [])
        }
        atomFamilies.get(key).push(item)
      } else {
        temp.push(item)
      }
    })

    setAllAtoms(temp)
    setAllAtomFamilies(Array.from(atomFamilies))
    console.log(Array.from(atomFamilies))
  }, [snapshot, userInput])

  snapshot.retain()

  return (
    <Container position={position} transparency={transparency} width={width}>
      {allAtoms
        .filter((node) =>
          userInput
            .split(` `)
            .some((phrase) => node.key.toLowerCase().includes(phrase))
        )
        .map((item) => {
          const node = item
          return (
            <Fragment key={`frag` + node.key}>
              {
                <StateItem
                  key={`state:` + node.key}
                  node={node}
                  snapshot={snapshot}
                  input={userInput}
                  searchIsFocused={searchIsFocused}
                />
              }
            </Fragment>
          )
        })}
      {allAtomFamilies
        .filter((node) =>
          userInput
            .split(` `)
            .some((phrase) => node[0].toLowerCase().includes(phrase))
        )
        .map((node) => {
          return (
            <AtomFamilyItem
              key={`atomFamily:` + node[0]}
              node={node}
              snapshot={snapshot}
              userInput={userInput}
              searchIsFocused={searchIsFocused}
            />
          )
        })}
    </Container>
  )
}

const AtomFamilyItem: FC<{
  snapshot: Snapshot
  node: any
  userInput: any
  searchIsFocused: any
}> = ({ snapshot, node, userInput, searchIsFocused }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isSticky, setIsSticky] = useState(false)
  return (
    <Fragment key={`frag` + node[0]}>
      <div>
        <span
          style={{ color: `white` }}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {` `}
          {node[0]}
          {` `}
        </span>
        {isOpen && (
          <div
            style={{
              paddingLeft: `10px`,
            }}
          >
            {node[1].map((item: any) => {
              return (
                <StateItem
                  key={`state:` + item.key}
                  node={item}
                  snapshot={snapshot}
                  input={userInput}
                  searchIsFocused={searchIsFocused}
                />
              )
            })}
          </div>
        )}
      </div>
    </Fragment>
  )
}

const StateItem: FC<{
  snapshot: Snapshot
  node: RecoilValue<unknown>
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

  const words = input.split(` `)
  const wordToHighlight = words.find((word) =>
    node.key.toLowerCase().includes(word)
  )
  const wordStart = node.key.toLowerCase().indexOf(wordToHighlight || ``)
  const shouldStick = isStuck && isOpen[node.key] && (isObject || isArray)

  return (
    <div>
      <Dummy ref={ref} />
      <ItemHeader
        isStuck={shouldStick}
        onClick={() =>
          setIsOpen((prev) => ({
            ...prev,
            [node.key]: !prev[node.key],
          }))
        }
      >
        <AnimatePresence>
          {shouldStick && (
            <Sticky
              className="sticky"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {type}
            </Sticky>
          )}
        </AnimatePresence>
        <InnerHeader isStuck={shouldStick}>
          <span title={type}>
            <Badge item={contents} isMap={isSet} isSet={isSet} />
            <span>
              {node.key.split(``).map((key: string, index: number) => {
                return (
                  <ItemLetter
                    highlight={
                      index >= wordStart &&
                      index <= wordStart + (wordToHighlight?.length ?? 1) - 1 &&
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
          branchName={`branch` + node.key}
          contents={contents}
        />
      )}
    </div>
  )
}

export default List

const Dummy = styled.div`
  width: 100px;
  height: 1px;
  position: sticky;
  top: -1px;
`

const ItemHeader = styled.span<{ isStuck: boolean }>`
  display: inline-block;
  position: sticky;
  top: 0;
  z-index: 1;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
`
const InnerHeader = styled.div<{ isStuck: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  transform: ${({ isStuck }) => (isStuck ? `translateY(5px)` : `none`)};
`
const ItemLetter = styled.span<{ highlight: boolean }>`
  color: ${({ highlight, theme }) =>
    highlight ? theme.boolean : theme.primaryText};
`
const Container = styled.div<{
  width: number
  transparency: number
  position: string
}>`
  .sticky {
    width: ${({ width, position }) =>
      position !== `bottom` ? width + `px` : `100%`};
    background: ${({ theme, transparency }) =>
      `${theme.headerBackground}${numberToHex(
        transparency > 0.3 ? transparency + 0.3 : 0.6
      )}`};
  }
  display: flex;
  flex-direction: column;
  gap: 3px;
  padding: 0 10px;
`
const Sticky = styled(motion.div)`
  position: absolute;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.primaryText};
  top: 0px;
  left: 0px;
  justify-content: flex-end;
  backdrop-filter: blur(5px);
  backface-visibility: hidden;
  transform: translateZ(0) scale(1, 1) translateX(-15px);
  padding: 0 17px;
  z-index: -1;
  height: 30px;
  border-bottom: ${({ theme }) =>
    `1px solid ${theme.faintOutline + numberToHex(0.7)}`} !important;
  border-top: ${({ theme }) =>
    `1px solid ${theme.faintOutline + numberToHex(0.7)}`} !important;
`
