import type { FC } from "react"
import React from "react"

import ReactDOM from "react-dom/client"
import {
  atom,
  RecoilRoot,
  TransactionInterface_UNSTABLE,
  useRecoilState,
  useRecoilValue,
} from "recoil"

import "./index.css"
import { RecoilInspector } from "../../."
// import Bg from './bg.jpg';
import {
  fakeState,
  fakeState2,
  fakeState3,
  fakeAtomFamily,
  fakeSelectorFamily,
} from "./fakeState"
import styled from "styled-components"

import { useRecoilTransaction_UNSTABLE } from "recoil"

export type TransactionOperation<ARG = undefined, RETURN = void> = (
  transactors: TransactionInterface_UNSTABLE,
  ...rest: ARG extends undefined ? [] : [argument: ARG]
) => RETURN

const integerState = atom({
  key: `integer`,
  default: 0,
})

export const incrementInteger: TransactionOperation = ({ set, get }) => {
  set(integerState, get(integerState) + 1)
}

export const useIncrementInteger = (): VoidFunction =>
  useRecoilTransaction_UNSTABLE(
    (transactors) => () => incrementInteger(transactors)
  )

const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: flex-start;
  align-items: center;
  padding: 100px;
  img {
    width: 100%;
    left: 0;
    top: 0;
    position: absolute;
    z-index: -1;
    height: 100%;
    object-fit: cover;
  }
`

const Example: FC = () => {
  useRecoilValue(fakeState)
  useRecoilValue(fakeState2)
  useRecoilValue(fakeState3)
  useRecoilState(fakeAtomFamily(1))
  useRecoilState(fakeAtomFamily(2))
  useRecoilValue(fakeSelectorFamily([1, 2]))

  const integer = useRecoilValue(integerState)
  const increment = useIncrementInteger()

  return (
    <Container>
      <p style={{ color: "white" }}>{integer}</p>
      <button onClick={increment}>Increment</button>
      <RecoilInspector />
      {/* <img src={Bg} /> */}
    </Container>
  )
}

export default Example
