import { generateTransaction, toastMessage } from '@utils';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import {
  CSSProperties,
  Dispatch,
  FC,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import { NearContext } from '@contexts/near/NearContext';
import MyAlgoConnect from '@randlabs/myalgo-connect';
import Big from 'big.js';
import { IProjectAccepted } from '@interfaces/index';
import { dataUserUpdate } from '@contexts/user-profile';
import { useRouter } from 'next/router';
import { SyncLoader } from 'react-spinners';
import { KeyedMutator, ScopedMutator } from 'swr/dist/types';

interface IProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  algoAddress: string | null | undefined;
  nearWallet: string | null | undefined;
  type: string;
  id: string;
  talentId: string;
  addNearTransaction: (
    idApplication: number,
    nearTransaction: string
  ) => Promise<{
    hasError: boolean;
    message?: string | undefined;
    data?: IProjectAccepted | undefined;
  }>;
  addAlgorantTransaction: (
    idApplication: number,
    algorandTransaction: string
  ) => Promise<{
    hasError: boolean;
    message?: string | undefined;
    data?: IProjectAccepted | undefined;
  }>;
  saveAlgoAddress: (algoAddress: dataUserUpdate) => Promise<{
    hasError: boolean;
    message: string;
  }>;
  saveNearWallet: (dataUserUpdate: dataUserUpdate) => Promise<{
    hasError: boolean;
    message: string;
  }>;
  idApplication: number;
  mutate: KeyedMutator<any>;
  userUUID?: string | undefined;
  near_transaction: string | null | undefined;
  algorand_transaction: string | null | undefined;
}
interface ConnectionSettings {
  shouldSelectOneAccount?: boolean;
  openManager?: boolean;
}
export const ModalValidate: FC<IProps> = ({
  setIsOpen,
  algoAddress,
  nearWallet,
  type,
  id,
  talentId,
  addAlgorantTransaction,
  addNearTransaction,
  near_transaction,
  algorand_transaction,
  saveAlgoAddress,
  saveNearWallet,
  idApplication,
  mutate,
  userUUID,
}) => {
  const override: CSSProperties = {
    display: 'block',
    margin: '0 auto',
    borderColor: 'red',
  };
  const { t: tp } = useTranslation('postulation');
  const { t: tpro } = useTranslation('profile');
  const [validateAlgorant, setValidateAlgorant] = useState(false);
  const [validateNear, setValidateNear] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { initContract, connectAccount } = useContext(NearContext);

  const NearWalletTransaction = async () => {
    setIsLoading(true);
    const { walletConnectionUser } = await initContract();
    const responseValidation = await walletConnectionUser
      .account()
      .functionCall(
        process.env.NEXT_PUBLIC_CONTRACT_NAME!,
        'addRegisterValidation',
        {
          talentId: talentId,
          typePublish: type,
          id: id,
        }
      );
    addNearTransaction(idApplication, responseValidation.transaction.hash);
    mutate();
    // if (type === 'P') {
    //   mutate && mutate(`/project_applications/${userUUID}`);
    // }
    // if (type === 'J') {
    //   mutate(`/job_applications/${userUUID}`);
    // }
    setIsLoading(false);
  };
  const myAlgoWallet = new MyAlgoConnect();
  const connectToMyAlgo = async () => {
    try {
      const settings: ConnectionSettings = {
        shouldSelectOneAccount: false,
        openManager: true,
      };
      const accounts = await myAlgoWallet.connect(settings);
      const addresses = accounts.map((account) => account.address);
      const dataUserUpdate = {
        algo_address: addresses[0],
      };
      await saveAlgoAddress(dataUserUpdate);
    } catch (err) {
      throw err;
    }
  };
  useEffect(() => {
    if (near_transaction) {
      setValidateNear(true);
    }
    if (algorand_transaction) {
      setValidateAlgorant(true);
    }
  }, [near_transaction, algorand_transaction]);

  return (
    <div className="darkBG">
      <form
        className="centered"
        // onSubmit={methodsExperience.handleSubmit(onSubmitExperience)}
      >
        <div className="modal-header">
          <h1 className="title-modal">{tp('modal-validate-title')}</h1>
          <button type="button" onClick={() => setIsOpen(false)}>
            X
          </button>
        </div>
        <p className="subtitle-modal">{tp('modal-validate-body')}</p>
        <div className="modal-body">
          <div className="modal-body__row">
            <div className="modal-body__card">
              <div>
                <Image
                  src="/images/icon-algorant.png"
                  alt="icon Algorants"
                  height={50}
                  width={50}
                />
              </div>
              <div className="modal-body__card__description">
                <strong>Algorand</strong>
                <p className="text-conecction">{tpro('disconnect')}</p>
              </div>
            </div>
            {!algoAddress && !localStorage.getItem('isConnectAlgorand') ? (
              <button
                className="btn btn--stroke"
                onClick={async (e) => {
                  e.preventDefault();
                  connectToMyAlgo();
                }}
              >
                {tp('modal-validate-connect')}
              </button>
            ) : !validateAlgorant ? (
              <button
                className="btn btn--primary"
                onClick={async (e) => {
                  e.preventDefault();
                  const transaction = await generateTransaction(
                    algoAddress!,
                    type,
                    id,
                    tp('dont-avaliable-balance')
                  )
                    .then((txn) => {
                      return txn;
                    })
                    .catch((error) => {
                      toastMessage('error', tp("error-validation"));
                      return null;
                    });
                  if (!transaction) {
                    return;
                  }
                  setValidateAlgorant(true);
                  await addAlgorantTransaction(
                    idApplication,
                    transaction?.txId
                  );
                  if (type === 'J') {
                    mutate && mutate(`/job_applications/${userUUID}`);
                  }
                }}
              >
                {tp('modal-validate-validate')}
              </button>
            ) : (
              <a
                className="btn btn--active"
                style={{
                  display: 'flex',

                  alignContent: 'center',
                }}
                href={`${process.env.NEXT_PUBLIC_ALGORAND_EXPLORER}${algorand_transaction}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div style={{ marginRight: '8px', display: 'flex' }}>
                  <Image
                    src={'/images/algorand.svg'}
                    width={30}
                    height={30}
                    alt="icon near"
                  />
                </div>

                {tp('validate')}
              </a>
            )}
          </div>
          <div className="modal-body__row">
            <div className="modal-body__card">
              <div>
                <Image
                  src="/images/icon-NearProtocol.png"
                  alt="icon Algorants"
                  height={50}
                  width={50}
                />
              </div>
              <div className="modal-body__card__description">
                <strong>Near Protocol</strong>
                <p className="text-conecction">{tpro('disconnect')}</p>
              </div>
            </div>
            {!localStorage.getItem('darshana_wallet_auth_key') ||
            !nearWallet ? (
              <button
                className="btn btn--stroke"
                onClick={async (e) => {
                  e.preventDefault();
                  connectAccount();
                }}
              >
                {tp('modal-validate-connect')}
              </button>
            ) : !validateNear ? (
              <button
                className="btn btn--primary"
                onClick={async (e) => {
                  e.preventDefault();
                  await NearWalletTransaction();
                  setValidateNear(true);
                }}
              >
                {isLoading ? (
                  <SyncLoader
                    color={'#FFFFFF'}
                    size={8}
                    margin={5}
                    speedMultiplier={1}
                    css={'display:block;margin:10px'}
                  />
                ) : (
                  tp('modal-validate-validate')
                )}
              </button>
            ) : (
              <a
                className="btn btn--active"
                style={{
                  display: 'flex',

                  alignContent: 'center',
                }}
                href={`${process.env.NEXT_PUBLIC_ALGORAND_EXPLORER}${algorand_transaction}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div style={{ marginRight: '16px', display: 'flex' }}>
                  <Image
                    src={'/images/icon-NearProtocol.png'}
                    width={24}
                    height={24}
                    alt="icon near"
                  />
                </div>

                {tp('validate')}
              </a>
            )}
          </div>
          <p className="connect-algorand">{tpro('algorand-connect')}</p>
        </div>
      </form>
    </div>
  );
};
