import Header from './components/Header';
import { useState } from 'react';
import { data } from './data';
import {
  Container,
  Price,
  Amount,
  Time,
  Tabs,
  Span,
  Table,
  MyTradesComponent,
} from './style';
const Trades = () => {
  const [active, setActive] = useState(true);
  return (
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
            className={!active ? 'btn-active btn-my' : 'btn-my'}
          >
            My Trades
          </button>
        </Tabs>
        {active ? <Header /> : ''}
      </div>
      {active ? <MarketTrades /> : <MyTrades />}
    </Container>
  );
};
export default Trades;

const MarketTrades = () => {
  return (
    <>
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
    </>
  );
};
const MyTrades = () => {
  return (
    <MyTradesComponent>
      <span>
        <Span href="/#">Log In</Span> or <Span href="/#">Register Now</Span> to
        trade
      </span>
    </MyTradesComponent>
  );
};
