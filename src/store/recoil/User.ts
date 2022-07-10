import {atom} from "recoil";

export const UserEmail = atom<string | null>({
  key:'UserEmail',
  default: '',

})