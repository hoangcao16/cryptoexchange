/* eslint-disable @typescript-eslint/no-unused-vars */
import FormInput from '../../../FormInput';
import AuthButton from '../../../AuthButton';
import { useForm } from 'react-hook-form';
import SliderBar from '../../../SliderBar';
import { getToken } from 'app/components/common/common';
import { Button } from '../../style';
import { useDispatch } from 'react-redux';
import { useBuyspotlimitSlice } from './slice';
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

const BuyForm = ({ baseSymbol, quoteSymbol, quoteAvlb, wallet, type }: any) => {
  const dispatch = useDispatch();
  const { actions } = useBuyspotlimitSlice();
  const [percent, setPercent] = useState(0);
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
    formState: { errors },
  } = useForm<SubmitForm>({
    resolver: yupResolver(validation),
  });
  // getvalues slider
  const onChangeSlider = (value: number) => {
    setPercent(value);
  };
  // submit form
  const onSubmitBuy = (data: any) => {
    console.log(data);
    const ts = new Date().getTime();
    dispatch(
      actions.buyspotlimitRequest({
        ...data,
        userId,
        baseSymbol,
        quoteSymbol,
        wallet,
        type,
        ts,
      }),
    );
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmitBuy)}>
        <FormInput
          prefix="Price"
          suffix={quoteSymbol}
          id="price"
          regis={register('price')}
        />
        <FormInput
          prefix="Amount"
          suffix={baseSymbol}
          id="amount"
          regis={register('amount')}
        />
        <SliderBar change={onChangeSlider} defaultpercent={percent} />
        {getToken() ? (
          <FormInput
            prefix="Total"
            suffix={quoteSymbol}
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
    </>
  );
};
export default BuyForm;
