/* eslint-disable react-hooks/exhaustive-deps */
import AuthMandatory from 'app/components/AuthMandatory';
import { Container } from './style';
import { getToken, isEmpty } from 'app/components/common/common';
import OpenOrderList from './components/OpenOrderList';
import { useSelector, useDispatch } from 'react-redux';
import { selectWebsocket } from 'app/container/HomeContainer/slice/selectors';
import { selectBuyspotlimit } from 'app/components/OrderForm/components/LimitForm/components/BuyForm/slice/selectors';
import { selectSellspotlimit } from 'app/components/OrderForm/components/LimitForm/components/SellForm/slice/selectors';
import { useState, useEffect } from 'react';
import { useGetopenOrderSlice } from './slice';
import { selectGetopenOrder } from './slice/selectors';
interface stateProps {
  order_id?: string;
  filled?: number;
}
const Orders = () => {
  const dispatch = useDispatch();
  const { actions } = useGetopenOrderSlice();
  const dataSocket = useSelector(selectWebsocket);
  const dataBuy: any = useSelector(selectBuyspotlimit);
  const dataSell: any = useSelector(selectSellspotlimit);
  const dataOrders: any = useSelector(selectGetopenOrder);
  const [dataOpenOrders, setDataOpenOrders] = useState<stateProps[]>([]);

  useEffect(() => {
    const param = {
      pageIndex: 0,
      pageSize: 15,
    };
    dispatch(actions.getopenOrderRequest(param));
  }, []);
  useEffect(() => {
    if (dataOrders?.data?.list?.length > 0) {
      setDataOpenOrders(dataOrders.data.list);
    }
  }, [dataOrders.data]);
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
  }, [dataBuy.data, dataSell.data]);
  useEffect(() => {
    if (dataSocket.Orderfilled.filled === true) {
      const index = dataOpenOrders.findIndex((item: any) => {
        return item.order_id === dataSocket.Orderfilled.order_id;
      });
      if (index !== -1 && dataOpenOrders !== undefined) {
        const dataCopy = [...JSON.parse(JSON.stringify(dataOpenOrders))];
        dataCopy.splice(index, 1);
        setDataOpenOrders(dataCopy);
      }
    } else if (dataSocket.Orderfilled.filled === false) {
      const index = dataOpenOrders.findIndex((item: any) => {
        return item.order_id === dataSocket.Orderfilled.order_id;
      });
      if (index !== -1 && dataOpenOrders !== undefined) {
        const dataCopy = [...JSON.parse(JSON.stringify(dataOpenOrders))];
        dataCopy[index].filled =
          (dataSocket.Orderfilled.filled_quantity /
            dataSocket.Orderfilled.origin_quantity) *
          100;
        setDataOpenOrders(dataCopy);
      }
    }
  }, [dataSocket]);

  return (
    <>
      {getToken() ? (
        <OpenOrderList dataSource={dataOpenOrders} />
      ) : (
        <Container>
          <AuthMandatory />
        </Container>
      )}
    </>
  );
};
export default Orders;
