import { Container, Row, Col, ToastContainer, Toast } from 'react-bootstrap';
import { Main, LeftMenu, StyledToast } from './style';
import Stepper from './components/Stepper';
import AccountDetail from './components/AccountDetail';
import EmailVerification from './components/EmailVerification';
import { useState, useEffect } from 'react';
import { IoCheckmarkDoneCircleSharp } from 'react-icons/io5';
import AuthNavbar from 'app/components/Navbar/authNav';
import AuthFooter from 'app/components/AuthFooter';

const RegisterContainer = () => {
  const [stepRegister, setStepRegister] = useState(1);
  const [showToast, setShowToast] = useState(false);
  const [emailRegister, setEmailRegister] = useState('');
  useEffect(() => {
    if (stepRegister === 2) {
      setShowToast(true);
    }
  }, [stepRegister]);
  return (
    <>
      <AuthNavbar />
      <Main>
        <Container>
          <Row className="justify-content-md-center">
            <LeftMenu xs lg="4">
              {stepRegister === 1 ? (
                <AccountDetail
                  stepchanger={setStepRegister}
                  emailregis={setEmailRegister}
                />
              ) : stepRegister === 2 ? (
                <EmailVerification email={emailRegister} />
              ) : null}
            </LeftMenu>
            <Col xs lg="4">
              <Stepper footStep={stepRegister} />
            </Col>
          </Row>
        </Container>
        <ToastContainer position="top-end">
          <StyledToast
            onClose={() => setShowToast(false)}
            show={showToast}
            delay={3000}
            autohide
          >
            <Toast.Header>
              <IoCheckmarkDoneCircleSharp className="icon-success" />
              <strong className="me-auto">Success</strong>
            </Toast.Header>
            <Toast.Body>Email code sent successfully</Toast.Body>
          </StyledToast>
        </ToastContainer>
      </Main>
      <AuthFooter />
    </>
  );
};
export default RegisterContainer;
