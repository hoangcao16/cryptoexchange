import { THeader } from './style';
import { Col } from 'react-bootstrap';
const OrderBookHeader = () => {
  return (
    <>
      <THeader>
        <Col>Price(USDT)</Col>
        <Col className="text-end px-0">Amount(BTC)</Col>
        <Col className="text-end pl-0">Time</Col>
      </THeader>
    </>
  );
};
export default OrderBookHeader;
