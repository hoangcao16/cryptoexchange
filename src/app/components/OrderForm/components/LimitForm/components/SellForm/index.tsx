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
import { Tooltip } from 'antd';

//declare type
type SubmitForm = {
  price: number;
  amount: number;
  total: number;
};
const SellForm = ({ baseSymbol, quoteSymbol, baseAvlb, wallet, type }: any) => {
  const dispatch = useDispatch();
  const { actions } = useSellspotlimitSlice();
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
      .max(baseAvlb, `Max amount ${baseAvlb}.`)
      .typeError('Invalid amount')
      .nullable(true),
    total: Yup.number()
      .required('Invalid total')
      .min(0, 'Total must be greater than 0')
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
    if (baseAvlb === 0) {
      setValue('amount', 0, { shouldValidate: true });
      setValue('total', 0, { shouldValidate: true });
    } else {
      setValue('amount', (value * baseAvlb) / 100, { shouldValidate: true });
      setValue('total', ((value * baseAvlb) / 100) * price, {
        shouldValidate: true,
      });
    }
  };
  // getvalues Price
  const onChangePrice = (value: number) => {
    setValue('total', value * amount, { shouldValidate: true });
    if (baseAvlb === 0) {
      setPercent(100);
    } else {
      setPercent((value * amount * 100) / baseAvlb);
    }
  };
  // getvalues Amount
  const onChangeAmount = (value: number) => {
    setValue('total', value * price, { shouldValidate: true });
    if (baseAvlb === 0) {
      setPercent(100);
    } else {
      setPercent((value * price * 100) / baseAvlb);
    }
  };
  // getvalues Total
  const onChangeTotal = (value: number) => {
    setValue('amount', value / price, { shouldValidate: true });
    if (baseAvlb === 0) {
      setPercent(100);
    } else {
      setPercent((value * 100) / baseAvlb);
    }
  };
  // submit form
  const onSubmitSell = (data: any) => {
    const ts = new Date().getTime();
    dispatch(
      actions.sellspotlimitRequest({
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
    <form onSubmit={handleSubmit(onSubmitSell)}>
      <Tooltip color={'#000'} title={errors.price?.message}>
        <div>
          <FormInput
            prefix="Price"
            suffix={quoteSymbol}
            id="price-sell"
            error={errors.price?.message}
            regis={register('price', {
              onChange: e => onChangePrice(e.target.value),
            })}
          />
        </div>
      </Tooltip>
      <Tooltip
        color={'#000'}
        placement="topRight"
        title={errors.amount?.message}
      >
        <div>
          <FormInput
            prefix="Amount"
            suffix={baseSymbol}
            id="amount-sell"
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
              id="total-sell"
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
