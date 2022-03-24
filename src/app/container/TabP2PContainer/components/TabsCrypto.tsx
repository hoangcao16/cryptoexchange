import openNotification from 'app/components/NotificationAntd';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { tabP2PService } from 'services/tabP2PServices';
import styled from 'styled-components';
import { useTabP2PSlice } from '../slice';

const Cryptos = [
  { name: 'USDT' },
  { name: 'BTNC' },
  { name: 'SOL' },
  { name: 'BNB' },
  { name: 'ETH' },
  { name: 'BAKE' },
];

function TabsCrypto() {
  const [searchParams] = useSearchParams();
  const { actions } = useTabP2PSlice();
  const dispatch = useDispatch();
  const [listCrypto, setListCrypto] = useState<any>([]);
  const { getListToken } = tabP2PService;

  const P2PSearchParams = Object.fromEntries(searchParams);
  const [currentCrypto, setCurrentCrypto] = useState(
    P2PSearchParams.crypto ? P2PSearchParams.crypto : listCrypto[0]?.assetName,
  );

  const onClickButton = (name: string) => {
    if (name === currentCrypto) {
      return;
    }

    dispatch(actions.cryptoTabP2P(name));
  };

  const getListCrypto = () => {
    getListToken()
      .then(res => {
        if (res.data.rc === 0) {
          setListCrypto(res.data.rows);
        } else openNotification('Error', res.data.rd);
      })

      .catch(() => openNotification('Error', 'Something went wrong!'));
  };

  useEffect(() => {
    setCurrentCrypto(P2PSearchParams.crypto);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  useEffect(() => {
    getListCrypto();
  }, []);

  return (
    <Wrapper>
      {listCrypto.map((c, i) => (
        <TabsCryptoButton
          className={
            currentCrypto === c.assetName ? 'TabsCryptoButton-active' : ''
          }
          key={i}
          onClick={() => {
            onClickButton(c.assetName);
          }}
        >
          {c.assetName}
        </TabsCryptoButton>
      ))}
    </Wrapper>
  );
}

export default TabsCrypto;

const Wrapper = styled.div`
  height: 60px;
  margin-left: 20px;
`;

const TabsCryptoButton = styled.button`
  height: 100%;
  background: transparent;
  color: ${({ theme }) => theme.body};
  border: 2px solid transparent;
  font-size: 14px;
  box-shadow: none;

  margin-right: 18px;
  min-width: 60px;

  &:hover,
  &:focus,
  &:focus-within,
  &:active {
    border-bottom: 2px solid ${({ theme }) => theme.primary};
  }

  &.TabsCryptoButton-active {
    border-bottom: 2px solid ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.primary};
    font-weight: bold;
  }
`;
