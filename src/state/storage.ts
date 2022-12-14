import type { AtomEffect } from "recoil"
import { atom, DefaultValue } from "recoil"

import { defaultSettingsState } from "../components/Settings"

export const localStorageEffect: <T>(key: string) => AtomEffect<T> =
  (key: string) =>
  ({ setSelf, onSet }) => {
    if (typeof window === `undefined`) return
    const savedValue = localStorage.getItem(key)
    if (savedValue !== null) {
      setSelf(JSON.parse(savedValue))
    }
    onSet((newValue) => {
      if (newValue instanceof DefaultValue) {
        localStorage.removeItem(key)
      } else {
        localStorage.setItem(key, JSON.stringify(newValue))
      }
    })
  }

export const settingsState = atom({
  key: `recoilDevToolsSettingsState`,
  default: defaultSettingsState,
  effects: [localStorageEffect(`devToolsSettingsStateStorage`)],
})

export const devToolsOpenState = atom({
  key: `devToolsOpen`,
  default: false,
  effects: [localStorageEffect(`devToolsOpen`)],
})

export const searchState = atom({
  key: `devToolsSearch`,
  default: ``,
  effects: [localStorageEffect(`devToolsSearchState`)],
})

export const openItemsState = atom<Storage>({
  key: `devItemIsOpenState`,
  default: {},
  effects: [localStorageEffect(`devItemIsOpenState`)],
})

interface Storage {
  [key: string]: boolean
}
