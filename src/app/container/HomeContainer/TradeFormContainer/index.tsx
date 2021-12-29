import { Container } from 'react-bootstrap';
import styled from 'styled-components';
const TradeFormContainer = () => {
  return (
    <StyledContainer>
      <h1>This is Trade Form Components</h1>
    </StyledContainer>
  );
};
export default TradeFormContainer;
export const StyledContainer = styled(Container)`
  border: ${({ theme }) => theme.borderGray};
  min-height: 200px;
`;
