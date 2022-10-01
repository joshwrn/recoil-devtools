import type { FC } from "react"
import { useState, useMemo, Fragment } from "react"

import type { RecoilValue } from "recoil"
import { useRecoilSnapshot, useRecoilValue } from "recoil"
import styled from "styled-components"

import { searchState, settingsState } from "../state/storage"
import { numberToHex } from "../utils/color"
import type { FamilyItem } from "./Item"
import { AtomFamilyItem, StateItem } from "./Item"

type Item = {
  type: string
  item: FamilyItem | RecoilValue<unknown>
}

const List: FC = () => {
  const snapshot = useRecoilSnapshot()
  const userInput = useRecoilValue(searchState)
  const { width, transparency, position } = useRecoilValue(settingsState)
  const [allAtoms, setAllAtoms] = useState<Item[]>([])

  useMemo(() => {
    const list = Array.from(snapshot.getNodes_UNSTABLE())
    const families = new Map()
    const temp: Item[] = []
    list.map((item) => {
      const splitItem = item.key.split(`__`)
      if (splitItem.length > 1) {
        const key = splitItem[0]
        if (!families.has(key)) {
          let familyType = `AtomFamily`
          if (item.key.includes(`__selectorFamily`)) {
            familyType = `SelectorFamily`
          }
          families.set(key, {
            items: [],
            type: familyType,
          })
        }
        families.get(key).items.push(item)
      } else {
        temp.push({ type: `Atom`, item })
      }
    })
    for (const [key, value] of families) {
      temp.push({ type: value.type, item: { key, items: value.items } })
    }
    setAllAtoms(temp)
  }, [snapshot])

  snapshot.retain()

  return (
    <Container position={position} transparency={transparency} width={width}>
      {allAtoms
        .filter((node) =>
          userInput
            .split(` `)
            .some((phrase) => node.item.key.toLowerCase().includes(phrase))
        )
        .map((node) => {
          return (
            <Fragment key={`list-` + node.item.key + node.type}>
              {node.type === `Atom` && (
                <StateItem
                  node={node.item}
                  snapshot={snapshot}
                  input={userInput}
                  name={node.item.key}
                />
              )}
              {node.type.includes(`Family`) && (
                <AtomFamilyItem
                  node={node.item}
                  snapshot={snapshot}
                  input={userInput}
                  family={node.type}
                />
              )}
            </Fragment>
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
