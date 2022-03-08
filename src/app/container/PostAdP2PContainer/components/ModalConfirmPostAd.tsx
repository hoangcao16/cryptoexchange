import { Button, Modal } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { postAdP2PServices } from 'services/postAdP2PService';
import { selectPostAdP2P } from '../slice/selectors';
import { DataPostAdP2PState, PostAdP2PState } from '../slice/types';

interface Props {
  visible: boolean;
  onCancel: () => void;
}

function ModalConfirmPostAd(props: Props) {
  const { visible, onCancel } = props;
  const PostAdP2PState: PostAdP2PState = useSelector(selectPostAdP2P);

  const handlePost = async () => {
    const email = await postAdP2PServices
      .getProfileUser()
      .then(res => {
        if (res.data.rc !== 0) {
          return null;
        }

        return res.data.email;
      })
      .catch(err => {
        return null;
      });

    const param: DataPostAdP2PState = {
      accountEmail: email,
      orderType: PostAdP2PState.data.orderType,
      tokenId: PostAdP2PState.data.tokenId,
      fiatId: PostAdP2PState.data.fiatId,
      priceType: PostAdP2PState.data.priceType,
      price: PostAdP2PState.data.price,
      amount: PostAdP2PState.data.amount,
      orderLowerBound: PostAdP2PState.data.orderLowerBound,
      orderUpperBound: PostAdP2PState.data.orderUpperBound,
      paymentTimeId: PostAdP2PState.data.paymentTimeId,
      total: PostAdP2PState.data.total,
      paymentIds: PostAdP2PState.data.paymentIds,
      remarks: PostAdP2PState.data.remarks,
      autoReply: PostAdP2PState.data.autoReply,
      kycRequired: PostAdP2PState.data.kycRequired,
      registeredRequired: PostAdP2PState.data.registeredRequired,
      registeredAfterNDays: PostAdP2PState.data.registeredAfterNDays,
      holdingBTCRequired: PostAdP2PState.data.holdingBTCRequired,
      holdingBTCAmount: PostAdP2PState.data.holdingBTCAmount,
      status: PostAdP2PState.data.status,

      floatingPercent: 0,
    };

    console.log('💙TuanHQ💖 ~> handlePost ~> param', param);

    postAdP2PServices
      .postCreateOrderAdP2PService(param)
      .then(res => {
        console.log(
          '💙TuanHQ💖 ~> postAdP2PServices.postCreateOrderAdP2PService ~> res',
          res,
        );
      })
      .catch(err => {
        console.error(err);
      });
  };

  return (
    <div>
      <Modal title="Basic Modal" visible={visible} onCancel={onCancel}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <Button type="primary" onClick={handlePost}>
          Post
        </Button>
      </Modal>
    </div>
  );
}

export default ModalConfirmPostAd;
