import { useState, useEffect } from 'react';
import { Price, Amount, Total, Table, Wrapper } from './style';
import numeral from 'numeral';
import { useDispatch } from 'react-redux';
import { useOrderbookSlice } from '../../slice';
import { isEmpty } from 'app/components/common/common';
import { darkTheme } from 'theme/theme';
import { useParams } from 'react-router-dom';
// import { selectGetallpair } from 'app/components/Market/slice/selectors';

const OrderBookAsk = ({ dataApi, dataSocket, miniTable }) => {
  const params = useParams();
  const pair = params?.pair?.split('_');
  const [dataView, setDataView]: any[] = useState([]);
  // const { reselectPair } = useSelector(selectGetallpair);
  const dispatch = useDispatch();
  const { actions } = useOrderbookSlice();
  const [currentHover, setCurrentHover] = useState(0);
  const [avgPrice, setAvgPrice] = useState(0);
  const [sum1, setSum1] = useState(0);
  const [sum2, setSum2] = useState(0);

  const handleMove = index => {
    setCurrentHover(index + 1);
    let totalSum1 = 0;
    let totalSum2 = 0;
    let totalPrice = 0;

    if (miniTable) {
      let numberOrder = dataView
        ?.slice(-19)
        ?.filter((item, i) => i >= index)?.length;
      dataView
        ?.slice(-19)
        ?.filter((item, i) => i >= index)
        ?.forEach(item => {
          totalSum1 += Number(item?.quantity);
          totalPrice += Number(item?.price);
        });
      if (numberOrder && totalSum1 && totalPrice) {
        setSum1(totalSum1 / numberOrder);
        setAvgPrice(totalPrice / numberOrder);
        setSum2((totalSum1 * totalPrice) / numberOrder);
      }
    } else {
      let numberOrder = dataView?.filter((item, i) => i >= index)?.length;
      dataView
        ?.filter((item, i) => i >= index)
        ?.forEach(item => {
          totalSum1 += Number(item?.quantity);
          totalPrice += Number(item?.price);
        });
      if (numberOrder && totalSum1 && totalPrice) {
        setSum1(totalSum1 / numberOrder);
        setAvgPrice(totalPrice / numberOrder);
        setSum2((totalSum1 * totalPrice) / numberOrder);
      }
    }
  };

  const HandleOut = index => {
    setCurrentHover(0);
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
      <Table data-type={miniTable ? 'mini' : 'normal'}>
        {dataView !== undefined &&
          dataView !== null &&
          dataView?.slice(miniTable ? -19 : 0).map((item, index) => {
            return (
              <div
                onClick={() => selectPrice(item.price)}
                key={index}
                className="d-flex justify-content-between table-item"
                onMouseOver={e => handleMove(index)}
                onMouseOut={e => HandleOut(index)}
                style={{
                  backgroundColor:
                    index >= currentHover - 1 && currentHover !== 0
                      ? darkTheme.brightGrayColorBlur
                      : 'inherit',
                }}
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
                <div
                  className="info"
                  style={{
                    display: currentHover - 1 === index ? 'block' : 'none',
                  }}
                >
                  <p>
                    <span className="label">Avg. price :</span>
                    <span> ≈ {avgPrice.toFixed(5)}</span>
                  </p>
                  <p>
                    <span className="label">Sum {pair ? pair[0] : ''} :</span>
                    <span> {sum1.toFixed(5)}</span>
                  </p>
                  <p>
                    <span className="label">Sum {pair ? pair[1] : ''} :</span>
                    <span> {sum2.toFixed(5)}</span>
                  </p>
                </div>
              </div>
            );
          })}
      </Table>
    </Wrapper>
  );
};
export default OrderBookAsk;
