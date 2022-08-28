import React, { FC } from 'react'

const Converter: FC<{ list: string[] }> = ({ list }) => {
  const jsxArr = []
  for (const item of list) {
    const el = React.createElement('div', { key: item }, item)
    jsxArr.push(el)
  }
  return <>{jsxArr}</>
}

export default Converter
