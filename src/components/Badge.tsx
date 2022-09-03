import type { FC } from "react"

import { Mark } from "../styles/Styles"

const Badge: FC<{
  item: unknown[] | object
  isMap: boolean
  isSet: boolean
}> = ({ item, isMap, isSet }) => {
  const itemIsArray = Array.isArray(item)
  const itemIsObject = typeof item === `object` && !itemIsArray
  let length = 0
  if (itemIsArray) length = item.length
  if (itemIsObject) length = Object.keys(item).length
  if (!length) return null
  return (
    <>
      {length > 0 && (
        <Mark>
          <span className="devtools-badge">
            {itemIsArray && !isMap && !isSet && `[${length}]`}
            {itemIsObject && !isMap && !isSet && `{${length}}`}
            {isMap && `Map(${length})`}
            {isSet && `Set(${length})`}
          </span>
        </Mark>
      )}
    </>
  )
}

export default Badge
