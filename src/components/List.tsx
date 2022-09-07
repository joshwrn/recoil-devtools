import type { FC } from "react"
import { useState, useMemo, Fragment } from "react"

import type { RecoilState, RecoilValue } from "recoil"
import { useRecoilSnapshot, useRecoilValue } from "recoil"
import styled from "styled-components"

import {
  devToolsSearchState,
  recoilDevToolsSettingsState,
} from "../state/storage"
import { numberToHex } from "../utils/color"
import { searchIsFocusedState } from "./Header"
import { AtomFamilyItem, StateItem } from "./Item"

const List: FC = () => {
  const snapshot = useRecoilSnapshot()
  const userInput = useRecoilValue(devToolsSearchState)
  const searchIsFocused = useRecoilValue(searchIsFocusedState)
  const { width, transparency, position } = useRecoilValue(
    recoilDevToolsSettingsState
  )
  const [allAtoms, setAllAtoms] = useState<RecoilValue<unknown>[]>([])
  const [allAtomFamilies, setAllAtomFamilies] = useState<
    { key: string; contents: RecoilState<unknown>[] }[]
  >([])
  const [allSelectorFamilies, setAllSelectorFamilies] = useState<
    { key: string; contents: RecoilState<unknown>[] }[]
  >([])

  useMemo(() => {
    const list = Array.from(snapshot.getNodes_UNSTABLE())
    const atomFamilies = new Map()
    const selectorFamilies = new Map()
    const tempAtoms: RecoilValue<unknown>[] = []
    list.map((item) => {
      if (item.key.includes(`__selectorFamily`)) {
        const [key, id] = item.key.split(`__selectorFamily`)
        if (!selectorFamilies.has(key)) {
          selectorFamilies.set(key, [])
        }
        selectorFamilies.get(key).push(item)
      } else if (item.key.includes(`__`)) {
        const [key, id] = item.key.split(`__`)
        if (!atomFamilies.has(key)) {
          atomFamilies.set(key, [])
        }
        atomFamilies.get(key).push(item)
      } else {
        tempAtoms.push(item)
      }
    })
    const tempAtomFamilies = []
    const tempSelectorFamilies = []
    for (const [key, value] of atomFamilies) {
      tempAtomFamilies.push({ key, contents: value })
    }
    for (const [key, value] of selectorFamilies) {
      tempSelectorFamilies.push({ key, contents: value })
    }
    setAllAtoms(tempAtoms)
    setAllAtomFamilies(tempAtomFamilies)
    setAllSelectorFamilies(tempSelectorFamilies)
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
                  name={node.key}
                />
              }
            </Fragment>
          )
        })}
      {allAtomFamilies
        .filter((node) =>
          userInput
            .split(` `)
            .some((phrase) => node.key.toLowerCase().includes(phrase))
        )
        .map((node) => {
          return (
            <AtomFamilyItem
              key={`atomFamily:` + node.key}
              node={node}
              snapshot={snapshot}
              input={userInput}
              searchIsFocused={searchIsFocused}
            />
          )
        })}
      {allSelectorFamilies
        .filter((node) =>
          userInput
            .split(` `)
            .some((phrase) => node.key.toLowerCase().includes(phrase))
        )
        .map((node) => {
          return (
            <AtomFamilyItem
              key={`selectorFamily:` + node.key}
              node={node}
              snapshot={snapshot}
              input={userInput}
              searchIsFocused={searchIsFocused}
              family="SelectorFamily"
            />
          )
        })}
    </Container>
  )
}

export default List

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
