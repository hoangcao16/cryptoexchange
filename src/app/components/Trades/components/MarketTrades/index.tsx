// import numeral from 'numeral';
import { Price, Amount, Time, Table } from './style';
// import { data } from '../../data';
import { useEffect, useState } from 'react';
import ReconnectingWebSocket from 'reconnecting-websocket';

const baseURL = process.env.REACT_APP_BASE_WEBSOCKET_URL;
const MarketTrades = () => {
  const [data, setData]: any[] = useState([]);
  var socket = new ReconnectingWebSocket(`${baseURL}/ws`, [], {
    connectionTimeout: 5000,
  });
  function connectSocket() {
    socket.onopen = () => {
      console.log(`Websocket Market Trades connected`);
      socket.send(
        JSON.stringify({
          event: 'new_joining',
        }),
      );
    };
    socket.onclose = () => {
      console.log('WebSocket Closed!');
    };
    socket.onmessage = (message: any) => {
      const Message = JSON.parse(message.data);
      setData((prevData: any) => [...prevData, Message]);
    };
  }
  useEffect(() => {
    connectSocket();
    return () => {
      socket.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Table>
      {data.map((item, index) => {
        return (
          <div
            key={index}
            className="d-flex justify-content-between table-item"
          >
            <Price>{item.price}</Price>
            <Amount>{item.amount}</Amount>
            <Time>{item.time}</Time>
          </div>
        );
      })}
    </Table>
  );
};
export default MarketTrades;
