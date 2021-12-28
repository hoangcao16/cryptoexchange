import styled from 'styled-components';
import { Container, Row, Col } from 'react-bootstrap';
import ContentHeader from 'app/components/ContentHeader';
import OrderBook from 'app/components/OrderBook';
import Chart from 'app/components/Chart';
const HomeContentContainer = () => {
  return (
    <Container>
      <StyledRow>
        <StyledCol md={8}>
          <StyledRow>
            <ContentHeader />
            <StyledCol md={4}>
              <OrderBook />
            </StyledCol>
            <StyledCol md={8}>
              <Chart />
            </StyledCol>
          </StyledRow>
        </StyledCol>
        <StyledCol md={4}></StyledCol>
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
