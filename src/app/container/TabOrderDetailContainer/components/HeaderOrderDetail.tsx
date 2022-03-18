import Countdown from 'antd/lib/statistic/Countdown';
import styled from 'styled-components';
import { tabOrderDetailService } from 'services/orderDetailService';
import openNotification from 'app/components/NotificationAntd';
import { useSelector } from 'react-redux';
import { selectTabOrderDetail } from '../slice/selectors';
import { TabOrderDetailState } from '../slice/types';

const HeaderOrderDetail = ({ trade, reload }) => {
  const { updateTradeById } = tabOrderDetailService;

  const date = new Date(trade?.createTime);
  const date1 = Date.now();
  const TabOrderDetailState: TabOrderDetailState =
    useSelector(selectTabOrderDetail);

  const tradeStatus = TabOrderDetailState.tradeStatus;
  const buyerStatus = TabOrderDetailState.buyerStatus;
  const sellerStatus = TabOrderDetailState.sellerStatus;
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
  return (
    <Wrapper>
      <div className="container">
        {buyerStatus === 'NOT_PAID' && (
          <div className="sellInfo">
            <h4>
              Buy {trade?.order?.token?.assetName} from {trade?.sellEmail}
            </h4>
            <div className="countdown">
              Created order. Please wait for the system to confirm{' '}
              <Countdown
                onFinish={() => finishedCountDown()}
                value={
                  Date.now() +
                  trade?.order?.paymentTime?.timeLimit * 60000 -
                  (date1 - date.getTime())
                }
                className="countdownTimer"
              ></Countdown>
              <span className="bg"></span>
            </div>
          </div>
        )}
        {buyerStatus === 'CANCEL' && (
          <div className="sellInfo">
            <h4>Canceled this order</h4>
            <div className="countdown">You canceled this order</div>
          </div>
        )}
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

      .bg {
        position: absolute;
        height: 100%;
        width: 10%;
        top: 0;
        right: 12.8%;
        border-radius: 5px;
        display: inline-block;
        background-color: ${({ theme }) => theme.primary};
        transform: translateY(-3%);
      }
      .countdownTimer {
        font-size: 40px !important;
        font-weight: bold;
        margin-left: 20px;
        letter-spacing: 10px;
        padding-bottom: 5px;
        position: relative;
        z-index: 1;

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
