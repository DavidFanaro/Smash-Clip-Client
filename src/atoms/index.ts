import { atom } from "recoil"
import { user } from "../Interfaces/user"

export const userAtom = atom({
  key:'userAtom',
  default: {} as user | null
})

export const isLoggedInAtom = atom({
  key: "isloggedin",
  default: false,
})