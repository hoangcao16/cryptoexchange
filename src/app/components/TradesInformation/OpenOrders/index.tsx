import AuthMandatory from 'app/components/AuthMandatory';
import { Container } from './style';
import { getToken } from 'app/components/common/common';
import OpenOrderList from './components/OpenOrderList';
const Orders = () => {
  return (
    <>
      {getToken() ? (
        <OpenOrderList />
      ) : (
        <Container>
          <AuthMandatory />
        </Container>
      )}
    </>
  );
};
export default Orders;
