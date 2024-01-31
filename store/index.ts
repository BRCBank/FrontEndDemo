import {defineStore} from 'pinia'
import {fetchBalanceForContract, fetchContracts} from "~/utils";
import {da} from "vuetify/locale";

interface Addresses {
  ordinalsAddress: string,
  ordinalsPublicKey: string,
  payAddress: string,
  payPublicKey: string,
}
interface AppState {
  walletAddress: Addresses | null,
  Balance_Ethereum: string,
  Balance_ZeUSD: string,
  Balance_Escrow: string,
  NETWORK_TYPE: number,
  tokenBalances: Map<string, string>,
  tokenContracts: any[],
  swapContracts: any[],
}
interface NetworkInfo {
  NETWORK: string,
  BISON_API_URL: string,
}
export const useStore = defineStore('main', {
  state: () : AppState => ({
    walletAddress: null,
    Balance_Ethereum: '',
    Balance_ZeUSD: '',
    Balance_Escrow: '',
    NETWORK_TYPE: 1,
    tokenBalances: new Map<string,string>,
    tokenContracts: [],
    swapContracts: [],
  }),
  getters: {
    NETWORK_INFO: (state): NetworkInfo => {
      switch (state.NETWORK_TYPE) {
        case 1:
          return {
            NETWORK: 'Mainnet',
            BISON_API_URL: 'https://app.bisonlabs.io/'
          };
        case 2:
          return {
            NETWORK: 'Testnet',
            BISON_API_URL: 'https://testnet.bisonlabs.io/'
          };
        default:
          return {
            NETWORK: 'Mainnet',
            BISON_API_URL: 'https://app.bisonlabs.io/'
          };
      }
    },
  },
  actions: {
    async setWalletAddress(walletAddress: Addresses) {
      this.walletAddress = walletAddress;

      if(this.walletAddress) {
        if(this.tokenContracts.length != 0) {
          await this.updateBalance();
        }else {
          await this.setContractAddresses();
          await this.updateBalance();
        }
      }
    },
    async setContractAddresses() {
      const data = await fetchContracts();
      this.tokenContracts = data.tokenContracts;
      this.swapContracts = data.swapContractsFiltered;
    },
    async updateBalance() {
      if (typeof window === 'undefined') return;
      for (let contract of this.tokenContracts) {
        // @ts-ignore
        this.tokenBalances[contract.tick] = await fetchBalanceForContract(contract);
      }
      console.log(this.tokenBalances);
    },
  },
})
