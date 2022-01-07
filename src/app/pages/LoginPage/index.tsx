import LoginContainer from 'app/container/LoginContainer';
import styled from 'styled-components';
import { Helmet } from 'react-helmet-async';

export function LoginPage() {
  return (
    <App>
      <Helmet>
        <title>Signin Page | Trading View</title>
        <meta name="description" content="Login Trading View Web" />
      </Helmet>
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
