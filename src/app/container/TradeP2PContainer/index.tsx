import NavMenu from 'app/components/Navbar';
import React, { useEffect, useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import { createSearchParams, useLocation, useNavigate } from 'react-router-dom';
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

        <div className="trade-tabs">
          <Tabs
            defaultActiveKey={defaultActiveKey}
            id="uncontrolled-tab-example"
            className="container nav-tabs-trade-p2p"
            onSelect={key => handleChangeTabs(key)}
          >
            <Tab eventKey="express" title="Express">
              <TabExpressContainer />
            </Tab>
            <Tab eventKey="p2p" title="P2P">
              <TabP2PContainer />
            </Tab>
          </Tabs>
        </div>
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
    .nav-tabs-trade-p2p {
      height: 60px;
      border: none;
    }

    .nav-tabs-trade-p2p .nav-link {
      height: 100%;
      color: ${({ theme }) => theme.text};
      font-weight: 500;
      background: transparent;
      border: none;
      border-bottom: 2px solid transparent;

      &.active {
        border-bottom: 2px solid ${({ theme }) => theme.text};
      }
    }
  }
`;
