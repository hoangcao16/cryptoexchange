import AuthMandatory from 'app/components/AuthMandatory';
import { MyTradesComponent } from './style';
const MyTrades = () => {
  return (
    <MyTradesComponent>
      <AuthMandatory />
    </MyTradesComponent>
  );
};
export default MyTrades;
