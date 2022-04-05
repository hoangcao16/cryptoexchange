import { useState, useEffect } from 'react';
import {
  Price,
  Amount,
  Total,
  OrderBookBidHeader,
  Table,
  Wrapper,
} from './style';
import numeral from 'numeral';
import { BsArrowUp, BsArrowDown } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { selectGetallpair } from 'app/components/Market/slice/selectors';
import { isEmpty } from 'app/components/common/common';
import { useDispatch } from 'react-redux';
import { useOrderbookSlice } from '../../slice';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { darkTheme } from 'theme/theme';

const OrderBookBid = ({ dataApi, dataSocket, miniTable }: any) => {
  const { t } = useTranslation();
  const [dataView, setDataView]: any[] = useState([]);
  const [lastestPrice, setLastestPrice] = useState('');
  const pairData: any = useSelector(selectGetallpair);
  const dispatch = useDispatch();
  const { actions } = useOrderbookSlice();
  let { pair } = useParams();
  const findIndex: any = pair?.indexOf('_');
  const changeFormatPair = `${pair?.substring(0, findIndex)}/${pair?.substring(
    findIndex + 1,
  )}`;

  useEffect(() => {
    const index: any = pairData?.data?.rows?.findIndex((item: any) => {
      return item?.symbol === changeFormatPair;
    });
    if (index !== -1 && index !== undefined) {
      setLastestPrice(pairData?.data?.rows[index]?.latestPrice);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pairData?.data, pair]);
  useEffect(() => {
    if (dataApi?.length > 0) {
      setDataView(dataApi);
    }
    return () => {
      setDataView([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataApi]);
  useEffect(() => {
    if (
      !isEmpty(dataSocket) &&
      dataSocket.Key === 'PowExchange::OrderBookChange' &&
      dataSocket.Value.side === 'buy'
    ) {
      if (dataView === null || dataView === undefined) {
        setDataView([
          {
            price: dataSocket?.Value?.price,
            quantity:
              Number(dataSocket?.Value?.delta) *
              Number(dataSocket?.Value?.sign),
          },
        ]);
      } else if (dataView !== undefined && dataView !== null) {
        const index = dataView.findIndex((item: any) => {
          return item.price === dataSocket?.Value?.price;
        });
        if (index === -1) {
          const dataCopy = [...JSON.parse(JSON.stringify(dataView))];
          dataCopy.push({
            price: dataSocket?.Value.price,
            quantity:
              Number(dataSocket?.Value?.delta) *
              Number(dataSocket?.Value?.sign),
          });
          dataCopy.sort(function (a, b) {
            return b.price - a.price;
          });
          setDataView(dataCopy);
        } else if (index !== -1) {
          const dataCopy = [...JSON.parse(JSON.stringify(dataView))];
          const sumQuantity = Number(
            (
              Number(dataCopy[index].quantity) +
              Number(dataSocket?.Value.delta * dataSocket?.Value.sign)
            ).toPrecision(5),
          );
          if (sumQuantity > 0) {
            dataCopy[index].quantity = sumQuantity;
            setDataView(dataCopy);
          } else if (sumQuantity === 0 || sumQuantity < 0) {
            dataCopy.splice(index, 1);
            setDataView(dataCopy);
          }
        }
      }
    } else if (
      !isEmpty(dataSocket) &&
      dataSocket.Key === 'PowExchange::OrderBookChange' &&
      Array.isArray(dataSocket.Value.bids)
    ) {
      setDataView(dataSocket.Value.bids);
    } else if (
      !isEmpty(dataSocket) &&
      dataSocket.Key === 'PowExchange::OrderBookChange' &&
      dataSocket.Value.bids === undefined &&
      dataSocket.Value.side === undefined
    ) {
      setDataView([]);
    }
    if (!isEmpty(dataSocket) && dataSocket.Key === 'RobinhoodPair') {
      if (!isEmpty(dataSocket.Value)) {
        if (dataSocket.Value.symbol === changeFormatPair) {
          setLastestPrice(dataSocket.Value?.latestPrice);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataSocket]);
  const selectPrice = (price: number) => {
    dispatch(actions.selectPrice(price));
  };
  const handleMove = index => {
    if (miniTable) {
    }
  };
  return (
    <Wrapper>
      <OrderBookBidHeader>
        <div className="d-flex align-items-center">
          <div
            className="contractPrice"
            // data-type={
            //   dataMarketSocket?.isPriceUp
            //     ? 'up'
            //     : dataMarketSocket?.isPriceUp === false
            //     ? 'down'
            //     : ''
            // }
          >
            {numeral(lastestPrice).format('0,0.000')}
            {/* {dataMarketSocket?.isPriceUp ? (
              <BsArrowUp />
            ) : dataMarketSocket?.isPriceUp === false ? (
              <BsArrowDown />
            ) : null} */}
          </div>
          <div className="markPrice">
            ${numeral(lastestPrice).format('0,0.0')}
          </div>
        </div>
        <a href="/#" className="readmore">
          {t('more')}
        </a>
      </OrderBookBidHeader>
      {/* <div style={{ height: '92%', zIndex: 5 }} className="wrapper-table"> */}
      <Table data-type={miniTable ? 'mini' : 'normal'}>
        {dataView !== undefined &&
          dataView !== null &&
          dataView
            ?.slice(miniTable && 0, miniTable ? 15 : 0)
            ?.map((item, index) => {
              return (
                <div
                  key={index}
                  className="d-flex table-item"
                  onClick={() => selectPrice(item.price)}
                  onMouseOver={() => handleMove(index)}
                >
                  <Price>{numeral(item.price).format('0,0.000')}</Price>
                  <Amount>
                    {numeral(Math.abs(item.quantity)).format('0,0.00000')}
                  </Amount>
                  <Total>
                    {numeral(Math.abs(item.price * item.quantity)).format(
                      '0,0.00000',
                    )}
                  </Total>
                </div>
              );
            })}
      </Table>
      {/* </div> */}
    </Wrapper>
  );
};
export default OrderBookBid;
