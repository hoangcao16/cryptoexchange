import { THeader } from './style';
import { Col } from 'react-bootstrap';
import { ReactComponent as ChangeIcon } from 'app/assets/img/change.svg';
import { useGlobalContext } from '../../../common/context';
import SortIcon from 'app/assets/img/sortIcon';
const OrderBookHeader = () => {
  const { activeChangeColumnMarket, setActiveChangeColumnMarket } =
    useGlobalContext();
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
          {activeChangeColumnMarket ? 'Change' : 'Volume'}{' '}
          <SortIcon name="detail" className="sort-icon" />
          <ChangeIcon
            className="change-icon"
            onClick={() =>
              setActiveChangeColumnMarket(!activeChangeColumnMarket)
            }
          />
        </Col>
      </THeader>
    </>
  );
};
export default OrderBookHeader;
