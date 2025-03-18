import { ReactNode, useEffect, useState } from "react";
import { Web3Context } from "./web3Context";
import { getWeb3State } from "../utils/getWeb3State";
import { handleAccountChange } from "../utils/handleAccountChange";
import { handleChainChange } from "../utils/handleChainChange";
import { Contract } from "ethers";

interface Web3State {
  contractInstance: Contract | null;
  selectedAccount: string | null;
  chainId: number | null;
}

interface Props {
  children: ReactNode;
}

const Web3Provider = ({ children }: Props) => {
  const [web3State, setWeb3State] = useState<Web3State>({
    contractInstance: null,
    selectedAccount: null,
    chainId: null
  });

  const handleWallet = async () => {
    try {
      const { contractInstance, selectedAccount, chainId } = await getWeb3State();
      console.log(contractInstance, selectedAccount, chainId);
      setWeb3State({ contractInstance, selectedAccount, chainId });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      window.ethereum.on('accountsChanged', () => handleAccountChange(setWeb3State));
      window.ethereum.on('chainChanged', () => handleChainChange(setWeb3State));

      return () => {
        window.ethereum.removeListener('accountsChanged', () => handleAccountChange(setWeb3State));
        window.ethereum.removeListener('chainChanged', () => handleChainChange(setWeb3State));
      };
    }
  }, []);

  return (
    <Web3Context.Provider value={{ web3State, handleWallet }}>
      {children}
    </Web3Context.Provider>
  );
};

export default Web3Provider;