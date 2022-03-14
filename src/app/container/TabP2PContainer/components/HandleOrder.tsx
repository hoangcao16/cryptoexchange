import { Descriptions, Tag } from 'antd';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { selectTabP2P } from '../slice/selectors';
import { TabP2PState } from '../slice/type';

const HandleOrder = (props: any) => {
  const TabP2PState: TabP2PState = useSelector(selectTabP2P);
  const { listP2POrders, text, record, index, hanldeCloseOrder, timeLimit } =
    props;
  let orders = 0;
  let numberOrderDone = 0;
  listP2POrders.forEach(order => {
    if (order.accountEmail === text && order.orderType === 0) {
      orders += 1;
      if (order.status === 'DONE') {
        numberOrderDone += 1;
      }
    }
  });
  return (
    <ColHandleOrder>
      <div className="orderInfo">
        <ColOrderAdvertisers>
          <div className="row1">
            <div className="firstCharacter">
              {record.accountEmail.charAt(0).toUpperCase()}
            </div>
            <div className="advertisers">{record.accountEmail}</div>
          </div>

          <div className="row2">
            {''}
            <span>{orders} Orders</span>
            <span className="numberOrderComplete">
              {((numberOrderDone / orders) * 100).toFixed(2)} % completed
            </span>
          </div>
        </ColOrderAdvertisers>
        <div className="orderDescription">
          <Descriptions size="small">
            <Descriptions.Item span={1} label="Price">
              <span className="orderDescriptionSpan orderPrice">
                $ {record.price}
              </span>
            </Descriptions.Item>
            <Descriptions.Item span={1} label="Available">
              <span className="orderDescriptionSpan">
                {record.amount - record.executed}{' '}
                <span>{TabP2PState.searchParam.crypto}</span>
              </span>
            </Descriptions.Item>
          </Descriptions>
          <Descriptions size="small">
            <Descriptions.Item span={1} label="Payment time limit">
              <span className="orderDescriptionSpan">
                {timeLimit > 60 ? (
                  <span>
                    {Math.floor(timeLimit / 60)} hours {timeLimit % 60} minutes
                  </span>
                ) : (
                  <span>{timeLimit % 60} minutes</span>
                )}
              </span>
            </Descriptions.Item>
            <Descriptions.Item span={1} label="Buyer's payment method">
              <span className="orderDescriptionSpan">
                {
                  <div>
                    {text.length === 0 ? (
                      <h6>Unknow payment!</h6>
                    ) : (
                      text.map(payment => {
                        if (payment) {
                          return (
                            <Tag key={record.id} className="paymentTag">
                              <img src={payment.paymentMethodIcon} alt="#" />{' '}
                              <span
                                style={{
                                  color: `${payment.paymentMethodColor}`,
                                }}
                              >
                                {payment.paymentMethodName}
                              </span>
                            </Tag>
                          );
                        }
                      })
                    )}
                  </div>
                }
              </span>
            </Descriptions.Item>
          </Descriptions>
          <div className="termsAndCondition">
            <h6>Terms and condition</h6>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex eum
              molestiae quasi voluptate minus eos illo possimus? Temporibus
              voluptatem sit dolorem eligendi mollitia magni fugit. Odit eum
              esse necessitatibus neque?
            </p>
          </div>
        </div>
        ,
      </div>
      <div className="formOrder">
        <Button
          onClick={() => {
            hanldeCloseOrder(prev => prev.filter(order => order !== index));
          }}
        >
          Cancel
        </Button>
      </div>
    </ColHandleOrder>
  );
};

export default HandleOrder;

const ColHandleOrder = styled.div`
  display: flex;

  .orderDescription {
    margin-left: 25px;
    margin-top: 10px;
    padding-right: 20px;

    .orderPrice {
      color: red;
    }

    .orderDescriptionSpan {
      font-weight: bold;
    }

    .termsAndCondition {
      margin-top: 40px;
    }
  }
  .orderInfo {
    flex: 6;
    border-right: 1px solid #ccc;
  }
  .formOrder {
    padding-left: 20px;
    flex: 4;
  }
`;

const ColOrderAdvertisers = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;

  .row1 {
    display: flex;
    align-items: center;
    margin-bottom: 8px;

    .firstCharacter {
      text-align: center;
      font-size: 12px;
      color: ${({ theme }) => theme.text};
      width: 20px;
      height: 20px;
      line-height: 20px;
      border-radius: 10px;
      background-color: ${({ theme }) => theme.primary};
    }

    .advertisers {
      margin: 0px 8px;
    }
  }
  .row2 {
    margin-left: 28px;
    font-size: 12px;
    color: ${({ theme }) => theme.primary};
    .numberOrderComplete {
      margin-left: 10px;
      padding-left: 5px;
      border-left: 1px solid #ccc;
    }
  }
`;
