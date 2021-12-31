import { ColLeft, ColRight } from './style';
import FormInput, { FormInputDisabled } from '../FormInput';
import AuthButton from '../AuthButton';
import SliderBar from '../SliderBar';
const MarketForm = () => {
  return (
    <>
      <ColLeft>
        <div className="balance">
          <div className="balance-name">Avbl</div>
          <div className="balance-coin">- USDT</div>
        </div>
        <form>
          <FormInputDisabled prefix="Price" suffix="USDT" id="price" />
          <FormInput prefix="Total" suffix="USDT" id="amount" />
          <SliderBar />
          <AuthButton />
        </form>
      </ColLeft>
      <ColRight>
        <div className="balance">
          <div className="balance-name">Avbl</div>
          <div className="balance-coin">- BTC</div>
        </div>
        <form>
          <FormInputDisabled prefix="Price" suffix="USDT" id="price-coin" />
          <FormInput prefix="Amount" suffix="BTC" id="amount-coin" />
          <SliderBar />
          <AuthButton />
        </form>
      </ColRight>
    </>
  );
};
export default MarketForm;
