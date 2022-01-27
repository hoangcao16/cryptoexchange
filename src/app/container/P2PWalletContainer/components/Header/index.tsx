import {
  Title,
  GroupButton,
  DepositButton,
  NormalButton,
  WalletDirect,
} from './style';
import { ReactComponent as WalletIcon } from 'app/assets/img/wallet.svg';

const FiatSpotHeader = () => {
  return (
    <div className="d-flex justify-content-between py-5 align-items-center position-relative">
      <Title>P2P Wallet</Title>
      <GroupButton>
        <div className="d-flex ">
          <DepositButton>
            <button>Deposit</button>
          </DepositButton>
          <NormalButton href="#" id="spotAccount_top_withdrawal">
            <button data-bn-type="button" className=" css-sl95de">
              Withdraw
            </button>
          </NormalButton>
          <NormalButton
            href="#"
            rel="noopener noreferrer"
            id="spotAccount_top_pay"
          >
            <button>Pay</button>
          </NormalButton>
          <NormalButton id="spotAccount_top_transfer">
            <button>Transfer</button>
          </NormalButton>
          <NormalButton href="#">
            <button>History</button>
          </NormalButton>
          <WalletDirect>
            <NormalButton
              id="spotAccount_top_wallet_direct"
              href="/en/wallet-direct"
              target="_blank"
              className="css-cyve3b"
            >
              <button>
                <WalletIcon />
                Wallet Direct
              </button>
            </NormalButton>
            <div className="bn-tooltip-box">
              <div data-bn-type="text" className="css-1kv8tk2">
                Transfer coins or tokens between Binance.com account and Binance
                Chain Wallet.
              </div>
              <div
                className="bn-tooltip-arrow css-1u9esp9"
                data-popper-arrow="true"
              ></div>
              <i className="gap-fill"></i>
            </div>
          </WalletDirect>
        </div>
      </GroupButton>
    </div>
  );
};
export default FiatSpotHeader;
