import type { FC } from "react"
import React from "react"

import { atom, useRecoilValue, useSetRecoilState } from "recoil"
import styled from "styled-components"

import { useOutsideClick } from "../hooks/useOutsideClick"
import { devItemIsOpenState } from "../state/storage"
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
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px 10px;
    border-radius: 3px;
    white-space: nowrap;
    transition: background-color 0.2s;
    color: ${({ theme }) => theme.faintText};
    font-size: 12px;
    cursor: pointer;
    :hover {
      background-color: ${({ theme }) => theme.background + numberToHex(0.5)};
    }
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
  }
`

export const QuickMenuIsOpenState = atom({
  key: `QuickMenuIsOpenState`,
  default: false,
})

const QuickMenu: FC = () => {
  const setItemsOpenState = useSetRecoilState(devItemIsOpenState)
  const setQuickMenuOpenState = useSetRecoilState(QuickMenuIsOpenState)
  if (!useRecoilValue(QuickMenuIsOpenState)) return null
  return (
    <Container>
      <div onClick={() => (setItemsOpenState({}), setQuickMenuOpenState(false))}>
        Close All Atoms
      </div>
    </Container>
  )
}

export default QuickMenu
