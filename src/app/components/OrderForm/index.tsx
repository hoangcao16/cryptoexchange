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

const getPairId = () => {
  return JSON.parse(JSON.stringify(localStorage.getItem('pair_id')) || '');
};

const OrderForm = () => {
  const [title, setTitle] = useState('Stop-limit');
  const [tabActive, setTabActive] = useState(1);
  const [pairId, setPairId] = useState('');
  const dispatch = useDispatch();
  const { reselectPair } = useSelector(selectGetallpair);
  const { actions } = useGetBalancePairSlice();
  const wallet = 'SPOT';
  useEffect(() => {
    setPairId(getPairId());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reselectPair]);
  useEffect(() => {
    if (pairId !== '') {
      dispatch(actions.getBalancePairSpotRequest(pairId));
    }
  }, [actions, dispatch, pairId]);
  return (
    <Container>
      <div className="d-flex">
        <Tabs>
          <div
            onClick={() => setTabActive(1)}
            className={tabActive === 1 ? 'item active' : 'item'}
          >
            Limit
          </div>
          <div
            onClick={() => setTabActive(2)}
            className={tabActive === 2 ? 'item active' : 'item'}
          >
            Market
          </div>
          <StyledDropdown className="item">
            <SplitButton
              key="down"
              id="dropdown-button-drop-down"
              drop="down"
              title={title}
              onClick={() => setTabActive(title === 'Stop-limit' ? 3 : 4)}
              className={tabActive === 3 || tabActive === 4 ? ' active' : ''}
            >
              <Dropdown.Item
                className="dropdown-item"
                onClick={() => {
                  setTitle('Stop-limit');
                  setTabActive(3);
                }}
              >
                Stop-limit
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
                  ? 'A limit order is an order to buy or sell at a specific price or better. Limit orders are not guaranteed to execute.'
                  : tabActive === 2
                  ? 'Market order is immediately matched to the best available market price.'
                  : tabActive === 3
                  ? 'To buy or sell a coin once the price reaches a specified price.'
                  : 'To place a stop-limit order and a limit order at the same time. When either of the order pairs is triggered, the other order will be cancelled. If one is cancelled, the OCO pair will be cancelled.'}
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
