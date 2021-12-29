import { THeader } from './style';
import { Col } from 'react-bootstrap';
import { ReactComponent as ChangeIcon } from 'app/assets/img/change.svg';
import { useMarketContext } from '../context';
const OrderBookHeader = () => {
  const { activeChange, setActiveChange } = useMarketContext();
  return (
    <>
      <THeader>
        <Col>Pair</Col>
        <Col className="text-end px-0">Price</Col>
        <Col className="text-end">
          {activeChange ? 'Change' : 'Volume'}
          <ChangeIcon
            className="change-icon"
            onClick={() => setActiveChange(!activeChange)}
          />
        </Col>
      </THeader>
    </>
  );
};
export default OrderBookHeader;
