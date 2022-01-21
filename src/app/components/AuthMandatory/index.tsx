import styled from 'styled-components';
import { Link } from 'react-router-dom';
const AuthMandatory = () => {
  return (
    <span>
      <StyledLink to="/login">Log In</StyledLink> or
      <StyledLink to="/register">Register Now</StyledLink> to trade
    </span>
  );
};
export const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.primary};
  text-decoration: none;
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;
export default AuthMandatory;
