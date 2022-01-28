// [IMPORT NEW CONTAINERSTATE ABOVE] < Needed for generating containers seamlessly
import { VerifyEmailRegisterState } from 'app/container/RegisterContainer/components/EmailVerification/slice/types';
import { RegisterState } from 'app/container/RegisterContainer/slice/types';
import { LoginState } from 'app/container/LoginContainer/slice/types';
import { BuyspotlimitState } from 'app/components/OrderForm/components/LimitForm/components/BuyForm/slice/types';
import { SellspotlimitState } from 'app/components/OrderForm/components/LimitForm/components/SellForm/slice/types';
import { ToastState } from 'app/components/Toast/slice/types';
import { OrderbookState } from 'app/components/OrderBook/slice/types';
import { GetallpairState } from 'app/components/Market/slice/types';
import { TradesState } from 'app/components/Trades/slice/types';
import { WebsocketState } from 'app/container/HomeContainer/slice/types';
import { GetopenOrderState } from 'app/components/TradesInformation/OpenOrders/slice/types';
import { OrderhistoryState } from 'app/components/TradesInformation/OrderHistory/slice/types';
import { SpotWalletState } from 'app/container/SpotWalletContainer/slice/types';
import { P2PWalletState } from 'app/container/P2PWalletContainer/slice/types';
import { GetBalancePairState } from 'app/components/OrderForm/slice/types';
/* 
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
*/
export interface RootState {
  register: RegisterState;
  verifyEmailRegister: VerifyEmailRegisterState;
  login: LoginState;
  buyspotlimit: BuyspotlimitState;
  sellspotlimit: SellspotlimitState;
  toast: ToastState;
  orderbook: OrderbookState;
  getallpair: GetallpairState;
  trades: TradesState;
  websocket: WebsocketState;
  getopenOrder: GetopenOrderState;
  orderhistory: OrderhistoryState;
  spotWallet: SpotWalletState;
  p2pWallet: P2PWalletState;
  getBalancePair: GetBalancePairState;
}
