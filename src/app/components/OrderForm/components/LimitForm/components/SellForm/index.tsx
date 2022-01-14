import FormInput from '../../../FormInput';
import AuthButton from '../../../AuthButton';
import { useForm } from 'react-hook-form';
import SliderBar from '../../../SliderBar';
import { getToken } from 'app/components/common/common';
import { Button } from '../../style';
import { useDispatch } from 'react-redux';
import { useSellspotlimitSlice } from './slice';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { authService } from 'services/authService';

//declare type
type SubmitForm = {
  price: number;
  amount: number;
  total: number;
  // percent: number;
};
const SellForm = ({ baseSymbol, quoteSymbol, wallet, type }: any) => {
  const dispatch = useDispatch();
  const [percent, setPercent] = useState(0);
  const { actions } = useSellspotlimitSlice();
  const userId: any = JSON.parse(authService.getUserId() || '{}');

  //Validate
  const validation = Yup.object().shape({
    price: Yup.number().required('Invalid price'),
    amount: Yup.number().required('Invalid amount'),
    total: Yup.number().required('Invalid total'),
    // percent: Yup.number().required('Invalid percent'),
  });
  const {
    register,
    handleSubmit,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    formState: { errors },
  } = useForm<SubmitForm>({
    resolver: yupResolver(validation),
  });
  // getvalues slider
  const onChangeSlider = (value: number) => {
    setPercent(value);
  };
  // submit form
  const onSubmitSell = (data: any) => {
    console.log(data);
    dispatch(
      actions.sellspotlimitRequest({
        ...data,
        userId,
        percent,
        baseSymbol,
        quoteSymbol,
        wallet,
        type,
      }),
    );
  };
  return (
    <form onSubmit={handleSubmit(onSubmitSell)}>
      <FormInput
        prefix="Price"
        suffix={quoteSymbol}
        id="price-sell"
        regis={register('price')}
      />
      <FormInput
        prefix="Amount"
        suffix={baseSymbol}
        id="amount-sell"
        regis={register('amount')}
      />
      <SliderBar change={onChangeSlider} defaultpercent={percent} />
      {getToken() ? (
        <FormInput
          prefix="Total"
          suffix={quoteSymbol}
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
