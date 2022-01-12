import { ColLeft, ColRight } from './style';
import BuyForm from './components/BuyForm';
import SellForm from './components/SellForm';
const LimitForm = () => {
  return (
    <>
      <ColLeft>
        <div className="balance">
          <div className="balance-name">Avbl</div>
          <div className="balance-coin">- USDT</div>
        </div>
        <BuyForm />
      </ColLeft>
      <ColRight>
        <div className="balance">
          <div className="balance-name">Avbl</div>
          <div className="balance-coin">- BTC</div>
        </div>
        <SellForm />
      </ColRight>
    </>
  );
};
export default LimitForm;
