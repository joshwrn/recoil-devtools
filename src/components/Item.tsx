import type { FC } from "react"
import { Fragment } from "react"

import { AnimatePresence, motion } from "framer-motion"
import type { RecoilState, RecoilValue, Snapshot } from "recoil"
import { useRecoilState } from "recoil"
import styled from "styled-components"

import useSticky from "../hooks/useSticky"
import { devItemIsOpenState } from "../state/storage"
import { numberToHex } from "../utils/color"
import Badge from "./Badge"
import RecursiveTree from "./RecursiveTree"

export const AtomFamilyItem: FC<{
  snapshot: Snapshot
  node: { key: string; contents: RecoilState<unknown>[] }
  input: string
  searchIsFocused: boolean
}> = ({ snapshot, node, input, searchIsFocused }) => {
  const [isOpen, setIsOpen] = useRecoilState(devItemIsOpenState)

  return (
    <Fragment key={`frag` + node.key}>
      <div>
        <ItemHeader
          shouldStick={false}
          onClick={() =>
            setIsOpen((prev) => ({
              ...prev,
              [node.key]: !prev[node.key],
            }))
          }
        >
          <InnerHeader isStuck={false}>
            <Badge isAtomFamily={true} item={node} />
            <span title={`AtomFamily`}>
              <AtomName
                name={node.key}
                input={input}
                searchIsFocused={searchIsFocused}
              />
            </span>
          </InnerHeader>
        </ItemHeader>
        {isOpen[node.key] && (
          <div
            style={{
              paddingLeft: `10px`,
            }}
          >
            {node.contents.map((item: RecoilState<unknown>) => {
              return (
                <StateItem
                  key={`state:` + item.key}
                  node={item}
                  snapshot={snapshot}
                  input={input}
                  searchIsFocused={searchIsFocused}
                  isAtomFamily={true}
                />
              )
            })}
          </div>
        )}
      </div>
    </Fragment>
  )
}

export const StateItem: FC<{
  snapshot: Snapshot
  node: RecoilValue<unknown>
  input: string
  searchIsFocused: boolean
  isAtomFamily?: boolean
}> = ({ snapshot, node, input, searchIsFocused, isAtomFamily }) => {
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

  const name = isAtomFamily ? node.key.split(`__`)[1] : node.key
  const shouldStick = isStuck && isOpen[node.key] && (isObject || isArray)

  return (
    <div>
      <Dummy ref={ref} />
      <ItemHeader
        shouldStick={true}
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
            <AtomName
              name={name}
              input={input}
              searchIsFocused={searchIsFocused}
            />
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

export const AtomName: FC<{
  name: string
  input: string
  searchIsFocused: boolean
}> = ({ name, input, searchIsFocused }) => {
  const words = input.split(` `)
  const wordToHighlight = words.find((word) => name.toLowerCase().includes(word))
  const wordStart = name.toLowerCase().indexOf(wordToHighlight || ``)

  return (
    <span>
      {name.split(``).map((key: string, index: number) => {
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
  )
}

const Dummy = styled.div`
  width: 100px;
  height: 1px;
  position: sticky;
  top: -1px;
`
const ItemHeader = styled.span<{ shouldStick: boolean }>`
  display: inline-block;
  position: ${({ shouldStick }) => (shouldStick ? `sticky` : `relative`)};
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
