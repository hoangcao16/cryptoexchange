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
const baseURL = process.env.REACT_APP_BASE_WEBSOCKET_URL;

const HomeContentContainer = () => {
  const [dataMarket, setDataMarket]: any[] = useState([]);
  const [dataTrades, setDataTrades]: any[] = useState([]);
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
        setDataTrades((prevState: any) => [Message.Value, ...prevState]);
      } else if (Message.Key === 'RobinhoodPair') {
        setDataMarket(Message.Value);
      }
    };
    // connectSocket();
    return () => {
      socket.close();
    };
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
              <OrderBook />
            </StyledCol>
            <StyledCol md={8} className="d-flex flex-column">
              <Chart />
              <OrderFormContainer />
            </StyledCol>
          </StyledRow>
        </Col>
        <StyledCol md={3} className="right-menu">
          <Market data={dataMarket} />
          <Trades data={dataTrades} />
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
