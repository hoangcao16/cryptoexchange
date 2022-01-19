import numeral from 'numeral';
import { Price, Amount, Time, Table } from './style';
import moment from 'moment';
const MarketTrades = ({ data }: any) => {
  return (
    <Table>
      {data.map((item, index) => {
        return (
          <div
            key={index}
            className="d-flex justify-content-between table-item"
          >
            <Price data-type={item.isPriceUp ? 'up' : 'down'}>
              {numeral(item.price).format('0,0.00')}
            </Price>
            <Amount>{numeral(item.amount).format('0,0.00000')}</Amount>
            <Time>{moment(item.ts * 1000).format('HH:mm:ss')}</Time>
          </div>
        );
      })}
    </Table>
  );
};
export default MarketTrades;
