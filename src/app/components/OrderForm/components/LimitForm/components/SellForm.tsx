import FormInput from '../../FormInput';
import AuthButton from '../..//AuthButton';
import { useForm } from 'react-hook-form';
import SliderBar from '../../SliderBar';
import { getToken } from 'app/components/common/common';
import { Button } from '../style';

const SellForm = () => {
  const { register, handleSubmit } = useForm();
  // submit form
  const onSubmitSell = (data: any) => {
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmitSell)}>
      <FormInput
        prefix="Price"
        suffix="USDT"
        id="price-sell"
        regis={register('price')}
      />
      <FormInput
        prefix="Amount"
        suffix="BTC"
        id="amount-sell"
        regis={register('amount')}
      />
      <SliderBar />
      {getToken() ? (
        <FormInput
          prefix="Total"
          suffix="USDT"
          id="total-sell"
          regis={register('total')}
        />
      ) : (
        ''
      )}
      {getToken() ? (
        <Button data-type="sellButton" id="orderformSellBtn" type="submit">
          Sell BTC
        </Button>
      ) : (
        <AuthButton />
      )}
    </form>
  );
};
export default SellForm;
