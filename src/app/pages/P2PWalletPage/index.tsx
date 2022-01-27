import styled from 'styled-components';
import { Helmet } from 'react-helmet-async';
import P2PWalletContainer from 'app/container/P2PWalletContainer';
export function P2PWalletPage() {
  return (
    <App>
      <Helmet>
        <title>P2P - Wallet | Trading View</title>
        <meta name="description" content="Login Trading View Web" />
      </Helmet>
      <P2PWalletContainer />
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
  color: ${({ theme }) => theme.background};
`;
