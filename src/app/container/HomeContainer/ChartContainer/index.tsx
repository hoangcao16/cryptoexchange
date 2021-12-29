import styled from 'styled-components';
import { Container, Row, Col } from 'react-bootstrap';
import ContentHeader from 'app/components/ContentHeader';
import OrderBook from 'app/components/OrderBook';
import Chart from 'app/components/Chart';
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
            <StyledCol md={4}>
              <OrderBook />
            </StyledCol>
            <StyledCol md={8}>
              <Chart />
            </StyledCol>
          </StyledRow>
        </Col>
        <StyledCol md={3}>
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
`;
const StyledCol = styled(Col)`
  padding: 0;
`;
