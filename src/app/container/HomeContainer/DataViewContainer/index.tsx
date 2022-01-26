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
import { useGetallpairSlice } from 'app/components/Market/slice';
import { selectGetallpair } from 'app/components/Market/slice/selectors';
import { useTradesSlice } from 'app/components/Trades/slice';
import { selectTrades } from 'app/components/Trades/slice/selectors';
import { useWebsocketSlice } from 'app/container/HomeContainer/slice';
const baseURL = process.env.REACT_APP_BASE_WEBSOCKET_URL;

const HomeContentContainer = () => {
  const [dataMarketSocket, setDataMarketSocket]: any = useState({});
  const [dataTradesSocket, setDataTradesSocket]: any = useState({});
  const [dataOrder, setDataOrder]: any[] = useState([]);
  const dispatch = useDispatch();
  const { actions: actionsAllPair } = useGetallpairSlice();
  const { actions: actionsTrades } = useTradesSlice();
  const { actions: actionsWebsocket } = useWebsocketSlice();
  const pairName = JSON.parse(
    JSON.stringify(localStorage.getItem('pair')) || '',
  );
  const dataAllPair = useSelector(selectGetallpair);
  const dataAllTrades = useSelector(selectTrades);
  useEffect(() => {
    var socket = new ReconnectingWebSocket(`${baseURL}/ws`, [], {
      connectionTimeout: 5000,
    });
    socket.onopen = () => {
      console.log(`Websocket Market connected`);
      socket.send(
        JSON.stringify({
          event: 'new_joining',
        }),
      );
      setInterval(
        () =>
          socket.send(
            JSON.stringify({
              id: Math.random(),
              method: 'GET_PROPERTY',
            }),
          ),
        5000,
      );
    };
    socket.onclose = () => {
      console.log('WebSocket Closed!');
    };

    socket.onmessage = (message: any) => {
      const Message = JSON.parse(message.data);
      if (
        Message.Key === 'Robinhood::RecentTrade' &&
        Message.Value.marker_id !== Message.Value.taker_id
      ) {
        setDataTradesSocket(Message.Value);
      } else if (Message.Key === 'RobinhoodPair') {
        setDataMarketSocket(Message.Value);
      } else if (Message.Key === 'Robinhood::OrderBook') {
        setDataOrder(Message.Value);
      } else if (Message.Key === 'Robinhood::OrderFilled') {
        dispatch(actionsWebsocket.updateOrderFilled(Message.Value));
      }
    };
    // connectSocket();
    return () => {
      socket.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    dispatch(actionsAllPair.getAllPairRequest());
    dispatch(actionsTrades.getTradesRequest(pairName));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Container>
      <StyledRow>
        <Col md={9}>
          <StyledRow>
            <ContentHeader />
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
          <Market dataSocket={dataMarketSocket} dataApi={dataAllPair} />
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
