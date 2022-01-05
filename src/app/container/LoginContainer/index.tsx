import AuthNavbar from 'app/components/Navbar/authNav';
import Alert from './components/Alert';
import { Container, Row, Col } from 'react-bootstrap';
import { Main, LeftMenu, GroupHelpButton, StyledLink } from './style';
import LoginByEmail from './components/LoginByEmail';
import EmailVerification from './components/EmailVerification';
import { useState } from 'react';
import AuthFooter from 'app/components/AuthFooter';

const LoginContainer = () => {
  const [stepLogin, setStepLogin] = useState(1);
  return (
    <>
      <AuthNavbar />
      <Alert />
      <Main>
        <Container>
          <Row className="justify-content-md-center">
            <LeftMenu xs lg="4">
              {stepLogin === 1 ? (
                <>
                  <div className="title">Binance Account Login</div>
                  <div className="sub-title">
                    Welcome back! Log In with your Email, Phone number or QR
                    code
                  </div>
                  <LoginByEmail stepChanger={setStepLogin} />
                  <GroupHelpButton>
                    <StyledLink to="/">Forgot password?</StyledLink>
                    <StyledLink to="/register">Register now</StyledLink>
                  </GroupHelpButton>
                </>
              ) : stepLogin === 2 ? (
                <EmailVerification />
              ) : null}
            </LeftMenu>
            <Col xs lg="3"></Col>
          </Row>
        </Container>
      </Main>
      <AuthFooter />
    </>
  );
};
export default LoginContainer;
