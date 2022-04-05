import { useState, useEffect } from 'react';
import { Price, Amount, Total, Table } from './style';
import numeral from 'numeral';
import { useDispatch } from 'react-redux';
import { useOrderbookSlice } from '../../slice';
import { isEmpty } from 'app/components/common/common';
// import { selectGetallpair } from 'app/components/Market/slice/selectors';

const OrderBookAsk = ({ dataApi, dataSocket, miniTable }) => {
  const [dataView, setDataView]: any[] = useState([]);
  // const { reselectPair } = useSelector(selectGetallpair);
  const dispatch = useDispatch();
  const { actions } = useOrderbookSlice();
  useEffect(() => {
    if (dataApi?.length > 0) {
      setDataView(dataApi);
    }
    return () => {
      setDataView([]);
    };
  }, [dataApi]);
  useEffect(() => {
    if (
      !isEmpty(dataSocket) &&
      dataSocket.Key === 'PowExchange::OrderBookChange' &&
      dataSocket.Value.side === 'sell'
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
      Array.isArray(dataSocket.Value.asks)
    ) {
      setDataView(dataSocket.Value.asks);
    } else if (
      !isEmpty(dataSocket) &&
      dataSocket.Key === 'PowExchange::OrderBookChange' &&
      dataSocket.Value.asks === undefined &&
      dataSocket.Value.side === undefined
    ) {
      setDataView([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataSocket]);
  const selectPrice = (price: number) => {
    dispatch(actions.selectPrice(price));
  };
  return (
    <div style={{ height: '98%', overflowY: 'auto' }}>
      <Table data-type={miniTable ? 'mini' : 'normal'}>
        {dataView !== undefined &&
          dataView !== null &&
          dataView?.slice(miniTable ? -19 : 0).map((item, index) => {
            return (
              <div
                onClick={() => selectPrice(item.price)}
                key={index}
                className="d-flex justify-content-between table-item"
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
    </div>
  );
};
export default OrderBookAsk;
