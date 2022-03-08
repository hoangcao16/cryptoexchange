import { Button, Form, Input, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { postAdP2PServices } from 'services/postAdP2PService';
import styled from 'styled-components';
import { usePostAdP2PSlice } from '../slice';
import { selectPostAdP2P } from '../slice/selectors';
import { DataPostAdP2PState, PostAdP2PState } from '../slice/types';
import CardPaymentMethod from './CardPaymentMethod';
import ModalSelectPaymentMethod from './ModalSelectPaymentMethod';
import SwitchStep from './SwitchStep';
const { Option } = Select;

function StepTotalAndPayment() {
  const { actions } = usePostAdP2PSlice();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const PostAdP2PState: PostAdP2PState = useSelector(selectPostAdP2P);

  const [total, setTotal] = useState<number>();

  const [paymentTimes, setPaymentTimes] = useState<any[]>([]);

  const [modalSelectPaymentMethod, setModalSelectPaymentMethod] =
    useState(false);
  const [paymentMethodSelected, setPaymentMethodSelected] = useState<any[]>([]);

  const handleSelectPayment = (payment: any) => {
    setPaymentMethodSelected([...paymentMethodSelected, payment]);
  };

  const handleOpenModal = () => {
    setModalSelectPaymentMethod(true);
  };

  const handleCloseModal = () => {
    setModalSelectPaymentMethod(false);
  };

  const handleGetAllPaymentTime = () => {
    postAdP2PServices
      .getAllPaymentTimeP2PService()
      .then(res => {
        if (res.data.rc !== 0) {
          return;
        }

        setPaymentTimes(res.data.rows);
      })
      .catch(err => {
        console.error(err);
      });
  };

  const handleChangeAmount = (e: any) => {
    const amount = e.target.value;
    if (PostAdP2PState.data.price) {
      setTotal(PostAdP2PState.data.price * amount);
    }
  };

  const handleNextStep = () => {
    form
      .validateFields()
      .then(res => {
        const param: DataPostAdP2PState = {
          amount: parseInt(res.amount),
          orderLowerBound: parseInt(res.orderLowerBound),
          orderUpperBound: parseInt(res.orderUpperBound),
          paymentTimeId: res.paymentTimeId,
          total: total,
          paymentIds: paymentMethodSelected,
        };
        dispatch(actions.setDataPostAdP2P(param));
        dispatch(actions.setCurrentStep(3));
      })
      .catch(err => {
        console.error(err);
        return false;
      });
  };

  useEffect(() => {
    handleGetAllPaymentTime();
  }, []);

  return (
    <Wrapper>
      <Form form={form}>
        <div className="stepTAP--label">Total Amount</div>
        <Form.Item
          name="amount"
          rules={[{ required: true, message: 'This field is required!' }]}
          extra={
            <ExtraTotal>
              <div className="left">
                <span>Available: 0 {PostAdP2PState.data.tokenName}</span>
                <Button type="link">All</Button>
              </div>
              <div className="right">
                ≈ {total} {PostAdP2PState.data.fiatName}
              </div>
            </ExtraTotal>
          }
        >
          <Input
            className="stepTAP--input stepTAP--input-total"
            suffix={<>{PostAdP2PState.data.tokenName}</>}
            type="number"
            onChange={handleChangeAmount}
          />
        </Form.Item>
        <div className="stepTAP--label">Order Limit</div>
        <div className="stepTAP--orderLimit">
          <Form.Item
            name="orderLowerBound"
            rules={[{ required: true, message: 'This field is required!' }]}
          >
            <Input
              className="stepTAP--input stepTAP--input-order"
              suffix={<>{PostAdP2PState.data.fiatName}</>}
              type="number"
            />
          </Form.Item>
          <AiOutlineMinus className="mt-2" />
          <Form.Item
            name="orderUpperBound"
            rules={[{ required: true, message: 'This field is required!' }]}
          >
            <Input
              className="stepTAP--input stepTAP--input-order"
              suffix={<>{PostAdP2PState.data.fiatName}</>}
              type="number"
            />
          </Form.Item>
        </div>

        <div className="stepTAP--dash"></div>

        <div className="stepTAP--label">Payment Method</div>
        <div>Select up to 5 methods</div>
        {paymentMethodSelected.map((e, i) => (
          <CardPaymentMethod mode="display" key={i} data={{}} />
        ))}
        <Button
          type="link"
          className="stepTAP--btnAdd mb-4"
          onClick={handleOpenModal}
        >
          <AiOutlinePlus /> Add
        </Button>

        <div className="stepTAP--label">Payment Time Limit</div>
        <Form.Item
          name="paymentTimeId"
          rules={[{ required: true }]}
          initialValue={1}
        >
          <Select className="stepTAP--timeLimit">
            {paymentTimes.map((p, i) => (
              <Option key={i} value={p.id}>
                {p.timeLimit}m
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>

      <ModalSelectPaymentMethod
        visible={modalSelectPaymentMethod}
        handleCancel={handleCloseModal}
        handleSelect={handleSelectPayment}
      />
      <SwitchStep next={handleNextStep} post={() => {}} />
    </Wrapper>
  );
}

export default StepTotalAndPayment;

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.p2pBackground};
  min-height: 400px;
  padding: 30px;

  .stepTAP {
    &--label {
      color: ${({ theme }) => theme.p2pGray};
      padding-bottom: 4px;
    }

    &--input {
      &-total {
        width: 100%;
        max-width: 550px;
      }

      &-order {
        width: 240px;
      }
    }

    &--orderLimit {
      max-width: 550px;
      display: flex;
      justify-content: space-between;
    }

    &--dash {
      border-top: 1px dashed ${({ theme }) => theme.p2pBorder};
      margin-bottom: 30px;
    }

    &--btnAdd {
      height: 33px;
      width: 104px;
      color: ${({ theme }) => theme.primary};
      border: 1px solid ${({ theme }) => theme.primary};
    }

    &--timeLimit {
      width: 150px;
    }
  }
`;

const ExtraTotal = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  max-width: 550px;
  height: 18px;

  font-size: 12px;
`;
