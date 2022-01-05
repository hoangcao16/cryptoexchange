import { Container, Row, Col, ToastContainer, Toast } from 'react-bootstrap';
import { Main, LeftMenu, StyledToast } from './style';
import Stepper from './components/Stepper';
import { useGlobalContext } from 'app/components/common/context';
import AccountDetail from './components/AccountDetail';
import EmailVerification from './components/EmailVerification';
import { useState } from 'react';
import { IoCheckmarkDoneCircleSharp } from 'react-icons/io5';

const RegisterContainer = () => {
  const { stepRegister } = useGlobalContext();
  const [show, setShow] = useState(true);
  return (
    <Main>
      <Container>
        <Row className="justify-content-md-center">
          <LeftMenu xs lg="4">
            {stepRegister === 1 ? (
              <AccountDetail />
            ) : stepRegister === 2 ? (
              <EmailVerification />
            ) : null}
          </LeftMenu>
          <Col xs lg="4">
            <Stepper footStep={stepRegister} />
          </Col>
        </Row>
      </Container>
      <ToastContainer position="top-end">
        <StyledToast
          onClose={() => setShow(false)}
          show={show}
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
  );
};
export default RegisterContainer;
