import { List, Tabs, Tag } from 'antd';
import { Button, Modal } from 'react-bootstrap';
import { BiPlus } from 'react-icons/bi';
import styled from 'styled-components';
import { tabP2PUserCenterServices } from 'services/tabP2PUserCenterServices';
import { useEffect, useState } from 'react';

const ContentP2PUserCenter = () => {
  const { TabPane } = Tabs;
  const { getUserPaymentByToken, getAllPaymentMethod } =
    tabP2PUserCenterServices;
  const [showModalAddPM, setShowModalAddPM] = useState(true);
  const [listPaymentMethod, setListPaymentMethod] = useState<any>([]);

  const [listUserPayments, setListUserPayments] = useState<any>([]);

  const findAllUserPayments = () => {
    getUserPaymentByToken()
      .then(res => {
        if (res.data.rc === 0) {
          setListUserPayments(res.data.rows);
          console.log(res.data.rows);
        } else console.log(res);
      })
      .catch(res => console.log(res));
  };

  const findAllPM = () => {
    getAllPaymentMethod()
      .then(res => {
        if (res.data.rc === 0) {
          setListPaymentMethod(res.data.rows);
          console.log(res.data.rows);
        } else console.log(res);
      })
      .catch(res => console.log(res));
  };

  useEffect(() => {
    findAllUserPayments();
    if (showModalAddPM) {
      findAllPM();
    }
  }, []);

  return (
    <Wrapper>
      <div className="container">
        <Tabs defaultActiveKey="1">
          <TabPane
            tab="P2P Payment Method"
            key="1"
            className="tabPaymentMethod"
          >
            <h6 className="title">P2P Payment Methods</h6>
            <div className="desc">
              <p>
                P2P payment methods: When you sell cryptocurrencies, the payment
                method added will be displayed to buyer as options to accept
                payment, please ensure that the account owner’s name is
                consistent with your verified name on Binance. You can add up to
                20 payment methods.
              </p>
              <Button>
                <BiPlus className="plusIcon" /> Add a payment method
              </Button>
            </div>

            <List
              className="listUserPayment"
              itemLayout="horizontal"
              pagination={{
                pageSize: 3,
              }}
              dataSource={listUserPayments}
              renderItem={(item: any, index: any) => (
                <List.Item>
                  <div className="headerItem">
                    <Tag
                      key={index}
                      color={item?.paymentMethod?.colorCode}
                      className="tagPaymentMethod"
                    >
                      {item?.paymentMethod?.name}
                    </Tag>
                    <div className="action">
                      <span>Edit</span>
                      <span>Delete</span>
                    </div>
                  </div>

                  <div className="contentItem">
                    {item?.paymentMethod?.id === 4 ? (
                      <>
                        <p className="infoPM">
                          Name: <p className="PMdesc">{item?.fullName}</p>
                        </p>
                        <p className="infoPM">
                          Bank account number:{' '}
                          <p className="PMdesc">{item?.accountNumber}</p>
                        </p>
                        <p className="infoPM">
                          Bank name: <p className="PMdesc">{item?.bankName}</p>
                        </p>
                        <p className="infoPM">
                          Account opening branch:{' '}
                          <p className="PMdesc">{item?.bankBranch}</p>
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="infoPM">
                          Name: <p className="PMdesc">{item?.fullName}</p>
                        </p>
                        <p className="infoPM">
                          Mobile phone:{' '}
                          <p className="PMdesc">{item?.mobilePhone}</p>
                        </p>
                      </>
                    )}
                  </div>
                </List.Item>
              )}
            ></List>
          </TabPane>
          <TabPane tab="Feedback" key="2">
            Feedback
          </TabPane>
        </Tabs>
        <ModalAddPayemnt centered>
          <Modal.Header closeButton>Select payment method</Modal.Header>
          <Modal.Body>
            <h6>Recommand payment method</h6>
            <Tag className="rcmTag">
              <img src={listPaymentMethod[2]?.icon} alt="#" />{' '}
              {listPaymentMethod[2]?.name}
            </Tag>

            <h6>All payment method</h6>
            <div className="allMT">
              {listPaymentMethod?.map((pm: any, index: any) => (
                <div className="pmTagContain" key={index}>
                  <Tag>
                    <img src={pm?.icon} alt="#" /> {pm.name}
                  </Tag>
                </div>
              ))}
            </div>
          </Modal.Body>
        </ModalAddPayemnt>
      </div>
    </Wrapper>
  );
};

export default ContentP2PUserCenter;

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.whiteSmokeColor};

  .ant-tabs-nav {
    padding-top: 20px !important;
    font-weight: bold;

    .ant-tabs-tab-btn {
      font-size: 18px;
    }
  }
  .tabPaymentMethod {
    margin: 20px 0;
    background-color: ${({ theme }) => theme.p2pBackground};
    padding: 20px;
    border-radius: 5px;

    .title {
      margin-top: 20px;
      margin-bottom: 30px;
      font-weight: bold;
    }

    .desc {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;

      button {
        margin-left: 100px;
        height: 50px;
        width: 500px;
        background-color: ${({ theme }) => theme.brightGrayColor};
        border: none;
        transition: all 0.25s linear;

        &:focus {
          box-shadow: none;
        }
        &:hover {
          opacity: 0.9;
        }

        .plusIcon {
          font-size: 20px;
          transform: translateY(-2px);
        }
      }

      p {
        color: ${({ theme }) => theme.grayColor};
      }
    }

    .listUserPayment {
      margin-top: 50px;

      .ant-list-item {
        padding: 0;
        border: 1px solid ${({ theme }) => theme.brightGrayColor} !important;
        border-radius: 5px;
        margin-bottom: 30px;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        transition: all 0.25s linear;

        &:hover {
          box-shadow: 0px 2px 5px 3px ${({ theme }) => theme.brightGrayColor};
        }

        .headerItem {
          background-color: ${({ theme }) => theme.whiteSmokeColor};
          padding: 15px 20px;

          width: 100%;
          display: flex;
          justify-content: space-between;
        }

        .contentItem {
          padding: 25px 20px 15px;
          width: 100%;
          display: flex;

          .infoPM {
            width: 25%;
            margin-bottom: 0;
            color: ${({ theme }) => theme.brightGrayColor};

            .PMdesc {
              color: ${({ theme }) => theme.p2pText};
            }
          }
        }
        .action {
          font-weight: bold;

          span {
            margin-left: 20px;
            cursor: pointer;
          }
        }
      }
    }
  }
`;

const ModalAddPayemnt = styled(Modal)`
  color: ${({ theme }) => theme.p2pText};

  .modal-header {
    font-weight: bold;
    .btn-close {
      &:focus {
        box-shadow: none;
      }

      transform: translateY(-2px);
    }
  }

  .modal-body {
    padding: 20px;

    .allMT {
      display: flex;
      flex-wrap: wrap;
      margin-top: 20px;
    }

    .pmTagContain {
      width: 50%;
      margin-bottom: 10px;
    }

    .rcmTag {
      margin-bottom: 20px;
    }

    .ant-tag {
      padding: 3px 15px;
      cursor: pointer;
      transition: all 0.25s linear;

      &:hover {
        opacity: 0.6;
      }

      img {
        width: 20px;
        border-radius: 2px;
        margin-right: 10px;
        margin-bottom: 1px;
      }
    }
  }
`;
