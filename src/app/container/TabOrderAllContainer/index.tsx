import NavMenu from 'app/components/Navbar';
import NavbarTradeP2P from 'app/components/NavbarTradeP2P';
import styled from 'styled-components';
import { List, Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { tabOrderDetailService } from 'services/orderDetailService';
import { Link } from 'react-router-dom';
import { FaCopy } from 'react-icons/fa';
import { OrderAllServices } from 'services/tabOrderAllServices';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import openNotification from 'app/components/NotificationAntd';
const TabOrderAllContainer = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [dataView, setDataView] = useState<any>([]);
  const [listTrades, setListTrades] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  const { getTradeByToken, getTradeByStatus } = OrderAllServices;

  const getListOrderUser = () => {
    setLoading(true);
    getTradeByToken()
      .then(res => {
        if (res.data.rc === 0) {
          setListTrades(res.data.rows);
          setLoading(false);
        } else console.log(res.data.rd);
      })
      .catch(() => openNotification('Error', 'Something went wrong!'));
  };

  const getListOrderUserProcessing = () => {
    setLoading(true);
    getTradeByStatus('PROCESSING')
      .then(res => {
        if (res.data.rc === 0) {
          setListTrades(res.data.rows);
          setLoading(false);
        } else console.log(res.data.rd);
      })
      .catch(() => openNotification('Error', 'Something went wrong!'));
  };

  const handleCopy = value => {
    navigator.clipboard.writeText(value);
  };

  useEffect(() => {
    if (activeTab === 1) {
      getListOrderUserProcessing();
    } else {
      getListOrderUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  return (
    <Wrapper>
      <NavMenu />
      <NavbarTradeP2P defaultActiveKey="" />
      <div className="navTab">
        <div className="container tabTitle">
          <p
            className={activeTab === 1 ? 'active' : ''}
            onClick={() => setActiveTab(1)}
          >
            Processing
          </p>
          <p
            className={activeTab === 2 ? 'active' : ''}
            onClick={() => setActiveTab(2)}
          >
            All orders
          </p>
        </div>
      </div>
      <div className="container mainContent">
        <div className="content">
          <List
            loading={{
              spinning: loading,
              indicator: <AiOutlineLoading3Quarters className="loadingIcon" />,
            }}
            header={
              <div>
                <Row>
                  <Col>Type/Coin</Col>
                  <Col>Fiat amount</Col>
                  <Col>Price</Col>
                  <Col>Crypto amount</Col>
                  <Col>Counterparty</Col>
                  <Col>Status</Col>
                  <Col>Operation</Col>
                </Row>
              </div>
            }
            dataSource={listTrades?.reverse()}
            renderItem={(item: any) => {
              let d = new Date(item.createTime);
              return (
                <List.Item>
                  <Row className="item">
                    <div className="titleItem">
                      <div>
                        {item?.partner?.email === item?.sellEmail ? (
                          <span data-color="red">Sell</span>
                        ) : (
                          <span data-color="green">Buy</span>
                        )}
                        <span>
                          {d.getDate()}/{d.getMonth() + 1}/{d.getFullYear()} -{' '}
                          {d.getHours()}:{d.getMinutes()}:{d.getSeconds()}
                        </span>
                      </div>
                      <span>
                        {item.orderNumber}{' '}
                        <Tooltip
                          title="Copied"
                          trigger="click"
                          placement="right"
                        >
                          <FaCopy
                            className="copyIcon"
                            onClick={() => handleCopy(item.orderNumber)}
                          />
                        </Tooltip>
                      </span>
                    </div>
                    <Col className="colToken">
                      <img
                        className="iconToken"
                        src={item?.order?.token?.icon}
                        alt={item?.order?.token?.assetName}
                      />
                      <span>{item?.order?.token?.assetName}</span>
                    </Col>
                    <Col>
                      <b>
                        {item?.total.toFixed(2)} {item?.order?.fiat?.name}
                      </b>
                    </Col>
                    <Col>
                      <span>
                        {item?.price?.toFixed(2)} {item?.order?.fiat?.name}
                      </span>
                    </Col>
                    <Col>
                      <span>
                        {item?.amount?.toFixed(2)}{' '}
                        {item?.order?.token?.assetName}
                      </span>
                    </Col>
                    <Col>
                      <span>{item?.partner?.email}</span>
                    </Col>
                    <Col>
                      <b>{item?.status}</b>
                    </Col>
                    <Col>
                      <Link to={`/order/orderDetail/${item.id}`}>Contact</Link>
                    </Col>
                  </Row>
                </List.Item>
              );
            }}
            pagination={{
              onChange: page => {
                console.log(page);
              },
              pageSize: 5,
            }}
          />
        </div>
      </div>
    </Wrapper>
  );
};

export default TabOrderAllContainer;

const Wrapper = styled.div`
  background: ${({ theme }) => theme.p2pBackground};

  .navTab {
    box-shadow: 0 2px 2px -2px ${({ theme }) => theme.brightGrayColor};
    padding-top: 30px;

    .tabTitle {
      padding: 0 28px;
      font-weight: bold;
      font-size: 16px;
      display: flex;
      p {
        margin-right: 15px;
        margin-bottom: 0;
        padding-bottom: 10px;
        border-bottom: 3px solid transparent;
        transition: all 0.25s linear;
        cursor: pointer;
        color: ${({ theme }) => theme.grayColor};
      }
      .active {
        color: ${({ theme }) => theme.p2pText};
        border-bottom: 3px solid ${({ theme }) => theme.primary};
      }
    }
  }

  .mainContent {
    min-height: 50vh;
    padding: 20px 25px;

    .header {
      margin-bottom: 20px;
    }
  }

  .ant-list-item {
    width: 100%;
    display: block;
    padding: 0px 12px;
    transform: translateX(-1px);
    .iconToken {
      width: 30px !important;
      margin-right: 10px;
    }

    .titleItem {
      display: flex;
      justify-content: space-between;
      background-color: ${({ theme }) => theme.whiteSmokeColor};
      padding: 10px 10px;
      margin: 1px;
      color: ${({ theme }) => theme.brightGrayColor};

      span[data-color='red'] {
        font-weight: bold;
        color: ${({ theme }) => theme.redColor};
        padding-right: 10px;
        margin-right: 10px;
        border-right: 2px solid ${({ theme }) => theme.redColor};
      }
      span[data-color='green'] {
        font-weight: bold;
        color: ${({ theme }) => theme.greenColor};
        padding-right: 10px;
        margin-right: 10px;
        border-right: 2px solid ${({ theme }) => theme.greenColor};
      }
    }

    .col {
      padding: 20px 12px;

      a {
        color: ${({ theme }) => theme.primary};
        text-decoration: none;
      }

      .colToken {
        /* transform: translateY(-2px); */
      }
    }
    .copyIcon {
      margin-left: 10px;
      cursor: pointer;
    }
  }
  @keyframes spining {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  .loadingIcon {
    -webkit-animation: spining 1.1s infinite linear;
    animation: spining 1.1s infinite linear;
  }
`;
