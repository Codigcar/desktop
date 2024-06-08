import { createContext } from 'react';
import * as nearAPI from 'near-api-js';

interface ContextProps {
  connectAccount: () => Promise<void>;
  initContract: () => Promise<{
    contract: any;
    currentUser:
      | {
          accountId: any;
          balance: string;
        }
      | undefined;
    nearConnection: nearAPI.Near;
    walletConnectionUser: nearAPI.WalletConnection;
  }>;
}

export const NearContext = createContext({} as ContextProps);
