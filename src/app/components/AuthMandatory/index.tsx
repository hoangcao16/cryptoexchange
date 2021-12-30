import styled from 'styled-components';
const AuthMandatory = () => {
  return (
    <span>
      <Span href="/#">Log In</Span> or <Span href="/#">Register Now</Span> to
      trade
    </span>
  );
};
export const Span = styled.a`
  color: ${({ theme }) => theme?.colors?.secondary};
  text-decoration: none;
  &:hover {
    color: ${({ theme }) => theme?.colors?.secondary};
  }
`;
export default AuthMandatory;
