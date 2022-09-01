import type { FC } from "react"
import { Fragment } from "react"

import { AnimatePresence, motion } from "framer-motion"
import type { RecoilValue, Snapshot } from "recoil"
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

const List: FC = () => {
  const snapshot = useRecoilSnapshot()
  const userInput = useRecoilValue(devToolsSearchState)
  const searchIsFocused = useRecoilValue(searchIsFocusedState)
  const { width, transparency } = useRecoilValue(recoilDevToolsSettingsState)

  snapshot.retain()

  const list = Array.from(snapshot.getNodes_UNSTABLE())

  return (
    <Container transparency={transparency} width={width}>
      {list.map((item) => {
        const node = item
        return (
          <Fragment key={`frag` + node.key}>
            {node.key.toLowerCase().includes(userInput) && (
              <StateItem
                key={`state:` + node.key}
                node={node}
                snapshot={snapshot}
                input={userInput}
                searchIsFocused={searchIsFocused}
              />
            )}
          </Fragment>
        )
      })}
    </Container>
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

  let length = 0
  if (Array.isArray(contents)) length = contents.length
  if (typeof contents === `object` && contents) {
    length = Object.keys(contents).length
  }

  const wordStart = node.key.toLowerCase().indexOf(input)
  const shouldStick = isStuck && isOpen[node.key] && (isObject || isArray)

  return (
    <>
      <div>
        <div
          style={{
            width: `100px`,
            height: `1px`,
            position: `sticky`,
            top: `-1px`,
          }}
          ref={ref}
        />

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
              <Badge length={length} />
              <span>
                {node.key.split(``).map((key: string, index: number) => {
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
            branchName={`branch` + node.key}
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
const Container = styled.div<{ width: number; transparency: number }>`
  .sticky {
    width: ${({ width }) => width}px;
    background: ${({ theme, transparency }) =>
      theme.headerBackground + numberToHex(1 - transparency / 1.5)};
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
    `1px solid ${theme.faintOutline + numberToHex(0.7)}`};
  border-top: ${({ theme }) =>
    `1px solid ${theme.faintOutline + numberToHex(0.7)}`};
`
