import "react-app-polyfill/ie11"
import * as React from "react"
import ReactDOM from "react-dom/client"
import Example from "./src/App"

import { RecoilRoot } from "recoil"
import { RecoilInspector } from "../."

const App = () => {
  return (
    <RecoilRoot>
      <React.StrictMode>
        <Example />
        <RecoilInspector />
      </React.StrictMode>
    </RecoilRoot>
  )
}

ReactDOM.createRoot(document.getElementById(`root`) as HTMLElement).render(
  <App />
)
