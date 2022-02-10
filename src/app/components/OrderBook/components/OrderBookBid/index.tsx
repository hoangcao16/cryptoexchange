import { useState, useEffect } from 'react';
import { Price, Amount, Total, OrderBookBidHeader, Table } from './style';
import numeral from 'numeral';
import { BsArrowUp, BsArrowDown } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { selectGetallpair } from 'app/components/Market/slice/selectors';
import { isEmpty } from 'app/components/common/common';
import { useDispatch } from 'react-redux';
import { useOrderbookSlice } from '../../slice';
import { useParams } from 'react-router-dom';

const OrderBookBid = ({
  dataApi,
  dataSocket,
  dataMarketSocket,
  miniTable,
}: any) => {
  const [dataView, setDataView]: any[] = useState([]);
  const [lastestPrice, setLastestPrice] = useState('');
  const [mockUSD, setMockUSD] = useState(0);
  const pairData: any = useSelector(selectGetallpair);
  const dispatch = useDispatch();
  const { actions } = useOrderbookSlice();
  let { pair } = useParams();
  useEffect(() => {
    setInterval(() => {
      setMockUSD(Math.random() * (5000 - 50 + 1) + 50);
    }, 1000);
  }, []);
  useEffect(() => {
    if (dataSocket.bids !== undefined) {
      setDataView(dataSocket.bids);
    } else if (dataSocket.bids === null) {
      setDataView([]);
    } else {
      setDataView(dataApi);
    }
    if (!isEmpty(dataMarketSocket)) {
      if (dataMarketSocket.symbol === pair) {
        setLastestPrice(dataMarketSocket?.latestPrice);
      }
    } else {
      const index: any = pairData?.data?.list?.findIndex((item: any) => {
        return item?.symbol === pair;
      });
      if (index !== -1 && index !== undefined) {
        setLastestPrice(pairData?.data?.list[index]?.latestPrice);
      }
    }
  }, [dataApi, dataSocket, dataMarketSocket, pairData?.data, pair]);
  const selectPrice = (price: number) => {
    dispatch(actions.selectPrice(price));
  };
  return (
    <>
      <OrderBookBidHeader>
        <div className="d-flex align-items-center">
          <div
            className="contractPrice"
            data-type={
              dataMarketSocket?.isPriceUp
                ? 'up'
                : dataMarketSocket?.isPriceUp === false
                ? 'down'
                : ''
            }
          >
            {numeral(lastestPrice).format('0,0.000')}
            {dataMarketSocket?.isPriceUp ? (
              <BsArrowUp />
            ) : dataMarketSocket?.isPriceUp === false ? (
              <BsArrowDown />
            ) : null}
          </div>
          <div className="markPrice">${numeral(mockUSD).format('0,0.0')}</div>
        </div>
        <a href="/#" className="readmore">
          More
        </a>
      </OrderBookBidHeader>
      <div style={{ height: '92%', overflowY: 'auto' }}>
        <Table data-type={miniTable ? 'mini' : 'normal'}>
          {dataView !== undefined &&
            dataView !== null &&
            dataView?.map((item, index) => {
              return (
                <div
                  key={index}
                  className="d-flex table-item"
                  onClick={() => selectPrice(item.price)}
                >
                  <Price>{numeral(item.price).format('0,0.000')}</Price>
                  <Amount>{numeral(item.quantity).format('0,0.00000')}</Amount>
                  <Total>
                    {numeral(item.price * item.quantity).format('0,0.00000')}
                  </Total>
                </div>
              );
            })}
        </Table>
      </div>
    </>
  );
};
export default OrderBookBid;
