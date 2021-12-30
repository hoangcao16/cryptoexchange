import { THeader } from './style';
import { Col } from 'react-bootstrap';
import { ReactComponent as ChangeIcon } from 'app/assets/img/change.svg';
import { useMarketContext } from '../context';
import SortIcon from 'app/assets/img/sortIcon';
const OrderBookHeader = () => {
  const { activeChange, setActiveChange } = useMarketContext();
  return (
    <>
      <THeader>
        <Col>
          Pair <SortIcon name="up" className="sort-icon" />
        </Col>
        <Col className="text-end px-0">
          Price <SortIcon name="detail" className="sort-icon" />
        </Col>
        <Col className="text-end">
          {activeChange ? 'Change' : 'Volume'}{' '}
          <SortIcon name="detail" className="sort-icon" />
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
