import styled from 'styled-components';
import { Container } from 'react-bootstrap';
import Funds from 'app/components/TradesInformation/Funds';
import TradeHistory from 'app/components/TradesInformation/TradeHistory';
import OrderHistory from 'app/components/TradesInformation/OrderHistory';
import OpenOrders from 'app/components/TradesInformation/OpenOrders';
import { selectBuyspotlimit } from 'app/components/OrderForm/components/LimitForm/components/BuyForm/slice/selectors';
import { selectSellspotlimit } from 'app/components/OrderForm/components/LimitForm/components/SellForm/slice/selectors';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { isEmpty } from 'app/components/common/common';
const TradeFormContainer = () => {
  const [active, setActive] = useState(1);
  const dataBuy: any = useSelector(selectBuyspotlimit);
  const dataSell: any = useSelector(selectSellspotlimit);
  const [dataOpenOrders, setDataOpenOrders]: any[] = useState([]);
  useEffect(() => {
    if (
      !isEmpty(dataBuy.data) &&
      dataOpenOrders.find(
        (item: any) => item.order_id === dataBuy.data.order_id,
      ) === undefined
    ) {
      setDataOpenOrders((prev: any) => [dataBuy.data, ...prev]);
    }
    if (
      !isEmpty(dataSell.data) &&
      dataOpenOrders.find(
        (item: any) => item.order_id === dataSell.data.order_id,
      ) === undefined
    ) {
      setDataOpenOrders((prev: any) => [dataSell.data, ...prev]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataBuy.data, dataSell.data]);

  return (
    <StyledContainer>
      <Tabs>
        <div
          onClick={() => setActive(1)}
          className={active === 1 ? 'tab-item active' : 'tab-item'}
        >
          Open Orders(0)
        </div>
        <div
          onClick={() => setActive(2)}
          className={active === 2 ? 'tab-item active' : 'tab-item'}
        >
          Order History
        </div>
        <div
          onClick={() => setActive(3)}
          className={active === 3 ? 'tab-item active' : 'tab-item'}
        >
          Trade History
        </div>
        <div
          onClick={() => setActive(4)}
          className={active === 4 ? 'tab-item active' : 'tab-item'}
        >
          Funds
        </div>
      </Tabs>
      {active === 1 ? (
        <OpenOrders dataSource={dataOpenOrders} />
      ) : active === 2 ? (
        <OrderHistory />
      ) : active === 3 ? (
        <TradeHistory />
      ) : (
        <Funds />
      )}
    </StyledContainer>
  );
};
export default TradeFormContainer;
export const StyledContainer = styled(Container)`
  border: ${({ theme }) => theme.borderGray};
`;
export const Tabs = styled.div`
  box-sizing: border-box;
  margin: 0px;
  min-width: 0px;
  white-space: nowrap;
  display: flex;
  flex-direction: row;
  flex-shrink: 0;
  -webkit-box-flex: 0;
  flex-grow: 0;
  font-size: 16px;
  line-height: 16px;
  position: relative;
  background-color: transparent;
  width: 100%;
  .tab-item {
    margin: 0px 16px 0px 0px;
    min-width: 0px;
    padding: 16px 1px 10px;
    height: 100%;
    box-sizing: border-box;
    user-select: none;
    font-size: 14px;
    color: ${({ theme }) => theme.grayColor};
    cursor: pointer;
    @media screen and (min-width: 1279px) {
      margin-right: 24px;
    }
    @media screen and (min-width: 1023px) {
      margin-right: 16px;
    }
    @media screen and (min-width: 767px) {
      margin-right: 16px;
    }
    &:hover {
      color: ${({ theme }) => theme.primary};
    }
  }
  .active {
    font-weight: 600;
    border: none;
    color: ${({ theme }) => theme.primary};
  }
`;
