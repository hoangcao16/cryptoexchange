import { Container, Tabs, StyledDropdown, Tooltip } from './style';
import { ReactComponent as InformationIcon } from 'app/assets/img/information.svg';
import { SplitButton, Dropdown } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import LimitForm from './components/LimitForm';
import MarketForm from './components/MarketForm';
import StopLimitForm from './components/StopLimitForm';
import OcoForm from './components/OcoForm';
import { useDispatch, useSelector } from 'react-redux';
import { useGetBalancePairSlice } from './slice';
import { selectGetallpair } from 'app/components/Market/slice/selectors';
import { selectGetBalancePair } from './slice/selectors';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { isEmpty } from 'app/components/common/common';

const OrderForm = () => {
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const [title, setTitle] = useState('Stop-limit');
  const [tabActive, setTabActive] = useState(1);
  const [pairId, setPairId] = useState('');
  const dispatch = useDispatch();
  const pairData: any = useSelector(selectGetallpair);
  // const { reselectPair } = useSelector(selectGetallpair);
  const { reGetBalancePair } = useSelector(selectGetBalancePair);
  const { actions } = useGetBalancePairSlice();
  let { pair } = useParams();
  const wallet = 'SPOT';

  useEffect(() => {
    setTitle(t('stop-limit'));
  }, [i18n, t]);
  // Get pairId
  useEffect(() => {
    const findIndex: any = pair?.indexOf('_');
    const changeFormatPair = `${pair?.substring(
      0,
      findIndex,
    )}/${pair?.substring(findIndex + 1)}`;
    if (pairData && !isEmpty(pairData?.data)) {
      const index = pairData?.data?.rows?.findIndex((item: any) => {
        return item.symbol === changeFormatPair;
      });
      if (index !== -1) {
        setPairId(pairData?.data?.rows[index].id);
        localStorage.setItem('pair_id', pairData?.data?.rows[index]?.id);
      }
    }
  }, [pair, pairData?.data?.rows]);
  useEffect(() => {
    if (pairId !== '') {
      dispatch(actions.getBalancePairSpotRequest(pairId));
    }
  }, [actions, dispatch, pairId, reGetBalancePair]);
  return (
    <Container>
      <div className="d-flex">
        <Tabs>
          <div
            onClick={() => setTabActive(1)}
            className={tabActive === 1 ? 'item active' : 'item'}
          >
            {t('limit')}
          </div>
          <div
            onClick={() => setTabActive(2)}
            className={tabActive === 2 ? 'item active' : 'item'}
          >
            {t('market')}
          </div>
          <StyledDropdown className="item">
            <SplitButton
              key="down"
              id="dropdown-button-drop-down"
              drop="down"
              title={title}
              onClick={() => setTabActive(title === t('stop-limit') ? 3 : 4)}
              className={tabActive === 3 || tabActive === 4 ? ' active' : ''}
            >
              <Dropdown.Item
                className="dropdown-item"
                onClick={() => {
                  setTitle(t('stop-limit'));
                  setTabActive(3);
                }}
              >
                {t('stop-limit')}
              </Dropdown.Item>
              <Dropdown.Item
                className="dropdown-item"
                onClick={() => {
                  setTitle('OCO');
                  setTabActive(4);
                }}
              >
                OCO
              </Dropdown.Item>
            </SplitButton>
          </StyledDropdown>
          <Tooltip className="d-flex align-items-center">
            <InformationIcon className="information-icon" />
            <div className="tooltiptext">
              <div className="tooltip-content">
                {tabActive === 1
                  ? t('tooltip-limit')
                  : tabActive === 2
                  ? t('tooltip-market')
                  : tabActive === 3
                  ? t('tooltip-stop-limit')
                  : t('tooltip-oco')}
              </div>
            </div>
          </Tooltip>
        </Tabs>
        <div></div>
      </div>
      <div className="d-flex">
        {tabActive === 1 ? (
          <LimitForm wallet={wallet} />
        ) : tabActive === 2 ? (
          <MarketForm />
        ) : tabActive === 3 ? (
          <StopLimitForm />
        ) : (
          <OcoForm />
        )}
      </div>
    </Container>
  );
};
export default OrderForm;
