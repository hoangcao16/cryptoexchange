// import styled from 'styled-components';
import { Container, Row, Col } from 'react-bootstrap';
import ContentHeader from 'app/components/ContentHeader';
const HomeContentContainer = () => {
  return (
    <Container>
      <Row>
        <Col md={8}>
          <Row>
            <ContentHeader />
          </Row>
        </Col>
        <Col md={4}></Col>
      </Row>
    </Container>
  );
};
export default HomeContentContainer;
