import { ReactComponent as SearchIcon } from 'app/assets/img/search.svg';
import { ReactComponent as StarIcon } from 'app/assets/img/star.svg';
import { SampleNextArrow, SamplePrevArrow } from './components/arrow';
import Header from './components/Header';
import { useState } from 'react';
import {
  Container,
  SearchBox,
  StyledSlick,
  Pair,
  Price,
  Change,
  Table,
} from './style';
import { useGlobalContext } from '../common/context';
import numeral from 'numeral';

const Trades = ({ data }) => {
  const [active, setActive] = useState('USDT');
  const { activeChangeColumnMarket } = useGlobalContext();

  const MenuSlick = () => {
    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 6,
      slidesToScroll: 1,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
    };
    return (
      <StyledSlick {...settings}>
        <StarIcon
          className={
            active === 'Favor' ? 'star-icon slickItem-active' : 'star-icon'
          }
          onClick={() => setActive('Favor')}
        />
        <span
          className={active === 'BUSD' ? 'slickItem-active' : ''}
          onClick={() => setActive('BUSD')}
        >
          BUSD
        </span>
        <span
          className={active === 'USDT' ? 'slickItem-active' : ''}
          onClick={() => setActive('USDT')}
        >
          USDT
        </span>
        <span
          className={active === 'BNB' ? 'slickItem-active' : ''}
          onClick={() => setActive('BNB')}
        >
          BNB
        </span>
        <span
          className={active === 'BTC' ? 'slickItem-active' : ''}
          onClick={() => setActive('BTC')}
        >
          BTC
        </span>
        <span
          className={active === 'ALTS' ? 'slickItem-active' : ''}
          onClick={() => setActive('ALTS')}
        >
          ALTS
        </span>
        <span
          className={active === 'ZONE' ? 'slickItem-active' : ''}
          onClick={() => setActive('ZONE')}
        >
          ZONE
        </span>
      </StyledSlick>
    );
  };
  return (
    <Container>
      <SearchBox>
        <div className="search-icon">
          <SearchIcon />
        </div>
        <input placeholder="Search" />
      </SearchBox>
      <MenuSlick />
      <Header />
      <Table>
        <div className="d-flex justify-content-between table-item align-items-center">
          {data.symbol && (
            <>
              <Pair className="d-flex align-items-center">
                <StarIcon className="tableItem-star" />
                {data.symbol}
              </Pair>
              <Price data-type={data.isPriceUp ? 'up' : 'down'}>
                {numeral(data.latestPrice).format('0,0.00000000')}
              </Price>
              {activeChangeColumnMarket ? (
                <Change data-type={data.change24h < 0 ? 'down' : 'up'}>
                  {numeral(data.change24h).format('0,0.00')}%
                </Change>
              ) : (
                <Change>{data.volume24h}M</Change>
              )}
            </>
          )}
        </div>
      </Table>
    </Container>
  );
};
export default Trades;
