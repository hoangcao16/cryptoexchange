import styled from 'styled-components';
import { Container, Row, Col } from 'react-bootstrap';
import ContentHeader from 'app/components/ContentHeader';
import OrderBook from 'app/components/OrderBook';
import Chart from 'app/components/Chart';
import OrderFormContainer from 'app/container/HomeContainer/OrderFormContainer';
import Market from 'app/components/Market';
import Trades from 'app/components/Trades';
const HomeContentContainer = () => {
  return (
    <Container>
      <StyledRow>
        <Col md={9}>
          <StyledRow>
            <ContentHeader />
          </StyledRow>
          <StyledRow>
            <StyledCol md={4} className="orderbook-section">
              <OrderBook />
            </StyledCol>
            <StyledCol md={8} className="d-flex flex-column">
              <Chart />
              <OrderFormContainer />
            </StyledCol>
          </StyledRow>
        </Col>
        <StyledCol md={3} className="right-menu">
          <Market />
          <Trades />
        </StyledCol>
      </StyledRow>
    </Container>
  );
};
export default HomeContentContainer;
const StyledRow = styled(Row)`
  padding: 0;
  .orderbook-section,
  .right-menu {
    border: ${({ theme }) => theme.borderGray};
  }
`;
const StyledCol = styled(Col)`
  padding: 0;
`;
