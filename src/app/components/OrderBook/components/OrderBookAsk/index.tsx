import { useState, useEffect } from 'react';
import { Price, Amount, Total, Table } from './style';
import numeral from 'numeral';
import { useDispatch, useSelector } from 'react-redux';
import { useOrderbookSlice } from '../../slice';
import { selectGetallpair } from 'app/components/Market/slice/selectors';

const OrderBookAsk = ({ dataApi, dataSocket, miniTable }) => {
  const [dataView, setDataView]: any[] = useState([]);
  const { reselectPair } = useSelector(selectGetallpair);
  const dispatch = useDispatch();
  const { actions } = useOrderbookSlice();
  useEffect(() => {
    setDataView([]);
  }, [reselectPair]);
  useEffect(() => {
    if (dataSocket.asks !== undefined) {
      setDataView(dataSocket.asks);
    } else if (dataSocket.asks === null) {
      setDataView([]);
    } else {
      setDataView(dataApi);
    }
  }, [dataApi, dataSocket]);

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
                <Amount>{numeral(item.quantity).format('0,0.00000')}</Amount>
                <Total>
                  {numeral(item.price * item.quantity).format('0,0.00000')}
                </Total>
              </div>
            );
          })}
      </Table>
    </div>
  );
};
export default OrderBookAsk;
