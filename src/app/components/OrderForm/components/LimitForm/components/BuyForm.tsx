import FormInput from '../../FormInput';
import AuthButton from '../..//AuthButton';
import { useForm } from 'react-hook-form';
import SliderBar from '../../SliderBar';
import { getToken } from 'app/components/common/common';
import { Button } from '../style';

const BuyForm = () => {
  const { register, handleSubmit } = useForm();
  // submit form
  const onSubmitBuy = (data: any) => {
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmitBuy)}>
      <FormInput
        prefix="Price"
        suffix="USDT"
        id="price"
        regis={register('price')}
      />
      <FormInput
        prefix="Amount"
        suffix="BTC"
        id="amount"
        regis={register('amount')}
      />
      <SliderBar />
      {getToken() ? (
        <FormInput
          prefix="Total"
          suffix="USDT"
          id="total"
          regis={register('total')}
        />
      ) : (
        ''
      )}
      {getToken() ? (
        <Button data-type="buyButton" id="orderformBuyBtn" type="submit">
          Buy BTC
        </Button>
      ) : (
        <AuthButton />
      )}
    </form>
  );
};
export default BuyForm;
