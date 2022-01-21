import Header from './components/Header';
import { useState } from 'react';
import { Container, Tabs } from './style';
import MyTrades from './components/MyTrades';
import MarketTrades from './components/MarketTrades';

const Trades = ({ dataSocket, dataApi }) => {
  const [active, setActive] = useState(true);
  return (
    <>
      <Container>
        <div>
          <Tabs>
            <button
              onClick={() => setActive(true)}
              className={active ? 'btn-active btn-market' : 'btn-market'}
            >
              Market Trades
            </button>
            <button
              onClick={() => setActive(false)}
              className={!active ? 'btn-active btn-myTrades' : 'btn-myTrades'}
            >
              My Trades
            </button>
          </Tabs>
          {active ? <Header /> : ''}
        </div>
        {active ? (
          <MarketTrades dataSocket={dataSocket} dataApi={dataApi} />
        ) : (
          <MyTrades />
        )}
      </Container>
    </>
  );
};
export default Trades;
