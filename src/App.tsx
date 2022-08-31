import type { FC } from 'react'

import { useRecoilValue } from 'recoil'
import styled, { ThemeProvider } from 'styled-components'
import { Portal } from 'react-portal'

import { devThemes } from './styles/themes'
import DevtoolsHeader from './components/Header'
import DevToolsIcon from './components/Icon'
import ResizableContainer from './components/ResizableContainer'
import SettingsPage, {
  recoilDevToolSettingsOpenState,
} from './components/Settings'
import App from './components/List'
import { numberToHex } from './utils/color'
import { devToolsOpenState, recoilDevToolsSettingsState } from './state/storage'
import { globalStyle } from './styles/globalStyle'

const Tools: FC = () => {
  const settingsOpen = useRecoilValue(recoilDevToolSettingsOpenState)
  const { theme, transparency, position, height, vibrancy, fonts, fontSize } =
    useRecoilValue(recoilDevToolsSettingsState)

  return (
    <ThemeProvider theme={devThemes[theme] ?? devThemes[`Light`]}>
      <ResizableContainer>
        <Layer fonts={fonts} fontSize={fontSize}>
          {settingsOpen && <SettingsPage />}
          {!settingsOpen && (
            <>
              <DevtoolsHeader />
              <Inner height={height} position={position}>
                <App />
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
      {isOpen && (
        <Portal>
          <Tools />
        </Portal>
      )}
    </>
  )
}

export default RecoilInspector

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
  ${globalStyle}
  * {
    font-family: ${({ fonts }) => (fonts.length > 0 ? fonts + `,` : ``)}
        'Jetbrains Mono',
      'Dank Mono', 'Courier New', Courier, monospace !important;
    font-size: ${({ fontSize }) => fontSize}px;
  }
  .devtools-badge {
    display: inline-block;
    transform: translateY(-1px);
    margin-right: 5px;
    font-size: ${({ fontSize }) => fontSize / 2 + 2}px;
  }
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 20001;
  width: 100%;
`
const Inner = styled.div<{ height: number; position: string }>`
  overflow-y: overlay;
  overflow-x: overlay;
  width: 100%;
  height: ${({ height, position }) =>
    position === `bottom` ? `${height}px` : `100vh`};
  padding-top: 60px;
  padding-left: 5px;
  top: 0;
`
