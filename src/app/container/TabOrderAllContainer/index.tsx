import NavMenu from 'app/components/Navbar';
import NavbarTradeP2P from 'app/components/NavbarTradeP2P';
import styled from 'styled-components';
import { Tabs } from 'antd';
import { useEffect, useState } from 'react';

const TabOrderAllContainer = () => {
  const { TabPane } = Tabs;
  const [activeTab, setActiveTab] = useState(1);
  console.log(activeTab.toString());

  const columns = [
    {
      title: 'Type/Coin',
      dataIndex: '',
      key: '1',
    },
  ];

  useEffect(() => {});

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
          {activeTab === 2 && <div className="filter">Filter</div>}
          {activeTab === 1 && <div className="filter">All</div>}
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
    padding: 20px 0;
  }
`;
