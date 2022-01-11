import Navbar from 'app/components/Navbar';
import FiatSpotHeader from './components/Header';
import FiatSpotTable from './components/Table';
import {
  App,
  Parameter,
  LeftParameter,
  RightParameter,
  Balance,
  BalanceName,
  BalanceNumber,
  SpotAccountPnl,
  FirstLinePnl,
  SecondLinePnl,
  Tooltip,
} from './style';
import ShowIcon from 'app/assets/img/showpassIcon';
import { ReactComponent as NextIcon } from 'app/assets/img/next.svg';
import { Container } from 'react-bootstrap';

const FiatSpotContainer = () => {
  return (
    <App>
      <Navbar />
      <Container>
        <FiatSpotHeader />
      </Container>
      <Parameter>
        <Container>
          <div className="content">
            <LeftParameter>
              <div className="title">
                <div className="title--text">Fiat and Spot balance</div>
                <div>
                  <button className="title--icon">
                    <ShowIcon name="show" className="show-icon" />
                  </button>
                </div>
              </div>
              <div className="amount">
                <div className="amount-coin">
                  <div className="amount-coin--number">0.00000000</div>
                  <div className="amount-coin--name">BTC</div>
                </div>
                <div className="amount-money">≈ $0.000000</div>
              </div>
            </LeftParameter>
            <RightParameter>
              <Balance>
                <BalanceName>
                  <div className="balance--name-text">Spot balance</div>
                </BalanceName>
                <BalanceNumber>
                  <div className="amount-coin">
                    <div className="amount-coin--number">0.00000000</div>
                    <div className="amount-coin--name">BTC</div>
                  </div>
                  <div className="amount-money">≈ $0.000000</div>
                </BalanceNumber>
              </Balance>
              <Balance>
                <BalanceName>
                  <div className="balance--name-text">Fiat balance</div>
                </BalanceName>
                <BalanceNumber>
                  <div className="amount-coin">
                    <div className="amount-coin--number">0.00000000</div>
                    <div className="amount-coin--name">BTC</div>
                  </div>
                  <div className="amount-money">≈ $0.000000</div>
                </BalanceNumber>
              </Balance>
              <SpotAccountPnl>
                <div className="title">
                  <div>
                    <Tooltip className="tooltip-box">
                      <div className="tooltip-title">
                        Yesterday's PNL = Yesterday asset total in spot account
                        (24:00:00 UTC) - Today's initial asset total (00:00:00
                        UTC) - Yesterday's net transfer and deposit. Data update
                        time refers to UTC + 0 time zone. The data maintenance
                        time is 0am - 2am (UTC+0) every day. During this period,
                        yesterday‘s PNL do not displayed.
                      </div>
                      <div className="bn-tooltip-arrow"></div>
                      <i className="gap-fill"></i>
                    </Tooltip>
                    <div className="title-text">Yesterday's PNL</div>
                  </div>
                  <div className="title-icon">
                    <NextIcon />
                  </div>
                </div>
                <FirstLinePnl>
                  <div className="content-section">
                    <div className="content-main">--</div>
                  </div>
                </FirstLinePnl>
                <SecondLinePnl>
                  <div className="content-section">
                    <div className="content-main">--</div>
                  </div>
                </SecondLinePnl>
              </SpotAccountPnl>
            </RightParameter>
          </div>
        </Container>
      </Parameter>
      <FiatSpotTable />
    </App>
  );
};
export default FiatSpotContainer;
