import { Modal } from 'antd';
import React from 'react';
import { payments } from '../data';
import CardPaymentMethod from './CardPaymentMethod';

interface Props {
  visible: boolean;
  handleOk: () => void;
  handleCancel: () => void;
}

function ModalSelectPaymentMethod(props: Props) {
  const { visible, handleOk, handleCancel } = props;
  return (
    <Modal
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      title="Select payment method"
    >
      {payments.map((e, i) => (
        <CardPaymentMethod mode="select" key={i} />
      ))}
    </Modal>
  );
}

export default ModalSelectPaymentMethod;
