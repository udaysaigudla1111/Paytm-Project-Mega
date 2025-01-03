import { useRecoilValue } from "recoil";
import { balanceAtom } from "../atoms/balance";

const useBalance = ()=>{
    const balance = useRecoilValue<number>(balanceAtom);
    return balance;
}

export {useBalance} 