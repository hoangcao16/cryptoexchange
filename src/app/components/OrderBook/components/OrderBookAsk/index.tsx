import { data } from './data';
import { Price, Amount, Total, Table } from './style';
import numeral from 'numeral';

const OrderBookAsk = () => {
  return (
    <Table>
      {data.map((item, index) => {
        return (
          <div
            key={index}
            className="d-flex justify-content-between table-item"
          >
            <Price>{numeral(item.price).format('0,0.00')}</Price>
            <Amount>{item.amount}</Amount>
            <Total>{numeral(item.total).format('0,0.00000')}</Total>
          </div>
        );
      })}
    </Table>
  );
};
export default OrderBookAsk;
