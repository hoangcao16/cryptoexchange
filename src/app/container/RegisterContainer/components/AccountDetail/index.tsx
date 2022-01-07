import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import ShowIcon from 'app/assets/img/showpassIcon';
import UpDownIcon from 'app/assets/img/UpDownIcon';
import { useState } from 'react';
import {
  Form,
  EmailSection,
  PasswordSection,
  StyledCheckbox,
  RefID,
  ErrorMessage,
} from './style';
import { useDispatch } from 'react-redux';
import { useRegisterSlice } from '../../slice';
import { useHistory } from 'react-router-dom';

//declare type
type UserSubmitFormSignup = {
  email: string;
  password: string;
  referralId: string;
  allowReceiveEmail: boolean;
  allowShareData: boolean;
};

const AccountDetail = ({ emailregis }: any) => {
  const dispatch = useDispatch();
  let history = useHistory();
  const { actions } = useRegisterSlice();
  const [showPassword, setShowPassword] = useState(false);
  const [showRef, setShowRef] = useState(false);
  //Validate
  const validation = Yup.object().shape({
    email: Yup.string().required('Invalid email').email('Invalid email'),
    password: Yup.string()
      .required('Invalid password')
      .min(8, 'Password must be at least 8 characters')
      .max(255, 'Password must not exceed 255 characters')
      .matches(
        /(?=.*?[0-9])/,
        'Password should contain at least one digit(0-9)',
      )
      .matches(
        /(?=.*?[A-Z])/,
        'Password should contain at least one uppercase letter(A-Z).',
      )
      .matches(
        /(?=.*?[a-z])/,
        'Password should contain at least one lowercase letter(a-z)',
      )
      .matches(
        /(?=.*?[#?!@$%^&*-])/,
        'Password should contain at least one special character ( @, #, %, &, !, $, etc….).',
      ),
    referralId: Yup.string(),
    allowReceiveEmail: Yup.boolean(),
    allowShareData: Yup.boolean(),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSubmitFormSignup>({
    resolver: yupResolver(validation),
  });
  // submit form
  const onSubmitSignup = (Item: UserSubmitFormSignup) => {
    emailregis(Item.email);
    const defaultData = { ...Item, history: history };
    dispatch(actions.registerRequest(defaultData));
  };
  return (
    <>
      <div className="title">Enter Account Details</div>
      <div className="subTitle">
        Enter your account details and a strong password to secure your account.
      </div>
      <div>
        <Form onSubmit={handleSubmit(onSubmitSignup)}>
          <div className="form-input">
            <EmailSection>
              <div>Email</div>
              <div
                className={
                  errors.email?.message ? 'email-input error' : 'email-input'
                }
              >
                <input autoComplete="off" {...register('email')} />
                <div className="bn-input-suffix">
                  <div className="css-1w8oghj"></div>
                </div>
              </div>
              <ErrorMessage>{errors.email?.message}</ErrorMessage>
            </EmailSection>
            <PasswordSection>
              <div>Password</div>
              <div
                className={
                  errors.password?.message
                    ? 'password-input error'
                    : 'password-input'
                }
              >
                <input
                  autoComplete="off"
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                />
                <div className="bn-input-suffix">
                  <div
                    className="icon"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <ShowIcon
                      name={showPassword ? 'show' : 'unshow'}
                      className="show-password"
                    />
                  </div>
                </div>
              </div>
              <ErrorMessage>{errors.password?.message}</ErrorMessage>
            </PasswordSection>
            <RefID>
              <div className="ref-title" onClick={() => setShowRef(!showRef)}>
                Referral ID (Optional)
                <UpDownIcon
                  name={showRef ? 'up' : 'down'}
                  className="updown-icon"
                />
              </div>
              <div>
                <div className={showRef ? 'd-block ref-input' : 'd-none'}>
                  <input autoComplete="off" {...register('referralId')} />
                </div>
              </div>
            </RefID>
            <StyledCheckbox>
              <label htmlFor="receiveEmail" className="labelView">
                <input
                  id="receiveEmail"
                  type="checkbox"
                  {...register('allowReceiveEmail')}
                />
                <span className="checkmark"></span>I agree to receive email
                updates from Binance
              </label>
            </StyledCheckbox>
            <StyledCheckbox>
              <label htmlFor="shareData" className="labelView">
                <input
                  id="shareData"
                  type="checkbox"
                  defaultChecked={true}
                  {...register('allowShareData')}
                />
                <span className="checkmark"></span>I agree to share data for
                marketing purposes
              </label>
            </StyledCheckbox>
          </div>
          <button id="submit_email" type="submit">
            Next
          </button>
        </Form>
      </div>
    </>
  );
};
export default AccountDetail;