import { Button } from 'antd';
import { Button as BtnBS } from 'react-bootstrap';
import { RiEmotionHappyLine, RiEmotionUnhappyLine } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { selectTabOrderDetail } from '../slice/selectors';
import { TabOrderDetailState } from '../slice/types';

const AppealBlock = ({ cancelOrder }) => {
  const TabOrderDetailState: TabOrderDetailState =
    useSelector(selectTabOrderDetail);
  const { buyerStatus, sellerStatus, tradeType } = TabOrderDetailState;
  return (
    <Wrapper>
      {sellerStatus === 'APPEAL' && tradeType === 'Sell' && (
        <div>
          <h4>Appeal</h4>
          <p>Pending response from respondent.Time remaining: </p>
          <p>
            1. If both parties have reached an agreement, you can click on "
            <b>Cancel the appeal</b>". You can cancel the appeal and proceed to
            complete the trade.
          </p>
          <p>
            2. If complainant did not respond in time. CS will get involed and
            arbitrate
          </p>
          <p>
            3. To provide more information, please{' '}
            <b>
              <u>Provide more info</u>
            </b>
            . Info provided by both users and CS can be found in "Appeal
            progess".
          </p>
          <Button type="primary">Cancel the appeal</Button>
        </div>
      )}
      {sellerStatus === 'APPEAL' && tradeType === 'Buy' && (
        <div>
          <h4>Appeal</h4>
          <p>Please response to the appeal within: </p>
          <div className="cancelOrderBlock">
            <p>
              The seller filed an appeal claiming that the payment is not
              recieved in the seller's account. If you have not paid, you can
              cancel the order. After cancellation, the appeal will end
              automatically.
            </p>
            <Button type="primary" onClick={cancelOrder}>
              Cancel the order
            </Button>
          </div>
          <p>
            1. If you have reached an agreement with the other party, please
            click "<b>Consensus reached</b>" and wait for the confirmation. Once
            confirmed by other user, the appeal will be cancel. If the user
            refuse to acknowledge the agreement, our CS will get involved and
            arbitrate.
          </p>
          <p>
            2. If you cannot reach an agreement with the other party, please
            click "<b>Negotiation failed</b>." CS will get involved and
            arbitrate.
          </p>
          <p>
            3. The respondent did not respond within the time limit, our CS will
            get involved and arbitrate.
          </p>
          <p>
            To provide mode information, please
            <b>
              <u>Provide more info</u>
            </b>
            . Info provided by both users and CS can be found in "Appeal
            progress".
          </p>
          <h6 className="negotiationSpan">Negotiation result</h6>
          <div className="negotiation">
            <BtnBS className="btn-fail">
              <RiEmotionUnhappyLine className="iconFail" />
              Negotiation failed
            </BtnBS>
            <BtnBS className="btn-success">
              <RiEmotionHappyLine className="iconSucces" /> Consensus reached
            </BtnBS>
          </div>
        </div>
      )}
    </Wrapper>
  );
};

export default AppealBlock;

const Wrapper = styled.div`
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid ${({ theme }) => theme.whiteSmokeColor};

  h4 {
    margin-bottom: 15px;
  }

  p {
    margin: 3px 0;
  }

  button {
    margin-top: 10px;
  }

  .cancelOrderBlock {
    background-color: ${({ theme }) => theme.primaryBlur};
    padding: 15px;
    text-align: justify;
    border-radius: 3px;
    margin-bottom: 10px;
    button {
      display: block;
      margin-left: auto;
    }
  }

  .negotiationSpan {
    margin-top: 20px;
  }

  .negotiation {
    button {
      box-shadow: none !important;
      background-color: inherit;
      border: 1px solid ${({ theme }) => theme.brightGrayColor};
      height: 40px;
      font-size: 14px;
      padding: 2px 10px 2px 0;
      font-weight: bold;
      touch-action: none;
      border-radius: 20px;
      margin-right: 15px;
      display: inline-flex;
      align-items: center;

      svg {
        font-size: 40px;
        margin-right: 3px;
      }
    }

    .btn-success {
      color: ${({ theme }) => theme.greenColor};
      transition: all 0.25s linear;
      &:hover {
        border-color: ${({ theme }) => theme.greenColor};
      }
    }

    .btn-fail {
      color: ${({ theme }) => theme.redColor};
      transition: all 0.25s linear;

      &:hover {
        border-color: ${({ theme }) => theme.redColor};
      }
    }
  }
`;
