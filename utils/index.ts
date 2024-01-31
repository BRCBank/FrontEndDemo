import {useStore} from "~/store";
import {signMessage} from "sats-connect";
import type {SignMessageOptions} from "sats-connect";

export interface LoanData {
  loanIndex: string,
  borrowerAddress: string,
  durationDays: string,
  interestRate: string,
  debtAmount: string,
  colAmount: string,
  colToken: string,
  lenderAddress?: string,
  startDate?: string,
  endDate?: string,
  isLend?: boolean
  isTimeOver?: boolean
}

export interface LoanRequestData {
  tokenType: string;
  tokenAmount: number;
  loanAmount: number;
  interestRate: number;
  duration: number;
}

export function shortenWallet(input: string){
  return input.slice(0,6) + '...' +input.slice(input.length -4, input.length);
}

export const signMessageAndEnqueueTransaction = async (messageObj: any) => {
  const store = useStore();
  const { walletAddress, NETWORK_INFO } = store;

  const nonceResponse = await fetch(`${NETWORK_INFO.BISON_API_URL}/sequencer_endpoint/nonce/${walletAddress?.ordinalsAddress}`);
  const nonceData = await nonceResponse.json();

  messageObj.nonce = nonceData.nonce + 1;

  const gasResponse = await fetch(`${NETWORK_INFO.BISON_API_URL}/sequencer_endpoint/gas_meter`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(messageObj),
  });
  const gasData = await gasResponse.json();

  messageObj.gas_estimated = gasData.gas_estimated;
  messageObj.gas_estimated_hash = gasData.gas_estimated_hash;

  const signMessageOptions = {
    payload: {
      network: {
        type: NETWORK_INFO.NETWORK,
      },
      address: walletAddress?.ordinalsAddress,
      message: JSON.stringify(messageObj),
    },
    onFinish: (response: string) => {
      messageObj.sig = response;
      //TODO to real transaction for Enque, uncomment below line

      // onSendMessageClick(messageObj);
    },
    onCancel: () => alert("Canceled"),
  };

  await signMessage(<SignMessageOptions>signMessageOptions);
}

const onSendMessageClick = async (signedMessage: any) => {
  const store = useStore();
  const { NETWORK_INFO } = store;

  // Make a HTTP POST request to /enqueue_transaction
  await fetch(`${NETWORK_INFO.BISON_API_URL}/sequencer_endpoint/enqueue_transaction`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(signedMessage),
  })
    .then(response => response.json())
    .then(data => {
      alert(JSON.stringify(data));
      store.updateBalance();
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

export const fetchContracts = async () => {
  const store = useStore();
  const { NETWORK_INFO } = store;

  const response = await fetch(`${NETWORK_INFO.BISON_API_URL}/sequencer_endpoint/contracts_list`);
  const data = await response.json();

  // Filter contracts that are of type "Token"
  // @ts-ignore
  const tokenContracts = data.contracts.filter(contract => contract.contractType === "Token");

  // Filter contracts that are of type "SWAP"
  // @ts-ignore
  const swapContractsFiltered = data.contracts.filter(contract => contract.contractType === "SWAP");
  // Fetch the balance for each token contract

  return {
    tokenContracts, swapContractsFiltered
  }
}


export const fetchBalanceForContract = async (contract: any) => {
  try{

  const store = useStore();
  const { walletAddress } = store;

  if(!walletAddress) return;
  const url = `${contract.contractEndpoint}/balance`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ address: walletAddress.ordinalsAddress }),
  });
  const responseJson = await response.json();
  // console.log(responseJson);
  // console.log({[contract.tick]: responseJson.balance})
  // setTokenBalances(prevTokenBalances => ({
  //   ...prevTokenBalances,
  //   [contract.tick]: data.balance
  // }));
  return responseJson.balance;
  }catch (e) {
    console.log(e);
    return ''
  }
}
