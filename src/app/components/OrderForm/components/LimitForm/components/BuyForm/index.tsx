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
import { Tooltip } from 'antd';
//declare type
type SubmitForm = {
  price: number;
  amount: number;
  total: number;
};

const BuyForm = ({ baseSymbol, quoteSymbol, quoteAvlb, wallet, type }: any) => {
  const dispatch = useDispatch();
  const { actions } = useBuyspotlimitSlice();
  const [percent, setPercent] = useState(0);
  const userId: any = JSON.parse(authService.getUserId() || '{}');

  //Validate
  const validation = Yup.object().shape({
    price: Yup.number()
      .required('Invalid price')
      .min(0, 'Price must be greater than 0')
      .typeError('Invalid price')
      .nullable(true),
    amount: Yup.number()
      .required('Invalid amount')
      .min(0, 'Amount must be greater than 0')
      // .max(quoteAvlb / priceinput, `Max amount ${quoteAvlb / priceinput}`)
      .typeError('Invalid amount')
      .nullable(true),
    total: Yup.number()
      .required('Invalid total')
      .min(0, 'Total must be greater than 0')
      .max(quoteAvlb, `Max ${quoteAvlb}. Your balance is not enough`)
      .typeError('Invalid total')
      .nullable(true),
  });
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<SubmitForm>({
    resolver: yupResolver(validation),
  });
  const price = getValues('price');
  const amount = getValues('amount');
  // getvalues slider
  const onChangeSlider = (value: number) => {
    setPercent(value);
    if (quoteAvlb === 0) {
      setValue('amount', 0, { shouldValidate: true });
      setValue('total', 0, { shouldValidate: true });
    } else {
      setValue('total', (value * quoteAvlb) / 100, { shouldValidate: true });
      setValue('amount', (value * quoteAvlb) / 100 / price, {
        shouldValidate: true,
      });
    }
  };
  // getvalues Price
  const onChangePrice = (value: number) => {
    setValue('total', value * amount, { shouldValidate: true });
    if (quoteAvlb === 0) {
      setPercent(100);
    } else {
      setPercent((value * amount * 100) / quoteAvlb);
    }
  };
  // getvalues Amount
  const onChangeAmount = (value: number) => {
    setValue('total', value * price, { shouldValidate: true });
    if (quoteAvlb === 0) {
      setPercent(100);
    } else {
      setPercent((value * price * 100) / quoteAvlb);
    }
  };
  // getvalues Total
  const onChangeTotal = (value: number) => {
    setValue('amount', value / price, { shouldValidate: true });
    if (quoteAvlb === 0) {
      setPercent(100);
    } else {
      setPercent((value * 100) / quoteAvlb);
    }
  };
  // submit form
  const onSubmitBuy = (data: any) => {
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
        <Tooltip color={'#000'} title={errors.price?.message}>
          <div>
            <FormInput
              prefix="Price"
              suffix={quoteSymbol}
              id="price"
              error={errors.price?.message}
              regis={register('price', {
                onChange: e => onChangePrice(e.target.value),
              })}
            />
          </div>
        </Tooltip>
        <Tooltip color={'#000'} title={errors.amount?.message}>
          <div>
            <FormInput
              prefix="Amount"
              suffix={baseSymbol}
              id="amount"
              error={errors.amount?.message}
              regis={register('amount', {
                onChange: e => onChangeAmount(e.target.value),
              })}
            />
          </div>
        </Tooltip>
        <SliderBar change={onChangeSlider} defaultpercent={percent} />
        {getToken() ? (
          <Tooltip color={'#000'} title={errors?.total?.message}>
            <div>
              <FormInput
                prefix="Total"
                suffix={quoteSymbol}
                id="total"
                error={errors.total?.message}
                regis={register('total', {
                  onChange: e => onChangeTotal(e.target.value),
                })}
              />
            </div>
          </Tooltip>
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
