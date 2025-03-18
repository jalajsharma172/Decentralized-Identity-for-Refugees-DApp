import { createContext } from "react";
import { Contract } from "ethers";

interface Web3State {
  contractInstance: Contract | null;
  selectedAccount: string | null;
  chainId: number | null;
}

interface Web3ContextType {
  web3State: Web3State;
  handleWallet: () => Promise<void>;
}

export const Web3Context = createContext<Web3ContextType | undefined>(undefined);