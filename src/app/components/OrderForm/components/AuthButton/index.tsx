import styled from 'styled-components';
const AuthButton = () => {
  return (
    <Container>
      <span>
        <Span href="/#">Log In</Span> or <Span href="/#">Register Now</Span>
      </span>
    </Container>
  );
};
export default AuthButton;

export const Container = styled.div`
  margin: 0px;
  min-width: 0px;
  font-size: 14px;
  background-color: ${({ theme }) => theme.backgroundDropdown};
  border-radius: 4px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const Span = styled.a`
  color: ${({ theme }) => theme.primary};
  text-decoration: none;
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;
