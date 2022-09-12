import type { FC } from "react"

import { Mark } from "../styles/Styles"

const Badge: FC<{
  item: unknown[] | object
  isMap?: boolean
  isSet?: boolean
  isAtomFamily?: boolean
  isSelectorFamily?: boolean
}> = ({ item, isMap, isSet, isAtomFamily, isSelectorFamily }) => {
  const itemIsArray = Array.isArray(item)
  const itemIsObject = typeof item === `object` && !itemIsArray
  let length = 0
  if (!item || item instanceof Date) return null
  if (itemIsArray) length = item.length
  if (itemIsObject) length = Object.keys(item).length

  let badge = null
  if (isMap) {
    badge = `Map(${length})`
  } else if (isSet) {
    badge = `Set(${length})`
  } else if (isAtomFamily) {
    badge = `AtomFamily(${length})`
  } else if (isSelectorFamily) {
    badge = `SelectorFamily(${length})`
  } else if (itemIsArray) {
    badge = `[${length}]`
  } else if (itemIsObject) {
    badge = `{${length}}`
  }

  if (!badge) return null
  return (
    <Mark>
      <span className="devtools-badge">{badge}</span>
    </Mark>
  )
}

export default Badge
