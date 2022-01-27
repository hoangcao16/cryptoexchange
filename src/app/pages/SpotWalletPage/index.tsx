import styled from 'styled-components';
import { Helmet } from 'react-helmet-async';
import SpotWalletContainer from 'app/container/SpotWalletContainer';
export function SpotWalletPage() {
  return (
    <App>
      <Helmet>
        <title>Spot - Wallet | Trading View</title>
        <meta name="description" content="Login Trading View Web" />
      </Helmet>
      <SpotWalletContainer />
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
