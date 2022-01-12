import AuthNavbar from 'app/components/Navbar/authNav';
import Alert from './components/Alert';
import { Container, Row, Col, Toast } from 'react-bootstrap';
import {
  Main,
  LeftMenu,
  GroupHelpButton,
  StyledLink,
  StyledSuccessToast,
  StyledErrorToast,
  StyledToastContainer,
} from './style';
import { MdError } from 'react-icons/md';
import { IoCheckmarkDoneCircleSharp } from 'react-icons/io5';
import LoginByEmail from './components/LoginByEmail';
import EmailVerification from './components/EmailVerification';
import { useEffect, useState } from 'react';
import AuthFooter from 'app/components/AuthFooter';
import { useSelector, useDispatch } from 'react-redux';
import { selectLogin } from './slice/selectors';
import { useLoginSlice } from './slice';
import Fade from 'react-bootstrap/Fade';

const LoginContainer = () => {
  const dispatch = useDispatch();
  const { actions } = useLoginSlice();
  const [emailLogin, setEmailLogin] = useState('');
  const dataLogin: any = useSelector(selectLogin);
  useEffect(() => {
    return () => {
      dispatch(actions.handleStepLogin(1));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //success toast
  const SuccessToast = () => {
    return (
      <Fade in={dataLogin.openSuccessToast}>
        <StyledSuccessToast
          onClose={() => {
            dispatch(actions.handleOpenSuccessToast(false));
          }}
          show={dataLogin.openSuccessToast}
          delay={3000}
          autohide
        >
          <Toast.Header>
            <IoCheckmarkDoneCircleSharp className="icon-success" />
            <strong className="me-auto">Success</strong>
          </Toast.Header>
          <Toast.Body>Email code sent successfully</Toast.Body>
        </StyledSuccessToast>
      </Fade>
    );
  };
  //error toast
  const ErrorToast = () => {
    return (
      <Fade in={dataLogin.openErrorToast}>
        <StyledErrorToast
          onClose={() => {
            dispatch(actions.handleOpenErrorToast(false));
          }}
          show={dataLogin.openErrorToast}
          delay={3000}
          autohide
        >
          <Toast.Header>
            <MdError className="icon-error" />
            <strong className="me-auto">Error</strong>
          </Toast.Header>
          <Toast.Body>{dataLogin.messageError}</Toast.Body>
        </StyledErrorToast>
      </Fade>
    );
  };
  return (
    <>
      <AuthNavbar />
      <Alert />
      <Main>
        <Container>
          <Row className="justify-content-md-center">
            <LeftMenu xs lg="4">
              {dataLogin.stepLogin === 1 ? (
                <>
                  <div className="title">Binance Account Login</div>
                  <div className="sub-title">
                    Welcome back! Log In with your Email, Phone number or QR
                    code
                  </div>
                  <LoginByEmail emailLogin={setEmailLogin} />
                  <GroupHelpButton>
                    <StyledLink to="/">Forgot password?</StyledLink>
                    <StyledLink to="/register">Register now</StyledLink>
                  </GroupHelpButton>
                </>
              ) : dataLogin.stepLogin === 2 ? (
                <EmailVerification email={emailLogin} />
              ) : null}
            </LeftMenu>
            <Col xs lg="3"></Col>
          </Row>
        </Container>
        <StyledToastContainer>
          <SuccessToast />
          <ErrorToast />
        </StyledToastContainer>
      </Main>
      <AuthFooter />
    </>
  );
};
export default LoginContainer;
