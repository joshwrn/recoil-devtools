import type { FC } from "react"

import { Portal } from "react-portal"
import { useRecoilValue } from "recoil"

import { Tools } from "./App"
import DevToolsIcon from "./components/Icon"
import { devToolsOpenState } from "./state/storage"

export const RecoilInspector: FC = () => {
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
