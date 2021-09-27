import * as C from 'purify-ts/Codec'
import * as Util from '../Util'

export enum DarkMode {
  DEFAULT = 'default',
  LIGHT = 'light',
  DARK = 'dark',
}
export const DarkModeCodec = C.enumeration(DarkMode)

export const SettingsCodec = Util.dexieJsonCodec(p => C.Codec.interface({
  updatedAt: p.date,
  darkMode: DarkModeCodec,
}))
export type Settings = C.GetType<typeof SettingsCodec.Json>

export const initSettings: () => Settings = () => ({
  updatedAt: new Date(),
  darkMode: DarkMode.DEFAULT,
})
