import React from 'react';
import styled from 'styled-components';
import NavMenu from 'app/components/Navbar';
import NavbarTradeP2P from 'app/components/NavbarTradeP2P';
import HeaderOrderDetail from './components/HeaderOrderDetail';
import ContentOrderDetail from './components/ContentOrderDetail';
function TabOrderDetailContainer() {
  return (
    <Wrapper>
      <NavMenu />
      <NavbarTradeP2P defaultActiveKey="" />
      <HeaderOrderDetail />
      <div className="orderDetail-container container">
        <ContentOrderDetail />
      </div>
    </Wrapper>
  );
}

export default TabOrderDetailContainer;

export const Wrapper = styled.div`
  background: ${({ theme }) => theme.text};
  color: ${({ theme }) => theme.body};

  min-height: 100vh;
`;
