import {
  Title,
  GroupButton,
  DepositButton,
  NormalButton,
  WalletDirect,
} from './style';
import IconSvg from 'app/assets/img/icon';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const FiatSpotHeader = () => {
  const { t } = useTranslation();
  return (
    <div className="d-flex justify-content-between py-5 align-items-center position-relative">
      <Title>{t('fiat-and-spot')}</Title>
      <GroupButton>
        <div className="d-flex ">
          <DepositButton>
            <Link to={`/wallet/spot/deposit/crypto/BTC`}>{t('deposit')}</Link>
          </DepositButton>
          <NormalButton href="#" id="spotAccount_top_withdrawal">
            <button data-bn-type="button">{t('withdraw')}</button>
          </NormalButton>
          <NormalButton
            href="#"
            rel="noopener noreferrer"
            id="spotAccount_top_pay"
          >
            <button>{t('pay')}</button>
          </NormalButton>
          <NormalButton id="spotAccount_top_transfer">
            <button>{t('transfer')}</button>
          </NormalButton>
          <NormalButton href="#">
            <button>{t('history')}</button>
          </NormalButton>
          <WalletDirect>
            <NormalButton
              id="spotAccount_top_wallet_direct"
              href="/en/wallet-direct"
              target="_blank"
              className="css-cyve3b"
            >
              <button>
                <IconSvg name="wallet" />
                {t('wallet-direct')}
              </button>
            </NormalButton>
            <div className="bn-tooltip-box">
              <div data-bn-type="text" className="css-1kv8tk2">
                {t('wallet-direct-tooltip')}
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
