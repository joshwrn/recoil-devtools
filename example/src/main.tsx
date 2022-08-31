import type { FC } from "react"
import React from "react"

import ReactDOM from "react-dom/client"
import { RecoilRoot, useRecoilValue } from "recoil"

import "./index.css"
import RecoilInspector from "../../src/App"
import Bg from "./bg.jpg"
import { fakeState, fakeState2, fakeState3 } from "./fakeState"

const Example: FC = () => {
  useRecoilValue(fakeState)
  useRecoilValue(fakeState2)
  useRecoilValue(fakeState3)
  return (
    <div>
      <img src={Bg} style={{ width: `100vw`, height: `100vh` }} />
    </div>
  )
}

ReactDOM.createRoot(document.getElementById(`root`) as HTMLElement).render(
  <RecoilRoot>
    <React.StrictMode>
      <div>
        <Example />
        <RecoilInspector />
      </div>
    </React.StrictMode>
  </RecoilRoot>
)
