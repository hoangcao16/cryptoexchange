import { data } from './data';
import { Price, Amount, Total, Table } from './style';
const OrderBookAsk = () => {
  return (
    <Table>
      {data.map((item, index) => {
        return (
          <div
            key={index}
            className="d-flex justify-content-between table-item"
          >
            <Price>{item.price}</Price>
            <Amount>{item.amount}</Amount>
            <Total>{item.total}</Total>
          </div>
        );
      })}
    </Table>
  );
};
export default OrderBookAsk;
