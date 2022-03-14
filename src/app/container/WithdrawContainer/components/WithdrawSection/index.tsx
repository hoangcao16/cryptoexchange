/* eslint-disable react-hooks/exhaustive-deps */
import {
  StyledSelect,
  CoinModal,
  StyledTabs,
  StyledTabPane,
  NetworkWithFeeModal,
  StyledWithdrawAmount,
  StyledWithdrawSubmit,
} from './style';
import numeral from 'numeral';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import UpDownIcon from 'app/assets/img/UpDownIcon';
import IconSvg from 'app/assets/img/icon';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useWithdrawCryptoSlice } from './slice';
import { selectWithdrawCrypto } from './slice/selectors';
import { isEmpty } from 'app/components/common/common';
import { Tabs } from 'antd';
const WithdrawSection = () => {
  const { t } = useTranslation();
  const { TabPane } = Tabs;
  const [isCoinModalVisible, setIsCoinModalVisible] = useState(false);
  const [inputAddress, setInputAddress] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const wallet_type = 1;
  const { currency, wallettype } = useParams();
  const dispatch = useDispatch();
  const [isNetworkFeeModalVisible, setIsNetworkFeeModalVisible] =
    useState(false);
  const [selectedNetwork, setSelectedNetwork]: any = useState({});
  const {
    selectedCoin,
    networksList,
    coinList,
    feeTransfer,
    coinBalance,
  }: any = useSelector(selectWithdrawCrypto);
  const { actions } = useWithdrawCryptoSlice();
  useEffect(() => {
    dispatch(actions.getCoinRequest(currency));
  }, []);
  useEffect(() => {
    if (!isEmpty(selectedCoin)) {
      dispatch(actions.getNetworkRequest(selectedCoin.id));
      dispatch(
        actions.getCoinBalanceRequest({
          wallet_type: wallet_type,
          token_id: selectedCoin.id,
        }),
      );
    }
  }, [selectedCoin]);
  const showCoinModal = () => {
    setIsCoinModalVisible(true);
    dispatch(actions.getListCoinRequest({ whitelist: 1 }));
  };
  const handleCoinModalCancel = () => {
    setIsCoinModalVisible(false);
  };
  const showNetworkFeeModal = () => {
    setIsNetworkFeeModalVisible(true);
  };
  const handleNetworkFeeModalCancel = () => {
    setIsNetworkFeeModalVisible(false);
  };
  const handleSelectNetwork = (network: any) => {
    setSelectedNetwork(network);
    setIsNetworkFeeModalVisible(false);
    dispatch(
      actions.getFeeTransferRequest({
        token_id: selectedCoin?.id,
        network_id: network?.networkId,
      }),
    );
  };
  const handleSelectCoin = (coin: any) => {
    dispatch(actions.getCoinSuccess(coin));
    setIsCoinModalVisible(false);
    setSelectedNetwork({});
  };
  const handleSearchCoin = (value: string) => {
    console.log(value);
    dispatch(actions.getListCoinRequest({ name: value }));
  };
  const handleChangeAddress = (value: string) => {
    setInputAddress(value);
    console.log(value);
  };
  const handleChangeAmount = (value: string) => {
    setWithdrawAmount(value);
    console.log(value);
  };
  const handleWithdraw = () => {
    dispatch(
      actions.withdrawRequest({
        token_id: selectedCoin?.id,
        network_id: selectedNetwork?.networkId,
        address: inputAddress,
        amount: withdrawAmount,
      }),
    );
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
                  <img
                    src={selectedCoin?.icon}
                    width="24"
                    height="24"
                    alt="icon"
                  />
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
          <div className="select-title">{t('withdraw-to')}</div>
          <StyledTabs defaultActiveKey="1" type="card">
            <TabPane tab="New Address" key="1">
              <StyledTabPane className="select">
                <div>
                  <div className="input-address">
                    <div className="address-label">{t('address')}</div>
                    <input
                      className="input-field"
                      placeholder="Enter address here"
                      // value={inputAddress}
                      onChange={e => handleChangeAddress(e.target.value)}
                    ></input>
                  </div>
                </div>
                <div>
                  <div className="select--label">{t('network')}</div>
                  <div className="select--input" onClick={showNetworkFeeModal}>
                    <div className="selected--wrapper">
                      <div className="selected">
                        <div className="selected-information">
                          {!isEmpty(selectedNetwork) ? (
                            <>
                              <span className="selected-name">
                                {selectedNetwork?.symbolName}
                              </span>
                              <span className="selected-desc">
                                {selectedNetwork?.networkName}
                              </span>
                            </>
                          ) : (
                            <span className="selected-desc">
                              {t('select-network')}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <UpDownIcon name="down" className="down-icon" />
                  </div>
                  <div
                    className={
                      inputAddress === '' || isEmpty(selectedNetwork)
                        ? 'withdraw-detail'
                        : 'withdraw-detail  hide'
                    }
                  >
                    <div className="withdraw-detail--row">
                      <div className="detail-item">
                        <div className="detail-item--label">
                          {selectedCoin?.assetName} {t('spot-balance')}
                        </div>
                        <div className="detail-item--value">
                          {coinBalance} {selectedCoin?.assetName}
                        </div>
                      </div>
                      <div className="detail-item">
                        <div className="detail-item--label">
                          {t('minimum-withdrawal')}
                        </div>
                        <div className="detail-item--value">
                          {numeral(feeTransfer?.min).format('0,0.00')}{' '}
                          {selectedCoin?.assetName}
                        </div>
                      </div>
                    </div>
                    <div className="withdraw-detail--row">
                      <div className="detail-item">
                        <div className="detail-item--label">
                          {t('network-fee')}
                        </div>
                        <div className="detail-item--value">
                          {numeral(feeTransfer?.estimate_fee).format('0,0.00')}{' '}
                          {selectedCoin?.assetName}
                        </div>
                      </div>
                      <div className="detail-item">
                        <div className="detail-item--label">
                          {t('remaining limit')}
                        </div>
                        <div className="detail-item--value">
                          8,000.00 BUSD/8,000.00 BUSD
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </StyledTabPane>
            </TabPane>
            <TabPane tab="Address Book" key="2">
              Content of Tab Pane 2
            </TabPane>
          </StyledTabs>
        </StyledSelect>
        <StyledWithdrawAmount
          data-type={
            inputAddress === '' || isEmpty(selectedNetwork) ? 'hide' : ''
          }
        >
          <div className="select-title">{t('withdraw-amount')}</div>
          <div className="select">
            <div className="select--label">
              <div>{t('amount')}</div>
              <div className="right">
                <div className="right-value">8,000.00 BUSD/8,000.00 BUSD</div>
                <div className="css-rxpm2l">{t('remaining limit')}</div>
              </div>
            </div>
            <div className="input-area">
              <input
                className="input-amount"
                value={withdrawAmount}
                onChange={e => handleChangeAmount(e.target.value)}
              />
              <div className="input-suffix">
                <div className="input-suffix--wrapper">
                  <div
                    className="max"
                    onClick={() => setWithdrawAmount(coinBalance)}
                  >
                    MAX
                  </div>
                  <div className="separate"></div>
                  <div className="coin-name">{selectedCoin?.assetName}</div>
                </div>
              </div>
            </div>
          </div>
        </StyledWithdrawAmount>
        <StyledWithdrawSubmit
          data-type={
            inputAddress === '' || isEmpty(selectedNetwork) ? 'hide' : ''
          }
        >
          <div className="left">{t('receive-amount')}</div>
          <div className="right">
            <div className="content-wrapper">
              <div className="amount-counted">
                <div>
                  <div className="receive-amount">
                    {isNaN(
                      parseFloat(withdrawAmount) -
                        parseFloat(feeTransfer?.estimate_fee),
                    )
                      ? 0
                      : parseFloat(withdrawAmount) -
                        parseFloat(feeTransfer?.estimate_fee)}{' '}
                    {selectedCoin?.assetName}
                  </div>
                  <div className="fee-amount">
                    {numeral(feeTransfer?.estimate_fee).format('0,0.00')}{' '}
                    {selectedCoin?.assetName} {t('network-fee-included')}
                  </div>
                </div>
              </div>
              <button className="submit-btn" onClick={() => handleWithdraw()}>
                {t('withdraw')}
              </button>
            </div>
          </div>
        </StyledWithdrawSubmit>
      </div>
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
            // value=""
            onChange={e => handleSearchCoin(e.target.value)}
          ></input>
        </div>
        <div className="coin-list">
          {coinList.map((coin: any, index: number) => (
            <div
              className="coin-item"
              key={index}
              onClick={() => handleSelectCoin(coin)}
            >
              <div className="coin-item--wrapper">
                <img src={coin.icon} alt="Icon" className="coin-item--icon" />
                <div className="coin-item--information">
                  <span className="coin-name">{coin.assetName}</span>
                  <div className="coin-note">{coin.note}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CoinModal>
      <NetworkWithFeeModal
        title={t('select-network')}
        visible={isNetworkFeeModalVisible}
        onCancel={handleNetworkFeeModalCancel}
        footer={null}
      >
        <div className="content-header">{t('ensure-network-withdraw')}</div>
        <div className="network-list">
          {networksList.map((item: any, index: number) => (
            <div
              className="network-item"
              key={index}
              onClick={() => handleSelectNetwork(item)}
            >
              <div className="network-item--wrapper">
                <div className="left">
                  <span className="network-item--symbol">
                    {item.symbolName}
                  </span>
                  <div className="network-item--network">
                    {item.networkName}
                  </div>
                </div>
                <div className="right">
                  <div className="arrived-time">
                    {t('arrival-time')} <span className="value">≈ 5 mins</span>
                  </div>
                  <div className="fee">
                    {t('fee')}{' '}
                    <span className="value">
                      0.0000047 {selectedCoin?.assetName} ( ≈ $0.193026)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </NetworkWithFeeModal>
    </>
  );
};
export default WithdrawSection;
