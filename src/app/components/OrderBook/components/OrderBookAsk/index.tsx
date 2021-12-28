import { data } from './data';
import { Price, Amount, Total } from './style';
const OrderBookAsk = () => {
  return (
    <div>
      {data.map((item, index) => {
        return (
          <div key={index} className="d-flex justify-content-between">
            <Price>{item.price}</Price>
            <Amount>{item.amount}</Amount>
            <Total>{item.total}</Total>
          </div>
        );
      })}
    </div>
  );
};
export default OrderBookAsk;
