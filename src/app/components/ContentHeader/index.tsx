import {
  Container,
  Div,
  Content,
  SpotTutorial,
  ContentLeft,
  ContentRight,
} from './style';
import { ReactComponent as PlayIcon } from 'app/assets/img/play.svg';
import { ReactComponent as OpenIcon } from 'app/assets/img/openIcon.svg';
import { useEffect, useState } from 'react';
const getPairName = () => {
  return JSON.parse(JSON.stringify(localStorage.getItem('pair')) || '');
};
const ContentHeader = () => {
  const [pairName, setPairName] = useState('');
  useEffect(() => {
    setPairName(getPairName());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localStorage.getItem('pair')]);
  return (
    <Container>
      <Div>
        <Content>
          <ContentLeft>
            <div className="contentLeft-coin">
              <div className="coin">{pairName}</div>
              <div className="InfomationCoin">
                <OpenIcon />
                <a href="/#">Bitcoin</a>
              </div>
            </div>
          </ContentLeft>
          <div className="nowPrice d-flex flex-column">
            <div className="showPrice" style={{ color: 'rgb(234, 0, 112)' }}>
              50,644.32
            </div>
            <div className="subPrice">$50,645.18</div>
          </div>
          <ContentRight>
            <div className="contentRightContainer d-flex">
              <div className="ticketList d-flex">
                <div className="ticketItem">
                  <div className="tickerItemLabel">24h Change</div>
                  <div className="tickerPriceText">
                    <span style={{ color: 'rgb(116, 167, 0)' }}>
                      629.10 +1.26%
                    </span>
                  </div>
                </div>
                <div className="ticketItem">
                  <div className="tickerItemLabel">24h High</div>
                  <div className="tickerPriceText">
                    <span>51,280.00</span>
                  </div>
                </div>
                <div className="ticketItem">
                  <div className="tickerItemLabel">24h Volume(BTC)</div>
                  <div className="tickerPriceText">
                    <span>21,501.52</span>
                  </div>
                </div>
                <div className="ticketItem">
                  <div className="tickerItemLabel">24h Volume(USDT)</div>
                  <div className="tickerPriceText">
                    <span>1,086,001,682.32</span>
                  </div>
                </div>
              </div>
            </div>
          </ContentRight>
        </Content>
        <SpotTutorial>
          <PlayIcon />
          <span>Spot Tutorial</span>
        </SpotTutorial>
      </Div>
    </Container>
  );
};
export default ContentHeader;
