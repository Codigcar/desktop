import algosdk from 'algosdk';
import MyAlgoConnect from '@randlabs/myalgo-connect';
import { toastMessage } from '@utils';

const nodoAlgorand = process.env.NEXT_PUBLIC_NODO_ALGORANT;

const algodClient = new algosdk.Algodv2('', nodoAlgorand, '');
export const generateTransaction = async (
  algoAddress: string,
  type: string,
  id: string,
  messageError: string
) => {
  try {
    const params = await algodClient.getTransactionParams().do();
    let names = { type: type, id: id };
    const enc = new TextEncoder();
    const note = enc.encode(JSON.stringify(names));
    const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
      suggestedParams: {
        ...params,
      },
      from: algoAddress,
      to: algoAddress,
      amount: 0,
      note: note,
    });
    const myAlgoConnect = new MyAlgoConnect();

    const signedTxn = await myAlgoConnect.signTransaction(txn.toByte());
    let accountInfo = await algodClient.accountInformation(algoAddress).do();
    if (accountInfo.amount < 1000) {
      return toastMessage('error', messageError);
    }
    return algodClient
      .sendRawTransaction(signedTxn.blob)
      .do()
      .then((txn) => {
        return txn;
        // { txId: "IMXOKHFRXGJUBDNOHYB5H6HASYACQ3PE5R6VFWLW4QHARFWLTVTQ" }
      });
  } catch (error) {
    throw error;
  }
};
