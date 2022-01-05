import LoginContainer from 'app/container/LoginContainer';
import styled from 'styled-components';

export function LoginPage() {
  return (
    <App>
      <LoginContainer />
    </App>
  );
}
export const App = styled.div`
  box-sizing: border-box;
  margin: 0;
  min-width: 0;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  color: ${({ theme }) => theme.text};
`;
