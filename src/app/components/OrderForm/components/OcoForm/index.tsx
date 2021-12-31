import { ColLeft, ColRight } from './style';
import FormInput from '../FormInput';
import AuthButton from '../AuthButton';
import SliderBar from '../SliderBar';
const StopLitmitForm = () => {
  return (
    <>
      <ColLeft>
        <div className="balance">
          <div className="balance-name">Avbl</div>
          <div className="balance-coin">- USDT</div>
        </div>
        <form>
          <FormInput prefix="Price" suffix="USDT" id="price" />
          <FormInput prefix="Stop" suffix="USDT" id="stop" />
          <FormInput prefix="Limit" suffix="USDT" id="limit" />
          <FormInput prefix="Amount" suffix="BTC" id="amount" />
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
          <FormInput prefix="Price" suffix="USDT" id="price-coin" />
          <FormInput prefix="Stop" suffix="USDT" id="stop-coin" />
          <FormInput prefix="Limit" suffix="USDT" id="limit-coin" />
          <FormInput prefix="Amount" suffix="BTC" id="amount-coin" />
          <SliderBar />
          <AuthButton />
        </form>
      </ColRight>
    </>
  );
};
export default StopLitmitForm;
