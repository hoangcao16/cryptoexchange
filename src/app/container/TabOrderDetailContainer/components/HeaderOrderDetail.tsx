import Countdown from 'antd/lib/statistic/Countdown';
import styled from 'styled-components';
import { tabOrderDetailService } from 'services/orderDetailService';
import openNotification from 'app/components/NotificationAntd';
import { useSelector } from 'react-redux';
import { selectTabOrderDetail } from '../slice/selectors';
import { TabOrderDetailState } from '../slice/types';
import { useEffect, useState } from 'react';

const HeaderOrderDetail = ({ trade, reload }) => {
  const { updateTradeById } = tabOrderDetailService;
  const [title, setTitle] = useState('');
  const [subTitle, setSubTitle] = useState('');

  const date = new Date(trade?.createTime);
  const date1 = Date.now();
  const TabOrderDetailState: TabOrderDetailState =
    useSelector(selectTabOrderDetail);

  const tradeStatus = TabOrderDetailState.tradeStatus;
  const buyerStatus = TabOrderDetailState.buyerStatus;
  const sellerStatus = TabOrderDetailState.sellerStatus;
  const tradeType = TabOrderDetailState.tradeType;

  const finishedCountDown = () => {
    updateTradeById({
      id: trade.id,
      status: 'CANCEL',
      paymentId: -1,
    })
      .then(res => {
        if (res.data.rc === 0) {
          openNotification('Error', 'Canceled this order due to time limit!');
          localStorage.setItem('timeLimit', JSON.stringify(null));
          reload();
        } else {
          openNotification('Error', res.data.rd);
        }
      })
      .catch(res => console.log(res));
  };
  console.log(trade);
  useEffect(() => {
    if (TabOrderDetailState?.tradeType === 'Buy') {
      switch (TabOrderDetailState?.buyerStatus) {
        case 'NOT_PAID':
          setTitle(
            `Buy ${trade?.order?.token?.assetName} from ${trade?.sellEmail}`,
          );
          setSubTitle(
            'The order is created, please wait for system confirmation.Order will be automatically canceled by the system if timed out.',
          );
          break;

        case 'PAID':
          setTitle(
            `Buy ${trade?.order?.token?.assetName} from ${trade?.sellEmail}`,
          );
          setSubTitle("Pending seller's release crypto");
          break;

        case 'COMPLETE':
          setTitle('Order completed');
          setSubTitle(
            `Successfully bought ${trade?.amount} ${trade?.order?.token?.assetName}`,
          );
          break;

        case 'CANCEL':
          setTitle('Canceled this order');
          setSubTitle('You canceled this order');
          break;

        default:
          setTitle('');
          setSubTitle('');
      }
    } else {
      switch (TabOrderDetailState?.sellerStatus) {
        case 'HOLD':
          setTitle(
            `Sell ${trade?.order?.token?.assetName} to ${trade?.buyEmail}`,
          );
          setSubTitle("Pending buyer's payment. Time remaining");
          break;
        case 'RELEASE':
          setTitle(
            `Sell ${trade?.order?.token?.assetName} to ${trade?.buyEmail}`,
          );
          setSubTitle(
            'Please confirm that you have received payment from the buyer',
          );
          break;
        case 'COMPLETE':
          setTitle('Order completed');
          setSubTitle(
            `Successfully sold ${trade?.amount} ${trade?.order?.token?.assetName}`,
          );
          break;
        default:
          setTitle('');
          setSubTitle('');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [TabOrderDetailState]);
  return (
    <Wrapper>
      <div className="container">
        <div className="sellInfo">
          <h4>{title}</h4>
          <div className="countdown">
            <span>{subTitle}</span>
            {buyerStatus === 'NOT_PAID' && (
              <Countdown
                onFinish={() => finishedCountDown()}
                value={
                  Date.now() +
                  trade?.order?.paymentTime?.timeLimit * 60000 -
                  (date1 - date.getTime())
                }
                className="countdownTimer"
              ></Countdown>
            )}

            <span className="bg"></span>
          </div>
        </div>
        <div className="orderInfo">
          <p>
            <span className="clgray">Order number</span>: {trade?.orderNumber}
          </p>
          <p>
            <span className="clgray">Create at</span>:{' '}
            {date && (
              <span>
                {date.getHours()}:{date.getMinutes()}:{date.getSeconds()} -{' '}
                {date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}
              </span>
            )}
          </p>
        </div>
      </div>
    </Wrapper>
  );
};

export default HeaderOrderDetail;

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.p2pGrayLight};
  padding-top: 20px;
  padding-bottom: 10px;

  .container {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .countdown {
      display: flex;
      align-items: center;
      position: relative;

      .countdownTimer {
        font-size: 40px !important;
        font-weight: bold;
        margin-left: 20px;
        letter-spacing: 10px;
        padding-bottom: 5px;
        position: relative;
        z-index: 1;
      }

      .ant-statistic-content {
        position: relative;
        &::before {
          position: absolute;
          content: '';
          height: 100%;
          width: 30%;
          background-color: ${({ theme }) => theme.primary};
          z-index: -1;
          opacity: 1;
          left: 0;
          top: 0;
          transform: translate(-14%, -3%);
          border-radius: 5px;
        }

        &::after {
          position: absolute;
          content: '';
          height: 100%;
          width: 30%;
          background-color: ${({ theme }) => theme.primary};
          z-index: -1;
          opacity: 1;
          right: 0;
          top: 0;
          transform: translate(-4%, -3%);
          border-radius: 5px;
          margin-right: 0px;
        }
      }
      .ant-statistic-content-value {
        position: relative;

        &::after {
          position: absolute;
          content: '';
          height: 100%;
          width: 30%;
          background-color: ${({ theme }) => theme.primary};
          z-index: -1;
          opacity: 1;
          top: 0;
          border-radius: 5px;
          left: 50%;
          transform: translate(-59%, -3%);
        }
      }
    }

    .orderInfo {
      text-align: right;

      .clgray {
        color: ${({ theme }) => theme.grayColor};
      }
    }
  }
`;
