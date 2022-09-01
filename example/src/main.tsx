import type { FC } from "react"
import React from "react"

import ReactDOM from "react-dom/client"
import { RecoilRoot, useRecoilValue } from "recoil"

import "./index.css"
import RecoilInspector from "../../src/App"
import Bg from "./bg.jpg"
import { fakeState, fakeState2, fakeState3 } from "./fakeState"
import styled from "styled-components"

const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const Example: FC = () => {
  useRecoilValue(fakeState)
  useRecoilValue(fakeState2)
  useRecoilValue(fakeState3)
  return (
    <Container>
      <RecoilInspector />
      <img src={Bg} />
    </Container>
  )
}

ReactDOM.createRoot(document.getElementById(`root`) as HTMLElement).render(
  <RecoilRoot>
    <React.StrictMode>
      <Example />
    </React.StrictMode>
  </RecoilRoot>
)
