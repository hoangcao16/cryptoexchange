import { THeader } from './style';
import { Col } from 'react-bootstrap';
import { ReactComponent as ChangeIcon } from 'app/assets/img/change.svg';
import { useGlobalContext } from '../../../common/context';
import SortIcon from 'app/assets/img/sortIcon';
import { useTranslation } from 'react-i18next';

const OrderBookHeader = () => {
  const { activeChangeColumnMarket, setActiveChangeColumnMarket } =
    useGlobalContext();
  const { t } = useTranslation();
  return (
    <>
      <THeader>
        <Col>
          {t('pair')} <SortIcon name="up" className="sort-icon" />
        </Col>
        <Col className="text-end px-0">
          {t('price')} <SortIcon name="detail" className="sort-icon" />
        </Col>
        <Col className="text-end">
          {activeChangeColumnMarket ? t('change') : t('Volume')}
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
