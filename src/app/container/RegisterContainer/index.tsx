import { Container, Row, Col, Toast } from 'react-bootstrap';
import {
  Main,
  LeftMenu,
  StyledSuccessToast,
  StyledErrorToast,
  StyledToastContainer,
} from './style';
import Stepper from './components/Stepper';
import AccountDetail from './components/AccountDetail';
import EmailVerification from './components/EmailVerification';
import { useState, useEffect } from 'react';
import { IoCheckmarkDoneCircleSharp } from 'react-icons/io5';
import AuthNavbar from 'app/components/Navbar/authNav';
import AuthFooter from 'app/components/AuthFooter';
import { useSelector, useDispatch } from 'react-redux';
import { selectRegister } from './slice/selectors';
import { useRegisterSlice } from './slice';
import { MdError } from 'react-icons/md';
import Fade from 'react-bootstrap/Fade';

const RegisterContainer = () => {
  const dispatch = useDispatch();
  const [emailRegister, setEmailRegister] = useState('');
  const { actions } = useRegisterSlice();
  const dataRegister: any = useSelector(selectRegister);

  useEffect(() => {
    return () => {
      dispatch(actions.handleStepRegister(1));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //success toast
  const SuccessToast = () => {
    return (
      <Fade in={dataRegister.openSuccessToast} timeout={2000}>
        <StyledSuccessToast
          onClose={() => {
            dispatch(actions.handleOpenSuccessToast(false));
          }}
          transition={Fade}
          show={dataRegister.openSuccessToast}
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
      <StyledErrorToast
        onClose={() => {
          dispatch(actions.handleOpenErrorToast(false));
        }}
        show={dataRegister.openErrorToast}
        delay={3000}
        autohide
      >
        <Toast.Header>
          <MdError className="icon-error" />
          <strong className="me-auto">Error</strong>
        </Toast.Header>
        <Toast.Body>{dataRegister.messageError}</Toast.Body>
      </StyledErrorToast>
    );
  };
  return (
    <>
      <AuthNavbar />
      <Main>
        <Container>
          <Row className="justify-content-md-center">
            <LeftMenu xs lg="4">
              {dataRegister.stepRegister === 1 ? (
                <AccountDetail emailregis={setEmailRegister} />
              ) : dataRegister.stepRegister === 2 ? (
                <EmailVerification email={emailRegister} />
              ) : null}
            </LeftMenu>
            <Col xs lg="4">
              <Stepper footStep={dataRegister.stepRegister} />
            </Col>
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
export default RegisterContainer;
