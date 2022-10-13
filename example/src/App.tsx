import type { FC } from "react"

import type { TransactionInterface_UNSTABLE } from "recoil"
// eslint-disable-next-line import/order
import {
  atom,
  useRecoilState,
  useRecoilValue,
  useRecoilTransaction_UNSTABLE,
} from "recoil"

import "./index.css"
import styled from "styled-components"

import {
  fakeState,
  undefinedData,
  fakeUsers,
  fakeAtomFamily,
  fakeSelectorFamily,
  setExampleState,
  mapExampleState,
} from "./fakeState"

export type TransactionOperation<ARG = undefined, RETURN = void> = (
  transactors: TransactionInterface_UNSTABLE,
  ...rest: ARG extends undefined ? [] : [argument: ARG]
) => RETURN

const integerState = atom({
  key: `integer`,
  default: 0,
})

export const incrementInteger: TransactionOperation<string> = (
  { set, get },
  operation
) => {
  switch (operation) {
    case `add`:
      set(integerState, get(integerState) + 1)
      break
    case `subtract`:
      set(integerState, get(integerState) - 1)
      break
    case `reset`:
      set(integerState, 0)
      break
    default:
      break
  }
}

export const useIncrementInteger = (operation: string): VoidFunction =>
  useRecoilTransaction_UNSTABLE(
    (transactors) => () => incrementInteger(transactors, operation)
  )

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
`
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
  height: 200px;
  justify-content: center;
  align-items: center;
  padding: 30px;
  background: linear-gradient(to bottom right, #0000002d, #000000c4);
  border-radius: 20px;
  gap: 20px;
  border: 1px solid #ffffff22;
  box-shadow: 0 7px 20px 0px rgba(0, 0, 0, 0.4);
  p {
    font-size: 24px;
    color: #ffffff95;
    font-family: "Roboto", sans-serif;
  }
  button {
    outline: none;
    border: 1px solid #ffffff10;
    background: #00000024;
    border-radius: 10px;
    padding: 10px 20px;
    font-size: 16px;
    font-family: "Roboto", sans-serif;
    cursor: pointer;
    transition: background 0.2s ease-in-out;
    color: #ffffff95;
    &:hover {
      background: #00000036;
    }
  }
  > div {
    display: flex;
    gap: 10px;
    width: 100%;
    justify-content: center;
    align-items: center;
  }
`

const Example: FC = () => {
  useRecoilValue(undefinedData)
  useRecoilValue(fakeState)
  useRecoilValue(fakeUsers)
  useRecoilValue(setExampleState)
  useRecoilValue(mapExampleState)
  useRecoilState(fakeAtomFamily(1))
  useRecoilState(fakeAtomFamily(2))
  useRecoilValue(fakeSelectorFamily([1, 2]))

  const integer = useRecoilValue(integerState)
  const increment = useIncrementInteger(`add`)
  const decrement = useIncrementInteger(`subtract`)
  const reset = useIncrementInteger(`reset`)

  return (
    <Wrapper>
      <Container>
        <p>{integer}</p>
        <div>
          <button onClick={increment}>Increment</button>
          <button onClick={decrement}>Decrement</button>
          <button onClick={reset}>Reset</button>
        </div>
      </Container>
    </Wrapper>
  )
}

export default Example
