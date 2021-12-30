import Header from './components/Header';
import { useState } from 'react';
import { data } from './data';
import {
  Container,
  Price,
  Amount,
  Time,
  Tabs,
  Table,
  MyTradesComponent,
} from './style';
import AuthMandatory from 'app/components/AuthMandatory';
import MarketActivities from './components/MarketActivities';
const Trades = () => {
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
        {active ? <MarketTrades /> : <MyTrades />}
      </Container>
      <MarketActivities />
    </>
  );
};
export default Trades;

const MarketTrades = () => {
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
const MyTrades = () => {
  return (
    <MyTradesComponent>
      <AuthMandatory />
    </MyTradesComponent>
  );
};
