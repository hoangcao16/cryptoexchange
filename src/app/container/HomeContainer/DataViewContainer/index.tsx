/* eslint-disable react-hooks/exhaustive-deps */
import styled from 'styled-components';
import { Container, Row, Col } from 'react-bootstrap';
import ContentHeader from 'app/components/ContentHeader';
import OrderBook from 'app/components/OrderBook';
import Chart from 'app/components/Chart';
import OrderFormContainer from 'app/container/OrderFormContainer';
import Market from 'app/components/Market';
import Trades from 'app/components/Trades';
import MarketActivities from 'app/components/Trades/components/MarketActivities';
import ReconnectingWebSocket from 'reconnecting-websocket';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectGetallpair } from 'app/components/Market/slice/selectors';
import { useTradesSlice } from 'app/components/Trades/slice';
import { selectTrades } from 'app/components/Trades/slice/selectors';
import { useWebsocketSlice } from 'app/container/HomeContainer/slice';
import { useParams } from 'react-router-dom';
const baseURL = process.env.REACT_APP_BASE_WEBSOCKET_URL;

// const socket = new WebSocket(`${baseURL}/ws`);
const HomeContentContainer = () => {
  const [dataMarketSocket, setDataMarketSocket]: any = useState({});
  const [dataTradesSocket, setDataTradesSocket]: any = useState({});
  const [dataOrder, setDataOrder]: any = useState({});
  const [tradeInfor, setTradeInfor]: any = useState({});
  const [tradeVolumeInfor, setTradeVolumeInfor]: any = useState({});
  const [webSocket, setWebSocket]: any = useState();
  const dispatch = useDispatch();

  const { actions: actionsTrades } = useTradesSlice();
  const { actions: actionsWebsocket } = useWebsocketSlice();
  const dataAllPair = useSelector(selectGetallpair);
  const dataAllTrades = useSelector(selectTrades);
  let { pair } = useParams();
  const findIndex: any = pair?.indexOf('_');
  const changeFormatPair = `${pair?.substring(0, findIndex)}/${pair?.substring(
    findIndex + 1,
  )}`;

  useEffect(() => {
    console.log('mount');
    return () => {
      console.log('unmount');
    };
  }, []);
  useEffect(() => {
    var socket = new ReconnectingWebSocket(`${baseURL}/ws`, [], {
      connectionTimeout: 5000,
    });
    setWebSocket(socket);
    socket.onopen = () => {
      console.log(`Websocket Market connected`);
      if (
        changeFormatPair !== '' &&
        changeFormatPair !== undefined &&
        changeFormatPair !== null
      ) {
        socket.send(
          JSON.stringify({
            method: 'SUBSCRIBE',
            pair: changeFormatPair,
          }),
        );
      }
      setInterval(
        () =>
          socket.send(
            JSON.stringify({
              method: 'GET_PROPERTY',
              id: Math.random(),
            }),
          ),
        5000,
      );
    };
    socket.onclose = () => {
      console.log('WebSocket Closed!');
    };
    socket.onmessage = (message: any) => {
      const Message = JSON.parse(message?.data);
      if (
        Message.Key === 'Robinhood::RecentTrade' &&
        Message.Value.marker_id !== Message.Value.taker_id
      ) {
        setDataTradesSocket(Message.Value);
      } else if (Message.Key === 'RobinhoodPair') {
        setDataMarketSocket(Message.Value);
      } else if (Message.Key === 'PowExchange::OrderBookChange') {
        setDataOrder(Message.Value);
      } else if (Message.Key === 'Robinhood::OrderFilled') {
        dispatch(actionsWebsocket.updateOrderFilled(Message.Value));
      } else if (Message.Key === 'PowExchange::TradeInfo') {
        setTradeInfor(Message.Value);
      } else if (Message.Key === 'PowExchange::TradeVolumeInfo') {
        setTradeVolumeInfor(Message.Value);
      }
    };
    return () => {
      socket.close();
    };
  }, []);
  useEffect(() => {
    setDataTradesSocket({});
    setDataOrder({});
    setDataMarketSocket({});
  }, [dataAllPair?.reselectPair]);

  useEffect(() => {
    const findIndex: any = pair?.indexOf('_');
    if (pair !== '') {
      dispatch(
        actionsTrades.getTradesRequest(
          `${pair?.substring(0, findIndex)}/${pair?.substring(findIndex + 1)}`,
        ),
      );
    }
  }, [pair]);
  return (
    <Container>
      <StyledRow>
        <Col md={9}>
          <StyledRow>
            <ContentHeader
              tradeInforSocket={tradeInfor}
              tradeVolumeInforSocket={tradeVolumeInfor}
            />
          </StyledRow>
          <StyledRow>
            <StyledCol md={4} className="orderbook-section">
              <OrderBook
                dataOrderbookSocket={dataOrder}
                dataMarketSocket={dataMarketSocket}
              />
            </StyledCol>
            <StyledCol md={8} className="d-flex flex-column">
              <Chart />
              <OrderFormContainer />
            </StyledCol>
          </StyledRow>
        </Col>
        <StyledCol md={3} className="right-menu">
          <Market
            dataSocket={dataMarketSocket}
            dataApi={dataAllPair}
            socket={webSocket}
          />
          <Trades dataSocket={dataTradesSocket} dataApi={dataAllTrades} />
          <MarketActivities />
        </StyledCol>
      </StyledRow>
    </Container>
  );
};
export default HomeContentContainer;
const StyledRow = styled(Row)`
  padding: 0;
  .orderbook-section,
  .right-menu {
    border: ${({ theme }) => theme.borderGray};
    border-top: none;
    border-bottom: none;
  }
  .right-menu {
    display: flex;
    flex-direction: column;
  }
`;
const StyledCol = styled(Col)`
  padding: 0;
`;
