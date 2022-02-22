import { Button, Form, Input, Select } from 'antd';
import React, { useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { usePostAdP2PSlice } from '../slice';
import CardPaymentMethod from './CardPaymentMethod';
import ModalSelectPaymentMethod from './ModalSelectPaymentMethod';
import SwitchStep from './SwitchStep';
const { Option } = Select;

function StepTotalAndPayment() {
  const { actions } = usePostAdP2PSlice();
  const dispatch = useDispatch();

  const [modalSelectPaymentMethod, setModalSelectPaymentMethod] =
    useState(false);
  const [paymentMethodSelected, setPaymentMethodSelected] = useState([]);

  const handleNextStep = () => {
    dispatch(actions.setCurrentStep(3));
  };

  const handleOpenModal = () => {
    setModalSelectPaymentMethod(true);
  };

  const handleCloseModal = () => {
    setModalSelectPaymentMethod(false);
  };

  return (
    <Wrapper>
      <Form>
        <div className="stepTAP--label">Total Amount</div>
        <Form.Item
          name="totalAmount"
          rules={[{ required: true, message: 'This field is required!' }]}
          extra={
            <ExtraTotal>
              <div className="left">
                <span>Available: 0 USDT</span> <Button type="link">All</Button>
              </div>
              <div className="right">≈ 0 VND</div>
            </ExtraTotal>
          }
        >
          <Input
            className="stepTAP--input stepTAP--input-total"
            suffix={<>USDT</>}
          />
        </Form.Item>
        <div className="stepTAP--label">Order Limit</div>
        <div className="stepTAP--orderLimit">
          <Form.Item
            name="totalAmount"
            rules={[{ required: true, message: 'This field is required!' }]}
          >
            <Input
              className="stepTAP--input stepTAP--input-order"
              suffix={<>VND</>}
            />
          </Form.Item>
          <AiOutlineMinus className="mt-2" />
          <Form.Item
            name="totalAmount"
            rules={[{ required: true, message: 'This field is required!' }]}
          >
            <Input
              className="stepTAP--input stepTAP--input-order"
              suffix={<>VND</>}
            />
          </Form.Item>
        </div>

        <div className="stepTAP--dash"></div>

        <div className="stepTAP--label">Payment Method</div>
        <div>Select up to 5 methods</div>
        {paymentMethodSelected.map((e, i) => (
          <CardPaymentMethod mode="display" key={i} />
        ))}
        <Button
          type="link"
          className="stepTAP--btnAdd mb-4"
          onClick={handleOpenModal}
        >
          <AiOutlinePlus /> Add
        </Button>

        <div className="stepTAP--label">Payment Time Limit</div>
        <Form.Item name="time" rules={[{ required: true }]}>
          <Select className="stepTAP--timeLimit">
            <Option value="15m">15m</Option>
            <Option value="20m">20m</Option>
          </Select>
        </Form.Item>
      </Form>

      <ModalSelectPaymentMethod
        visible={modalSelectPaymentMethod}
        handleOk={() => {}}
        handleCancel={handleCloseModal}
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
      color: ${({ theme }) => theme.powColor};
      border: 1px solid ${({ theme }) => theme.powColor};
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
