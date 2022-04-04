import { useState, useEffect } from 'react';
import { Price, Amount, Total, Table, Wrapper } from './style';
import numeral from 'numeral';
import { useDispatch } from 'react-redux';
import { useOrderbookSlice } from '../../slice';
import { isEmpty } from 'app/components/common/common';
import { darkTheme } from 'theme/theme';
// import { selectGetallpair } from 'app/components/Market/slice/selectors';

const OrderBookAsk = ({ dataApi, dataSocket, miniTable }) => {
  const [dataView, setDataView]: any[] = useState([]);
  const [coverHeight, setCoverHeight] = useState(0);
  // const { reselectPair } = useSelector(selectGetallpair);
  const dispatch = useDispatch();
  const { actions } = useOrderbookSlice();

  const handleMove = index => {
    if (miniTable) {
      setCoverHeight(96 - 96 * (index / 19));
    }
  };

  useEffect(() => {
    if (dataApi?.length > 0 && isEmpty(dataSocket)) {
      setDataView(dataApi);
    } else {
      if (!isEmpty(dataSocket)) {
        if (dataView === null || dataView === undefined) {
          setDataView([
            {
              price: dataSocket?.price,
              quantity: Number(dataSocket?.delta) * Number(dataSocket?.sign),
            },
          ]);
        } else if (dataView !== undefined && dataView !== null) {
          const index = dataView.findIndex((item: any) => {
            return item.price === dataSocket?.price;
          });
          if (index === -1) {
            const dataCopy = [...JSON.parse(JSON.stringify(dataView))];
            dataCopy.push({
              price: dataSocket.price,
              quantity: Number(dataSocket?.delta) * Number(dataSocket?.sign),
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
                Number(dataSocket.delta * dataSocket.sign)
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
      }
    }

    return () => {
      setDataView([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataApi, dataSocket]);

  const selectPrice = (price: number) => {
    dispatch(actions.selectPrice(price));
  };
  return (
    <Wrapper style={{ height: '98%', zIndex: 5 }}>
      <Table
        data-type={miniTable ? 'mini' : 'normal'}
        onMouseOut={() => setCoverHeight(0)}
      >
        {dataView !== undefined &&
          dataView !== null &&
          dataView?.slice(miniTable ? -19 : 0).map((item, index) => {
            return (
              <div
                onClick={() => selectPrice(item.price)}
                key={index}
                className="d-flex justify-content-between table-item"
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
      <div
        className="cover"
        style={{
          height: ` ${coverHeight}% `,
          borderTop:
            coverHeight === 0 ? 0 : `1px dashed ${darkTheme.brightGrayColor}`,
        }}
      >
        <div
          className="info"
          style={{ display: coverHeight === 0 ? 'none' : 'block' }}
        >
          <p>Average price: $100</p>
          <p>SUM B2: </p>
          <p>SUM USDT: </p>
        </div>
      </div>
    </Wrapper>
  );
};
export default OrderBookAsk;
