import { atom } from "recoil";

const balanceAtom = atom<number>({
    default:0,
    key:"balance"
})

export {balanceAtom}