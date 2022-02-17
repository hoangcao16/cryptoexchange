/* eslint-disable react-hooks/exhaustive-deps */
import AuthMandatory from 'app/components/AuthMandatory';
import { Container } from './style';
import { getToken } from 'app/components/common/common';
import OrderHistoryList from './components/orderHistoryList';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useOrderhistorySlice } from './slice';
import { selectOrderhistory } from './slice/selectors';
import FilterOrderHistory from './components/FilterOrderHistory';
import moment from 'moment';

const OrdersHistory = () => {
  const dispatch = useDispatch();
  const { actions } = useOrderhistorySlice();
  const dataOrderHistory: any = useSelector(selectOrderhistory);

  useEffect(() => {
    const data = {
      startTime: moment().startOf('day').valueOf(),
      endTime: moment().valueOf(),
      status: 'ALL',
      pageIndex: 0,
      pageSize: null,
    };
    dispatch(actions.getOrderhistoryRequest(data));
  }, []);
  return (
    <>
      {getToken() ? (
        <>
          <FilterOrderHistory />
          <OrderHistoryList dataSource={dataOrderHistory?.data?.list} />
        </>
      ) : (
        <Container>
          <AuthMandatory />
        </Container>
      )}
    </>
  );
};
export default OrdersHistory;
