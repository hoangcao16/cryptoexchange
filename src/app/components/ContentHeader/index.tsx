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

const ContentHeader = () => {
  let { pair } = useParams();
  const findIndex: any = pair?.indexOf('_');
  const { t } = useTranslation();
  return (
    <Container>
      <Div>
        <Content>
          <ContentLeft>
            <div className="contentLeft-coin">
              <div className="coin">
                {pair?.substring(0, findIndex)}/{pair?.substring(findIndex + 1)}
              </div>
              <div className="InformationCoin">
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
                  <div className="tickerItemLabel">24h {t('change')}</div>
                  <div className="tickerPriceText">
                    <span style={{ color: 'rgb(116, 167, 0)' }}>
                      629.10 +1.26%
                    </span>
                  </div>
                </div>
                <div className="ticketItem">
                  <div className="tickerItemLabel">24h {t('high')}</div>
                  <div className="tickerPriceText">
                    <span>51,280.00</span>
                  </div>
                </div>
                <div className="ticketItem">
                  <div className="tickerItemLabel">
                    24h {t('volume')}({pair?.substring(0, findIndex)})
                  </div>
                  <div className="tickerPriceText">
                    <span>21,501.52</span>
                  </div>
                </div>
                <div className="ticketItem">
                  <div className="tickerItemLabel">
                    24h {t('volume')}({pair?.substring(findIndex + 1)})
                  </div>
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
          <span>{t('spot-tutorial')}</span>
        </SpotTutorial>
      </Div>
    </Container>
  );
};
export default ContentHeader;
