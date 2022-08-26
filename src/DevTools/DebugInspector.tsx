import type { FC } from 'react'

import { AtomEffect, useRecoilState } from 'recoil'
import { DefaultValue, atom, useRecoilSnapshot, useRecoilValue } from 'recoil'
import styled, { ThemeProvider } from 'styled-components'
import Fuse from 'fuse.js'

import { devThemes, JsonColors } from './DevThemes'
import DevToolItem from './DevToolItem'
import DevtoolsHeader from './DevtoolsHeader'
import DevToolsIcon from './DevToolsIcon'
import ResizableContainer from './ResizableContainer'
import SettingsPage, { recoilDevToolSettingsOpenState } from './SettingsPage'

export const numberToHex = (n: number): string => {
  return Math.floor((1 - n) * 255).toString(16)
}

const Backdrop = styled.div<{ transparency: number; vibrancy: number }>`
  position: absolute;
  background: ${({ theme, transparency }) =>
    `${theme.background}${numberToHex(transparency)}`};
  backdrop-filter: blur(
    ${({ vibrancy, transparency }) =>
      vibrancy && transparency ? vibrancy : 0}px
  );
  pointer-events: none;
  z-index: 20000;
  height: 100%;
  width: 100%;
`
const Layer = styled.div<{ fonts: string; fontSize: number }>`
  * {
    margin: 0;
    outline: none;
    border: none;
    box-sizing: border-box;
  }
  * {
    font-family: sans-serif;
  }
  pre {
    * {
      font-family: ${({ fonts }) => (fonts.length > 0 ? fonts + `,` : ``)}
          'Jetbrains Mono',
        'Dank Mono', 'Courier New', Courier, monospace !important;
      font-size: ${({ fontSize }) => fontSize}px !important;
    }
    pre {
      width: 100%;
      &.param {
        font-style: italic;
        opacity: 0.75;
      }
    }
  }
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 20001;
  width: 100%;
`
const Inner = styled.div<{ height: number; position: string }>`
  ${JsonColors}
  overflow-y: overlay;
  overflow-x: overlay;
  width: 100%;
  height: ${({ height, position }) =>
    position === `bottom` ? `${height}px` : `100vh`};
  padding-top: 60px;
  top: 0;
`

export const localStorageEffect: <T>(key: string) => AtomEffect<T> =
  (key: string) =>
  ({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem(key)
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue))
    }
    onSet((newValue) => {
      if (newValue instanceof DefaultValue) {
        localStorage.removeItem(key)
      } else {
        localStorage.setItem(key, JSON.stringify(newValue))
      }
    })
  }

export const recoilDevToolsSettingsState = atom({
  key: `recoilDevToolsSettingsState`,
  default: {
    position: `right`,
    theme: `Light`,
    width: 430,
    height: 430,
    transparency: 0,
    vibrancy: 30,
    fonts: ``,
    fontSize: 16,
    itemSpacing: 5,
  },
  effects: [localStorageEffect(`devToolsSettingsStateStorage`)],
})

export const devToolsOpenState = atom({
  key: `devToolsOpen`,
  default: false,
  effects: [localStorageEffect(`devToolsOpen`)],
})

export const devToolsSearchState = atom({
  key: `devToolsSearch`,
  default: ``,
  effects: [localStorageEffect(`devToolsSearchState`)],
})

interface Storage {
  [key: string]: boolean
}

export const recoilDevToolsOpenItemsState = atom<Storage>({
  key: `recoilDevToolsOpenItemsState`,
  default: {},
  effects: [localStorageEffect(`devToolsOpenItemsStateStorage`)],
})

const Tools: FC = () => {
  const settingsOpen = useRecoilValue(recoilDevToolSettingsOpenState)
  const { theme, transparency, position, height, vibrancy, fonts, fontSize } =
    useRecoilValue(recoilDevToolsSettingsState)
  const userInput = useRecoilValue(devToolsSearchState)

  const snapshot = useRecoilSnapshot()

  snapshot.retain()

  const list = Array.from(snapshot.getNodes_UNSTABLE())
  const options = {
    keys: [`key`],
    includeScore: true,
    isCaseSensitive: false,
  }
  const fuse = new Fuse(list, options)

  return (
    <ThemeProvider theme={devThemes[theme] ?? devThemes[`Light`]}>
      <ResizableContainer>
        <Layer fonts={fonts} fontSize={fontSize}>
          {settingsOpen && <SettingsPage />}
          {!settingsOpen && (
            <>
              <DevtoolsHeader />
              <Inner height={height} position={position}>
                <>
                  {fuse.search(userInput).map((item) => {
                    const node = item.item
                    const param = node.key.split(`__`)[1]
                    const { contents } = snapshot.getLoadable(node)
                    const data =
                      contents instanceof Set ? Array.from(contents) : contents

                    return (
                      <DevToolItem
                        key={node.key}
                        node={node}
                        param={param}
                        data={data}
                      />
                    )
                  })}
                </>
              </Inner>
            </>
          )}
        </Layer>
        <Backdrop transparency={transparency} vibrancy={vibrancy} />
      </ResizableContainer>
    </ThemeProvider>
  )
}

const RecoilInspector: FC = () => {
  const isOpen = useRecoilValue(devToolsOpenState)
  return (
    <>
      <DevToolsIcon />
      {isOpen && <Tools />}
    </>
  )
}

export default RecoilInspector
