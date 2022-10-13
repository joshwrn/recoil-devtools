import type { FC } from "react"
import { useEffect } from "react"

import { Portal } from "react-portal"
import { useRecoilValue, useSetRecoilState } from "recoil"

import { Tools } from "./App"
import DevToolsIcon from "./components/Icon"
import type { Settings } from "./components/Settings"
import { defaultSettingsState, DEFAULT_SETTINGS } from "./components/Settings"
import { devToolsOpenState } from "./state/storage"

export const RecoilInspector: FC<{ defaultSettings?: Partial<Settings> }> = ({
  defaultSettings,
}) => {
  const isOpen = useRecoilValue(devToolsOpenState)
  const setDefaultSettings = useSetRecoilState(defaultSettingsState)
  useEffect(() => {
    setDefaultSettings({ ...DEFAULT_SETTINGS, ...defaultSettings })
  }, [])

  return (
    <Portal>
      <DevToolsIcon />
      {isOpen && <Tools />}
    </Portal>
  )
}
