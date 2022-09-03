import type { FC } from "react"

import { CgDockBottom, CgDockLeft, CgDockRight } from "react-icons/cg"
import { VscCloseAll } from "react-icons/vsc"
import { atom, useRecoilValue, useSetRecoilState } from "recoil"
import styled from "styled-components"

import {
  devItemIsOpenState,
  recoilDevToolsSettingsState,
} from "../state/storage"
import { numberToHex } from "../utils/color"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  width: fit-content;
  height: fit-content;
  border: 1px solid ${({ theme }) => theme.faintOutline} !important;
  border-radius: 4px;
  padding: 8px;
  top: 130%;
  right: 10%;
  gap: 8px;
  background-color: ${({ theme }) => theme.headerBackground};
  ::before {
    content: "";
    content: "";
    position: absolute;
    bottom: 100%;
    right: 4px;
    margin-left: -5px;
    border-width: 7px;
    border-style: solid;
    border-color: transparent transparent ${({ theme }) => theme.faintOutline}
      transparent;
  }
  ::after {
    content: "";
    content: "";
    position: absolute;
    bottom: 100%;
    right: 6px;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent transparent
      ${({ theme }) => theme.headerBackground} transparent;
  }
`

export const QuickMenuIsOpenState = atom({
  key: `QuickMenuIsOpenState`,
  default: false,
})

const Item = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
  align-items: center;
  padding: 5px 10px;
  border-radius: 3px;
  white-space: nowrap;
  transition: background-color 0.2s;
  color: ${({ theme }) => theme.faintText};
  font-size: 12px;
  cursor: pointer;
  background-color: ${({ theme }) => theme.iconBackground + numberToHex(0.8)};
  svg {
    transform: translateY(-1px);
    font-size: 15px;
  }
  :hover {
    background-color: ${({ theme }) => theme.iconBackground + numberToHex(0.3)};
  }
`
const PositionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 3px 10px 0 10px;
  border-radius: 3px;
  svg {
    width: 100%;
    height: 100%;
  }
  path {
    fill: ${({ theme }) => theme.faintText};
  }
`
const PositionIcon = styled.div`
  cursor: pointer;
  width: 25px;
  height: 22px;
  :hover {
    path {
      fill: ${({ theme }) => theme.primaryText};
    }
  }
`

const QuickMenu: FC = () => {
  const setItemsOpenState = useSetRecoilState(devItemIsOpenState)
  const setQuickMenuOpenState = useSetRecoilState(QuickMenuIsOpenState)
  const settings = useSetRecoilState(recoilDevToolsSettingsState)
  if (!useRecoilValue(QuickMenuIsOpenState)) return null
  return (
    <Container>
      <PositionContainer>
        <PositionIcon>
          <CgDockLeft
            onClick={() => {
              settings((prev) => ({ ...prev, position: `left` }))
              setQuickMenuOpenState(false)
            }}
          />
        </PositionIcon>
        <PositionIcon>
          <CgDockBottom
            onClick={() => {
              settings((prev) => ({ ...prev, position: `bottom` }))
              setQuickMenuOpenState(false)
            }}
          />
        </PositionIcon>
        <PositionIcon>
          <CgDockRight
            onClick={() => {
              settings((prev) => ({ ...prev, position: `right` }))
              setQuickMenuOpenState(false)
            }}
          />
        </PositionIcon>
      </PositionContainer>

      <Item
        onClick={() => (setItemsOpenState({}), setQuickMenuOpenState(false))}
      >
        <VscCloseAll />
        Close All Atoms
      </Item>
    </Container>
  )
}

export default QuickMenu
