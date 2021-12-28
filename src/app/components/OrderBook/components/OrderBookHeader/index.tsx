import { THeader } from './style';
import { Col } from 'react-bootstrap';
const OrderBookHeader = () => {
  return (
    <>
      <THeader>
        <Col>Price(USDT)</Col>
        <Col className="text-end px-0">Amount(BTC)</Col>
        <Col className="text-end">Total</Col>
      </THeader>
    </>
  );
};
export default OrderBookHeader;
