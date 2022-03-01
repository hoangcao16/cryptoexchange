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
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useCurrentPairSlice } from './slice';
import { selectCurrentPair } from './slice/selectors';
import numeral from 'numeral';
import { isEmpty } from 'app/components/common/common';

const ContentHeader = ({ tradeInforSocket, tradeVolumeInforSocket }) => {
  let { pair } = useParams();
  const findIndex: any = pair?.indexOf('_');
  const changeFormatPair: any = `${pair?.substring(
    0,
    findIndex,
  )}/${pair?.substring(findIndex + 1)}`;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { actions } = useCurrentPairSlice();
  const dataCurrentPair: any = useSelector(selectCurrentPair);
  const [price, setPrice] = useState(0);
  const [isPriceUp, setIsPriceUp] = useState(0);
  const [changePrice24h, setChangePrice24h] = useState(0);
  const [changePercent24h, setChangePercent24h] = useState(0);
  const [high24h, setHigh24h] = useState(0);
  const [low24h, setLow24h] = useState(0);
  const [volumeBase24h, setVolumeBase24h] = useState(0);
  const [volumeQuote24h, setVolumeQuote24h] = useState(0);
  useEffect(() => {
    const data = {
      pair: changeFormatPair,
      ts: new Date().getTime(),
    };
    dispatch(actions.getCurrentPairRequest(data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pair]);
  useEffect(() => {
    if (!isEmpty(dataCurrentPair.data)) {
      if (dataCurrentPair.data.price > price) {
        setIsPriceUp(1);
      } else if (dataCurrentPair.data.price < price) {
        setIsPriceUp(2);
      } else if (dataCurrentPair.data.price === price) {
        setIsPriceUp(0);
      }
      setPrice(dataCurrentPair.data.price);
      setChangePrice24h(dataCurrentPair.data.change_price_24h);
      setChangePercent24h(dataCurrentPair.data.change_percent_24h);
      setHigh24h(dataCurrentPair.data.high_24h);
      setLow24h(dataCurrentPair.data.low_24h);
      setVolumeBase24h(dataCurrentPair.data.volume_base_24h);
      setVolumeQuote24h(dataCurrentPair.data.volume_quote_24h);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataCurrentPair.data]);
  useEffect(() => {
    if (!isEmpty(tradeInforSocket)) {
      setPrice(tradeInforSocket.price);
      setChangePrice24h(tradeInforSocket.change_price_24h);
      setChangePercent24h(tradeInforSocket.change_percent_24h);
      setHigh24h(tradeInforSocket.high_24h);
      setLow24h(tradeInforSocket.low_24h);
    }
    if (!isEmpty(tradeVolumeInforSocket)) {
      setVolumeBase24h(tradeVolumeInforSocket.volume_base_24h);
      setVolumeQuote24h(tradeVolumeInforSocket.volume_quote_24h);
    }
  }, [tradeInforSocket, tradeVolumeInforSocket]);
  return (
    <Container>
      <Div>
        <Content>
          <ContentLeft>
            <div className="contentLeft-coin">
              <div className="coin">{changeFormatPair}</div>
              <div className="InformationCoin">
                <OpenIcon />
                <a href="/#">Bitcoin</a>
              </div>
            </div>
          </ContentLeft>
          <div className="nowPrice d-flex flex-column">
            <div
              className="showPrice"
              data-type={
                isPriceUp === 0 ? 'normal' : isPriceUp === 1 ? 'up' : 'down'
              }
            >
              {numeral(price).format('0,0.00')}
            </div>
            <div className="subPrice">${numeral(price).format('0,0.00')}</div>
          </div>
          <ContentRight>
            <div className="contentRightContainer d-flex">
              <div className="ticketList d-flex">
                <div className="ticketItem">
                  <div className="tickerItemLabel">24h {t('change')}</div>
                  <div className="tickerPriceText">
                    <span
                      className="tickerPriceText-value"
                      data-type={
                        changePercent24h === 0
                          ? 'normal'
                          : changePercent24h > 0
                          ? 'up'
                          : 'down'
                      }
                    >
                      {numeral(changePrice24h).format('0,0.00')}&nbsp;
                      {numeral(changePercent24h).format('0,0.00')}%
                    </span>
                  </div>
                </div>
                <div className="ticketItem">
                  <div className="tickerItemLabel">24h {t('high')}</div>
                  <div className="tickerPriceText">
                    <span>{numeral(high24h).format('0,0.00')}</span>
                  </div>
                </div>
                <div className="ticketItem">
                  <div className="tickerItemLabel">24h {t('low')}</div>
                  <div className="tickerPriceText">
                    <span>{numeral(low24h).format('0,0.00')}</span>
                  </div>
                </div>
                <div className="ticketItem">
                  <div className="tickerItemLabel">
                    24h {t('volume')}({pair?.substring(0, findIndex)})
                  </div>
                  <div className="tickerPriceText">
                    <span>{numeral(volumeBase24h).format('0,0.00')}</span>
                  </div>
                </div>
                <div className="ticketItem">
                  <div className="tickerItemLabel">
                    24h {t('volume')}({pair?.substring(findIndex + 1)})
                  </div>
                  <div className="tickerPriceText">
                    <span>{numeral(volumeQuote24h).format('0,0.00')}</span>
                  </div>
                </div>
              </div>
            </div>
          </ContentRight>
        </Content>
        <SpotTutorial>
          <PlayIcon />
          <span>{t('spot-tutorial')}</span>
        </SpotTutorial>
      </Div>
    </Container>
  );
};
export default ContentHeader;
