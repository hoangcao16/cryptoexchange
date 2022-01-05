import styled from 'styled-components';
import { Helmet } from 'react-helmet-async';
import RegisterContainer from 'app/container/RegisterContainer';
export function RegisterPage() {
  return (
    <App>
      <Helmet>
        <title>Register Page</title>
        <meta
          name="description"
          content="A Boilerplate application Register page"
        />
      </Helmet>
      <RegisterContainer />
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
