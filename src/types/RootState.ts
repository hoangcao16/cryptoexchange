// [IMPORT NEW CONTAINERSTATE ABOVE] < Needed for generating containers seamlessly
import { VerifyEmailRegisterState } from 'app/container/RegisterContainer/components/EmailVerification/slice/types';
import { RegisterState } from 'app/container/RegisterContainer/slice/types';
/* 
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
*/
export interface RootState {
  register: RegisterState;
  verifyEmailRegister: VerifyEmailRegisterState;
}
