import {atom} from "recoil";
import {ActiveType} from "../../pages/ActivePasive";

export const selectedPassive = atom<ActiveType | undefined>({
  key:'selectedPassive',
  default: undefined,
})

export const openEditPassive = atom<boolean>({
  key: 'openEditPassive',
  default: false
})