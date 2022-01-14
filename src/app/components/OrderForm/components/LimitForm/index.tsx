import { ColLeft, ColRight } from './style';
import BuyForm from './components/BuyForm';
import SellForm from './components/SellForm';
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
            {quoteAvlb} {quoteSymbol}
          </div>
        </div>
        <BuyForm
          baseSymbol={baseSymbol}
          quoteSymbol={quoteSymbol}
          baseAvlb={baseAvlb}
          quoteAvlb={quoteAvlb}
          wallet={wallet}
          type={type}
        />
      </ColLeft>
      <ColRight>
        <div className="balance">
          <div className="balance-name">Avbl</div>
          <div className="balance-coin">
            {baseAvlb} {baseSymbol}
          </div>
        </div>
        <SellForm
          baseSymbol={baseSymbol}
          quoteSymbol={quoteSymbol}
          wallet={wallet}
          type={type}
        />
      </ColRight>
    </>
  );
};
export default LimitForm;
