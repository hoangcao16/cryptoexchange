import { ColLeft, ColRight } from './style';
import BuyForm from './components/BuyForm';
import SellForm from './components/SellForm';
import numeral from 'numeral';
const LimitForm = ({
  baseSymbol,
  quoteSymbol,
  baseAvlb,
  quoteAvlb,
  wallet,
  type,
}: any) => {
  return (
    <>
      <ColLeft>
        <div className="balance">
          <div className="balance-name">Avbl</div>
          <div className="balance-coin">
            {numeral(quoteAvlb).format('0,0.000000')} {quoteSymbol}
          </div>
        </div>
        <BuyForm
          baseSymbol={baseSymbol}
          quoteSymbol={quoteSymbol}
          quoteAvlb={quoteAvlb}
          wallet={wallet}
          type={type}
        />
      </ColLeft>
      <ColRight>
        <div className="balance">
          <div className="balance-name">Avbl</div>
          <div className="balance-coin">
            {numeral(baseAvlb).format('0,0.000000')} {baseSymbol}
          </div>
        </div>
        <SellForm
          baseSymbol={baseSymbol}
          quoteSymbol={quoteSymbol}
          baseAvlb={baseAvlb}
          wallet={wallet}
          type={type}
        />
      </ColRight>
    </>
  );
};
export default LimitForm;
