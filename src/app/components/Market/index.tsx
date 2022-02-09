import { ReactComponent as SearchIcon } from 'app/assets/img/search.svg';
import { ReactComponent as StarIcon } from 'app/assets/img/star.svg';
import { SampleNextArrow, SamplePrevArrow } from './components/arrow';
import Header from './components/Header';
import { useState, useEffect } from 'react';
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
import { isEmpty } from 'app/components/common/common';
import { useDispatch } from 'react-redux';
import { useGetallpairSlice } from './slice';

const Market = ({ dataSocket, dataApi, socket }) => {
  const [active, setActive] = useState('USDT');
  const [allPair, setAllPair]: any[] = useState([]);
  const dispatch = useDispatch();
  const { actions } = useGetallpairSlice();
  const { activeChangeColumnMarket } = useGlobalContext();
  useEffect(() => {
    if (dataApi.data.rows && isEmpty(dataSocket)) {
      setAllPair(dataApi.data.rows);
      socket.send(
        JSON.stringify({
          method: 'SUBSCRIBE',
          pair: dataApi.data.rows[0].symbol,
        }),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataApi.data.rows]);
  useEffect(() => {
    if (!isEmpty(dataSocket)) {
      if (allPair.length === 0) {
        setAllPair([dataSocket]);
      } else {
        const index = allPair?.findIndex((item: any) => {
          return item.symbol === dataSocket?.symbol;
        });
        if (index !== -1 && allPair !== undefined) {
          const copyData = [...JSON.parse(JSON.stringify(allPair))];
          copyData[index].latestPrice = dataSocket?.latestPrice;
          copyData[index].changes = dataSocket?.change24h;
          copyData[index].volume = dataSocket?.volume24h;
          setAllPair(copyData);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataSocket]);

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
  const setPair = data => {
    const index = data.symbol.indexOf('/');
    if (localStorage.getItem('pair') !== data.symbol) {
      socket.send(
        JSON.stringify({
          method: 'SUBSCRIBE',
          pair: data.symbol,
        }),
      );
      socket.send(
        JSON.stringify({
          method: 'UNSUBSCRIBE',
          pair: localStorage.getItem('pair'),
        }),
      );
    }
    localStorage.setItem('base_symbol', data.symbol.substring(0, index));
    localStorage.setItem('quote_symbol', data.symbol.substring(index + 1));
    localStorage.setItem('pair', data.symbol);
    localStorage.setItem('pair_id', data.id);
    dispatch(actions.reselectPair());
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
        {allPair !== undefined &&
          allPair?.map((item, index) => {
            return (
              <div
                className="d-flex justify-content-between table-item align-items-center"
                key={index}
                onClick={() => setPair(item)}
              >
                <Pair className="d-flex align-items-center">
                  <StarIcon className="tableItem-star" />
                  {item.symbol && item.symbol.toUpperCase()}
                </Pair>
                <Price data-type={item.isPriceUp ? 'up' : 'down'}>
                  {numeral(item.latestPrice).format('0,0.00000000')}
                </Price>
                {activeChangeColumnMarket ? (
                  <Change data-type={item.changes < 0 ? 'down' : 'up'}>
                    {numeral(item.changes).format('0,0.00')}%
                  </Change>
                ) : (
                  <Change>{item.volume}M</Change>
                )}
              </div>
            );
          })}
      </Table>
    </Container>
  );
};
export default Market;
