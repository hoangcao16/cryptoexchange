import { ColLeft, ColRight } from './style';
import BuyForm from './components/BuyForm';
import SellForm from './components/SellForm';
import numeral from 'numeral';
import { useSelector } from 'react-redux';
import { selectGetBalancePair } from '../../slice/selectors';
import { getToken } from 'app/components/common/common';
const LimitForm = ({ wallet }: any) => {
  const type = 'LIMIT';
  const balancePair: any = useSelector(selectGetBalancePair);
  console.log(balancePair.data);
  const baseAmount = balancePair.data.base_amount;
  const quoteAmount = balancePair.data.quote_amount;
  const baseSymbol = JSON.parse(
    JSON.stringify(localStorage.getItem('base_symbol') || ''),
  );
  const quoteSymbol = JSON.parse(
    JSON.stringify(localStorage.getItem('quote_symbol') || ''),
  );
  return (
    <>
      <ColLeft>
        <div className="balance">
          <div className="balance-name">Avbl</div>
          <div className="balance-coin">
            {getToken() ? numeral(quoteAmount).format('0,0.000000') : '-'}{' '}
            {quoteSymbol}
          </div>
        </div>
        <BuyForm
          baseSymbol={baseSymbol}
          quoteSymbol={quoteSymbol}
          quoteAvlb={quoteAmount}
          wallet={wallet}
          type={type}
        />
      </ColLeft>
      <ColRight>
        <div className="balance">
          <div className="balance-name">Avbl</div>
          <div className="balance-coin">
            {getToken() ? numeral(baseAmount).format('0,0.000000') : '-'}{' '}
            {baseSymbol}
          </div>
        </div>
        <SellForm
          baseSymbol={baseSymbol}
          quoteSymbol={quoteSymbol}
          baseAvlb={baseAmount}
          wallet={wallet}
          type={type}
        />
      </ColRight>
    </>
  );
};
export default LimitForm;
