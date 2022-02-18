import { Button, Popover } from 'antd';
import NavMenu from 'app/components/Navbar';
import React, { useEffect, useState } from 'react';
import {
  AiOutlinePlayCircle,
  AiOutlineFileText,
  AiOutlineTeam,
  AiOutlineMore,
  AiOutlineCaretDown,
  AiOutlineControl,
  AiOutlineMonitor,
  AiOutlinePlusCircle,
  AiOutlineProfile,
} from 'react-icons/ai';
import {
  createSearchParams,
  Link,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import styled from 'styled-components';
import TabExpressContainer from '../TabExpressContainer';
import TabP2PContainer from '../TabP2PContainer';

function TradeP2PContainer() {
  const location = useLocation();
  const navigate = useNavigate();

  const pathName = location.pathname.split('/');

  const [defaultActiveKey, setDefaultActiveKey] = useState(
    pathName[2] ? pathName[2] : 'p2p',
  );

  const handleChangeTabs = (key: any) => {
    if (key === 'p2p') {
      navigate({
        pathname: '/trade-p2p/p2p/',
        search: `?${createSearchParams({
          action: 'sell',
          crypto: '',
          fiat: '',
          payment: '',
        })}`,
      });
    }

    if (key === 'express') {
      navigate('/trade-p2p/express/buy');
    }
  };

  useEffect(() => {
    pathName[2] ? setDefaultActiveKey(pathName[2]) : setDefaultActiveKey('p2p');
  }, [pathName]);

  //

  const ContentOrders = (
    <ContentOrdersStyled>
      <div className="orderTitle">
        <div className="orderTitle__text">Processing</div>
        <Button type="link" className="orderTitle__link">
          All Orders
        </Button>
      </div>

      <div className="orderContent">content</div>
    </ContentOrdersStyled>
  );

  const ContentMore = (
    <ContentMoreStyled>
      <ul>
        <Link to="#">
          <li>
            <AiOutlineMonitor className="moreIcon" /> Payment Methods
          </li>
        </Link>

        <Link to="#">
          <li>
            <AiOutlinePlusCircle className="moreIcon" /> Post new Ad
          </li>
        </Link>

        <Link to="#">
          <li>
            <AiOutlineControl className="moreIcon" /> My Ads
          </li>
        </Link>

        <Link to="#">
          <li>
            <AiOutlineProfile className="moreIcon" /> P2P Trading FAQ
          </li>
        </Link>
      </ul>
    </ContentMoreStyled>
  );

  return (
    <Wrapper>
      <NavMenu />
      <NavbarTradeP2P>
        <div className="header">
          <h1>POW P2P: Buy/Sell Your Crypto Locally</h1>
          <p className="header--des">
            Peer-to-peer exchange (or P2P exchange) is a marketplace where
            people can trade crypto directly with each other on their own terms,
            in virtually any country.
          </p>
        </div>

        <div className="trade-tabs container">
          <div>
            <Button
              type="link"
              className={
                defaultActiveKey === 'express'
                  ? 'trade-tabs__button trade-tabs__button--active'
                  : 'trade-tabs__button'
              }
              onClick={() => handleChangeTabs('express')}
            >
              Express
            </Button>

            <Button
              type="link"
              className={
                defaultActiveKey === 'p2p'
                  ? 'trade-tabs__button trade-tabs__button--active'
                  : 'trade-tabs__button'
              }
              onClick={() => handleChangeTabs('p2p')}
            >
              P2P
            </Button>
          </div>

          <div className="trade-tabs__options">
            <Button
              type="link"
              className="btnOption"
              icon={<AiOutlinePlayCircle className="btnOption__icon" />}
            >
              Video tutorial
            </Button>

            <Popover content={ContentOrders} placement="bottomLeft">
              <Button
                type="link"
                className="btnOption"
                icon={<AiOutlineFileText className="btnOption__icon" />}
              >
                Orders
              </Button>
            </Popover>

            <Button
              type="link"
              className="btnOption"
              icon={<AiOutlineTeam className="btnOption__icon" />}
            >
              P2P User Center
            </Button>

            <Popover content={ContentMore} placement="bottomRight">
              <Button
                type="link"
                className="btnOption"
                icon={<AiOutlineMore className="btnOption__icon" />}
              >
                More <AiOutlineCaretDown style={{ marginLeft: '8px' }} />
              </Button>
            </Popover>
          </div>
        </div>

        {defaultActiveKey === 'p2p' && <TabP2PContainer />}
        {defaultActiveKey === 'express' && <TabExpressContainer />}
      </NavbarTradeP2P>
    </Wrapper>
  );
}

export default TradeP2PContainer;

export const Wrapper = styled.div``;

export const NavbarTradeP2P = styled.div`
  color: ${({ theme }) => theme.text};

  .header {
    display: flex;
    flex-direction: column;
    align-items: center;

    padding: 16px 0px;
    background: url('https://wallpaper.dog/large/6768.jpg') no-repeat center;
    h1 {
      color: ${({ theme }) => theme.text};
    }

    &--des {
      max-width: 600px;
      text-align: center;
    }
  }

  .trade-tabs {
    height: 60px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    button:focus,
    button:active {
      box-shadow: none;
    }

    &__button {
      height: 60px;

      color: ${({ theme }) => theme.text};
      opacity: 0.5;

      border: 2px solid transparent;
      background-color: inherit;

      &--active {
        border-bottom: 2px solid #ffffff;
        opacity: 1;
      }
    }

    &__options {
      .btnOption {
        height: 60px;
        color: ${({ theme }) => theme.text};

        &__icon {
          font-size: 20px;
          margin-right: 4px;
          margin-top: -3px;
        }

        &:hover {
          opacity: 0.5;
        }
      }
    }
  }
`;

const ContentOrdersStyled = styled.div`
  width: 300px;
  .orderTitle {
    display: flex;
    align-items: center;
    justify-content: space-between;

    &__text {
      font-weight: bold;
    }

    &__link {
      color: ${({ theme }) => theme.powColor};
    }

    border-bottom: 1px solid ${({ theme }) => theme.p2pBorder};
  }
`;

const ContentMoreStyled = styled.div`
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  li {
    width: 200px;
    height: 40px;
    line-height: 40px;

    &:hover {
      font-weight: bold;
      color: ${({ theme }) => theme.powColor};
    }
  }
  .moreIcon {
    font-size: 20px;
  }
`;
