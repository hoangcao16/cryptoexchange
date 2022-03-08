/* eslint-disable react-hooks/exhaustive-deps */
import { StyledSelect, CoinModal, NetworkModal } from './style';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import UpDownIcon from 'app/assets/img/UpDownIcon';
import IconSvg from 'app/assets/img/icon';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useDepositCryptoSlice } from './slice';
import { selectDepositCrypto } from './slice/selectors';
const DepositSection = () => {
  const { t } = useTranslation();
  const [isCoinModalVisible, setIsCoinModalVisible] = useState(false);
  const [isNetworkModalVisible, setIsNetworkModalVisible] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState({});
  const { currency } = useParams();
  const dispatch = useDispatch();
  const { actions } = useDepositCryptoSlice();
  const { selectedCoin }: any = useSelector(selectDepositCrypto);
  useEffect(() => {
    dispatch(actions.getCoinRequest({ coin: currency }));
  }, []);
  const showCoinModal = () => {
    setIsCoinModalVisible(true);
  };
  const handleCoinModalCancel = () => {
    setIsCoinModalVisible(false);
  };
  const showNetworkModal = () => {
    setIsNetworkModalVisible(true);
  };
  const handleNetworkModalCancel = () => {
    setIsNetworkModalVisible(false);
  };
  return (
    <>
      <div>
        <StyledSelect>
          <div className="select-title">{t('select-coin')}</div>
          <div className="select">
            <div className="select--label">{t('coin')}</div>
            <div className="select--input" onClick={showCoinModal}>
              <div className="selected--wrapper">
                <div className="selected">
                  <img src={selectedCoin?.icon} width="24" height="24" />
                  <div className="selected-information">
                    <span className="selected-name">
                      {selectedCoin?.assetName}
                    </span>
                    <span className="selected-desc">{selectedCoin?.note}</span>
                  </div>
                </div>
              </div>
              <UpDownIcon name="down" className="down-icon" />
            </div>
          </div>
        </StyledSelect>
        <StyledSelect data-type="network">
          <div className="select-title">{t('deposit-to')}</div>
          <div className="select">
            <div className="select--label">{t('network')}</div>
            <div className="select--input" onClick={showNetworkModal}>
              <div className="selected--wrapper">
                <div className="selected">
                  <div className="selected-information">
                    <span className="selected-name">BTC</span>
                    <span className="selected-desc">Bitcoin</span>
                  </div>
                </div>
              </div>
              <UpDownIcon name="down" className="down-icon" />
            </div>
          </div>
        </StyledSelect>
        <CoinModal
          title="Select coin to deposit"
          visible={isCoinModalVisible}
          onCancel={handleCoinModalCancel}
          footer={null}
        >
          <div className="search-coin">
            <div className="search-icon">
              <IconSvg name="search" className="icon-search" />
            </div>
            <input
              placeholder="Search coin name"
              className="search-input"
              value=""
            ></input>
          </div>
        </CoinModal>
        <NetworkModal
          title="Select network"
          visible={isNetworkModalVisible}
          onCancel={handleNetworkModalCancel}
          footer={null}
        >
          <div className="content-header">
            Ensure the network you choose to deposit matches the withdrawal
            network, or assets may be lost.
          </div>
        </NetworkModal>
      </div>
    </>
  );
};
export default DepositSection;
