import AuthMandatory from 'app/components/AuthMandatory';
import { Container } from './style';
import { getToken } from 'app/components/common/common';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTradehistorySlice } from './slice';
import { selectTradehistory } from './slice/selectors';
import FilterOrderHistory from './components/FilterOrderHistory';
import TradeHistoryList from './components/TradeHistoryList';
import moment from 'moment';

const TradeHistory = () => {
  const dispatch = useDispatch();
  const { actions } = useTradehistorySlice();
  const dataTradeHistory: any = useSelector(selectTradehistory);
  useEffect(() => {
    const startTime = moment().subtract(1, 'day').startOf('day').valueOf();
    const endTime = moment().valueOf();
    dispatch(actions.getTradeHistoryRequest({ startTime, endTime }));
  }, [actions, dispatch]);
  return (
    <>
      {getToken() ? (
        <>
          <FilterOrderHistory />
          <TradeHistoryList dataSource={dataTradeHistory?.data} />
        </>
      ) : (
        <Container>
          <AuthMandatory />
        </Container>
      )}
    </>
  );
};
export default TradeHistory;
