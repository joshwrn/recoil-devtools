import type { FC } from 'react'

import { prettyPrintJson } from 'pretty-print-json'
import type { RecoilValue } from 'recoil'
import { atom, useRecoilState, useRecoilValue } from 'recoil'
import styled from 'styled-components'

import {
  devToolsSearchState,
  recoilDevToolsOpenItemsState,
  recoilDevToolsSettingsState,
} from './DebugInspector'
import { searchIsFocusedState } from './DevtoolsHeader'

const Atom = styled.pre<{ isOpen: boolean; itemSpacing: number }>`
  width: 100%;
  padding: ${({ itemSpacing }) => itemSpacing}px 10px;
  font-size: 17px;
  display: inline-block;
  justify-self: flex-end;
  .recoilToolDetail {
    cursor: pointer;
    user-select: none;
  }
  pre {
    width: 1000px;
  }
  .devHeadingContainer {
    left: 0px;
    top: 0px;
    border-radius: 20px;
    position: sticky;
    width: fit-content;
    backdrop-filter: blur(10px);
    padding: 0 5px;
    display: inline-block;
    h1 {
      display: inline;
      font-size: 17px;
      margin: 5px 0;
      flex-shrink: 0;
      cursor: pointer;
    }
  }
`

const HeaderLetter = styled.span<{ highlight: boolean; isOpen: boolean }>`
  user-select: none;
  pointer-events: none;
  color: ${({ theme, highlight, isOpen }) =>
    highlight ? theme.boolean : isOpen ? theme.primaryText : theme.faintText};
  transition: color 0.3s;
`

const parseParamToJson = (param: string) => {
  let parsable = param
  if (param === undefined) {
    return ``
  }
  if (param[0] === `"`) {
    parsable = param.slice(1, -1)
  }
  return prettyPrintJson.toHtml(parsable)
}

const DevToolItem: FC<{
  node: RecoilValue<unknown>
  param: string
  data: JSON
}> = ({ node, param, data }) => {
  const { itemSpacing } = useRecoilValue(recoilDevToolsSettingsState)
  const [openItems, setOpenItems] = useRecoilState(recoilDevToolsOpenItemsState)
  const searchIsFocused = useRecoilValue(searchIsFocusedState)
  const currentSearch = useRecoilValue(devToolsSearchState)

  const key = node.key.split(`__`)[0]
  if (openItems[node.key] === undefined) {
    setOpenItems((prev) => ({
      ...prev,
      [node.key]: data !== Object(data) && data !== null,
    }))
  }
  const isOpen = openItems[node.key] === true
  const setIsOpen = () => {
    setOpenItems((prev) => ({
      ...prev,
      [node.key]: !prev[node.key],
    }))
  }

  return (
    <Atom key={node.key} isOpen={isOpen} itemSpacing={itemSpacing}>
      <div className="devHeadingContainer">
        <h1 onClick={setIsOpen}>
          {key.split('').map((letter, index) => {
            const highlightLetter =
              searchIsFocused &&
              currentSearch.toLowerCase().includes(letter.toLowerCase())
            return (
              <HeaderLetter
                key={key + letter + index}
                isOpen={isOpen}
                highlight={highlightLetter}
              >
                {letter}
              </HeaderLetter>
            )
          })}
          {isOpen && `: `}
        </h1>
      </div>
      {param && (
        <span onClick={setIsOpen} className="recoilToolDetail">
          <output
            dangerouslySetInnerHTML={{
              __html: parseParamToJson(param),
            }}
          />
          <span>{`: `}</span>
        </span>
      )}
      {isOpen && (
        <output
          dangerouslySetInnerHTML={{
            __html: prettyPrintJson.toHtml(data, { indent: 2 }),
          }}
        />
      )}
    </Atom>
  )
}

export default DevToolItem
