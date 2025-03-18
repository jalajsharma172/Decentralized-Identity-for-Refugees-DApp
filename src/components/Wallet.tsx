import { useEffect } from "react";
import { useWeb3Context } from "../context/useWeb3Context";

import { useNavigate } from "react-router-dom";
const Wallet = () => {

    const { web3State, handleWallet } = useWeb3Context();

    const { selectedAccount } = web3State;
    const navigateTo = useNavigate()

    useEffect(() => {
        if (selectedAccount) {
            
            navigateTo('/dashboard')
        }
    }, [selectedAccount])

    return <button onClick={handleWallet}>Connect Wallet</button>
}
export default Wallet;