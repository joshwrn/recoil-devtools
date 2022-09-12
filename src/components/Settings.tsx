import type { FC } from "react"

import { atom, useRecoilState, useSetRecoilState } from "recoil"
import styled from "styled-components"

import { recoilDevToolsSettingsState } from "../state/storage"
import { devThemes } from "../styles/themes"
import { HANDLE_SIZE } from "./ResizableContainer"
/* eslint-disable max-lines */

export const DEFAULT_SETTINGS = {
  position: `right`,
  theme: `Github Dark`,
  width: 430,
  height: 430,
  transparency: 0,
  vibrancy: 30,
  fonts: ``,
  fontSize: 14,
}

const Container = styled.div<{
  height: number
  position: string
  fontSize: number
}>`
  * {
    font-size: 16px !important;
  }
  display: flex;
  position: relative;
  flex-direction: column;
  width: 100%;
  padding: 20px;
  align-items: flex-start;
  overflow: auto;
  height: ${({ height, position }) =>
    position === `bottom` ? `${height}px` : `100vh`};
  max-height: ${({ position }) =>
    position === `bottom` ? `calc(100vh - ${HANDLE_SIZE}px)` : `100vh`};
  gap: 20px;
  .devSettingsTop {
    display: flex;
    align-items: center;
    width: 100%;
    border-bottom: 1px solid ${({ theme }) => theme.faintOutline};
    padding-bottom: 10px;
    div {
      display: flex;
      align-items: center;
      cursor: pointer;
      gap: 10px;
    }
    p {
      font-weight: 500;
      color: ${({ theme }) => theme.faintText};
    }
    svg {
      width: ${({ fontSize }) => fontSize}px;
      height: ${({ fontSize }) => fontSize}px;
    }
    path {
      fill: ${({ theme }) => theme.faintText};
    }
  }
`
const Option = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  border-bottom: 1px dashed ${({ theme }) => theme.faintOutline};
  padding: 5px 0;
  label {
    font-weight: 700;
    color: ${({ theme }) => theme.text};
  }
  select {
    color: ${({ theme }) => theme.faintText};
    font-weight: 600;
    cursor: pointer;
    padding-bottom: 5px;
  }
  option {
    background: ${({ theme }) => theme.background};
  }
  input,
  select {
    width: 50%;
    max-width: 400px;
    min-width: 135px;
    background: none;
  }
  input[type="range"] {
    cursor: pointer;
    -webkit-appearance: none;
    border-radius: 20px;
    background: ${({ theme }) => theme.faintOutline};
    outline: 1px solid ${({ theme }) => theme.faintText}40;
    opacity: 0.7;
    -webkit-transition: 0.2s;
    transition: opacity 0.2s;
    ::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 17px;
      height: 17px;
      border-radius: 50%;
      background: ${({ theme }) => theme.primaryText};
      cursor: pointer;
    }
    &:disabled {
      cursor: not-allowed;
      ::-webkit-slider-thumb {
        cursor: not-allowed;
        background: ${({ theme }) => theme.faintText};
      }
    }
  }
  input[type="text"],
  input[type="number"] {
    padding-left: 5px;
    color: ${({ theme }) => theme.faintText};
    font-weight: 600;
    padding-bottom: 5px;
    ::placeholder {
      color: ${({ theme }) => theme.faintText};
    }
  }
`
const Footer = styled.footer`
  display: flex;
  width: 100%;
  justify-content: center;
  position: absolute;
  z-index: 100;
  bottom: 0;
  right: 0;
  padding-bottom: 30px;
`
const ResetButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 200px;
  height: 30px;
  position: relative;
  background-color: ${({ theme }) => theme.iconBackground};
  border: 1px solid ${({ theme }) => theme.faintOutline};
  color: ${({ theme }) => theme.faintText};
  border-radius: 5px;
`

export interface DevToolSettings {
  position: string
  transparency: number
  theme: string
  width: number
  height: number
  vibrancy: number
  fonts: string
  fontSize: number
}

export const recoilDevToolSettingsOpenState = atom({
  key: `devToolSettingsOpen`,
  default: false,
})

const SettingsPage: FC = () => {
  const [
    { position, theme, transparency, vibrancy, fonts, fontSize, height },
    setSettings,
  ] = useRecoilState(recoilDevToolsSettingsState)

  const setOpen = useSetRecoilState(recoilDevToolSettingsOpenState)
  return (
    <Container height={height} position={position} fontSize={fontSize}>
      <div className="devSettingsTop">
        <div onClick={() => setOpen(false)}>
          <p>Back</p>
        </div>
      </div>
      <Option>
        <label>Position</label>
        <select
          value={position}
          onChange={(e) =>
            setSettings((prev: DevToolSettings) => ({
              ...prev,
              position: e.target.value,
            }))
          }
        >
          <option value="left">Left</option>
          <option value="right">Right</option>
          <option value="bottom">Bottom</option>
        </select>
      </Option>
      <Option>
        <label>Theme</label>
        <select
          value={theme}
          onChange={(e) =>
            setSettings((prev: DevToolSettings) => ({
              ...prev,
              theme: e.target.value,
            }))
          }
        >
          {Object.keys(devThemes).map((theme) => (
            <option key={theme} value={theme}>
              {theme}
            </option>
          ))}
        </select>
      </Option>
      <Option>
        <label>Fonts</label>
        <input
          value={fonts}
          placeholder="Monospace"
          type="text"
          onChange={(e) =>
            setSettings((prev: DevToolSettings) => ({
              ...prev,
              fonts: e.target.value.replace(/[^a-zA-Z0-9, ]/g, ``),
            }))
          }
        />
      </Option>
      <Option>
        <label>Font Size</label>
        <input
          value={fontSize}
          type="number"
          min={10}
          max={20}
          onChange={(e) =>
            setSettings((prev: DevToolSettings) => ({
              ...prev,
              fontSize: Number(e.target.value),
            }))
          }
        />
      </Option>
      <Option>
        <label>Transparency</label>
        <input
          type="range"
          min="0"
          step="0.01"
          max=".5"
          value={transparency}
          onChange={(e) =>
            setSettings((prev: DevToolSettings) => ({
              ...prev,
              transparency: Number(e.target.value),
            }))
          }
        />
      </Option>
      <Option>
        <label>Vibrancy</label>
        <input
          type="range"
          min="0"
          step="1"
          max="50"
          value={vibrancy}
          disabled={transparency === 0}
          onChange={(e) =>
            setSettings((prev: DevToolSettings) => ({
              ...prev,
              vibrancy: Number(e.target.value),
            }))
          }
        />
      </Option>
      <Footer>
        <ResetButton
          onClick={() => {
            setSettings(DEFAULT_SETTINGS)
          }}
        >
          <p>Reset All</p>
        </ResetButton>
      </Footer>
    </Container>
  )
}

export default SettingsPage
