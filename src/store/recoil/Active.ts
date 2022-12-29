import {atom} from "recoil";
import {ActiveType} from "../../pages/ActivePasive";

export const selectedActive = atom<ActiveType | undefined>({
  key:'selectedActive',
  default: undefined,
})

export const openEditActive = atom<boolean>({
  key: 'openEditActive',
  default: false
})