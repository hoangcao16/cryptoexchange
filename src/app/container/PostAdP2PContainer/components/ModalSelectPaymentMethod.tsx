import { Modal, Skeleton } from 'antd';
import React, { useEffect, useState } from 'react';
import { postAdP2PServices } from 'services/postAdP2PService';
import CardPaymentMethod from './CardPaymentMethod';

interface Props {
  visible: boolean;
  handleCancel: () => void;
  handleSelect: (payment: any) => void;
}

function ModalSelectPaymentMethod(props: Props) {
  const { visible, handleCancel, handleSelect } = props;

  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSelectPayment = (value: any) => {
    handleSelect(value.id);
    handleCancel();
  };

  const handleGetAllPaymentP2P = () => {
    setLoading(true);
    postAdP2PServices
      .getAllPaymentP2PService()
      .then(res => {
        if (res.data.rc !== 0) {
          return;
        }

        setPayments(res.data.rows);
      })
      .catch(err => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (visible === false) return;

    handleGetAllPaymentP2P();
  }, [visible]);

  return (
    <Modal
      visible={visible}
      onCancel={handleCancel}
      title="Select payment method"
      footer={false}
    >
      {loading ? (
        <Skeleton />
      ) : (
        <>
          {payments.map((payment, i) => (
            <CardPaymentMethod
              mode="select"
              key={i}
              data={payment}
              onClick={() => {
                handleSelectPayment(payment);
              }}
            />
          ))}
        </>
      )}
    </Modal>
  );
}

export default ModalSelectPaymentMethod;
