import { data } from './data';
import { Price, Amount, Total, OrderBookBidHeader } from './style';
import { BsArrowUp } from 'react-icons/bs';
const OrderBookBid = () => {
  return (
    <div>
      <OrderBookBidHeader>
        <div className="d-flex align-items-center">
          <div className="contractPrice">
            49,832.97
            <BsArrowUp />
          </div>
          <div className="markPrice">$49,838.53</div>
        </div>
        <a href="/#" className="readmore">
          More
        </a>
      </OrderBookBidHeader>
      {data.map((item, index) => {
        return (
          <div key={index} className="d-flex">
            <Price>{item.price}</Price>
            <Amount>{item.amount}</Amount>
            <Total>{item.total}</Total>
          </div>
        );
      })}
    </div>
  );
};
export default OrderBookBid;
