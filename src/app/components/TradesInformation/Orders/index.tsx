import AuthMandatory from 'app/components/AuthMandatory';
import { Container } from './style';
import { getToken } from 'app/components/common/common';
import TradeOrderList from './components/TradeOrderList';
const Orders = () => {
  return (
    <>
      {getToken() ? (
        <TradeOrderList />
      ) : (
        <Container>
          <AuthMandatory />
        </Container>
      )}
    </>
  );
};
export default Orders;
