import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import {
  Title,
  Description,
  SubTitle,
  ResendButton,
  HelpButton,
  Input,
  ConfirmCodeButton,
  ErrorMessage,
} from './style';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import { useVerifyEmailRegisterSlice } from './slice';
//declare type
type UserSubmitForm = {
  code: string;
};
const EmailVerification = ({ email }) => {
  const dispatch = useDispatch();
  let history = useHistory();
  const { actions } = useVerifyEmailRegisterSlice();
  //Validate
  const validation = Yup.object().shape({
    code: Yup.string()
      .required('Invalid code')
      .min(6, 'Must be exactly 6 digits')
      .max(6, 'Must be exactly 6 digits'),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSubmitForm>({
    resolver: yupResolver(validation),
  });
  // submit form
  const onSubmitVerify = (data: any) => {
    dispatch(actions.registerVerifyEmailRequest({ ...data, email, history }));
  };
  return (
    <>
      <Title>Email Verification</Title>
      <Description>
        <div className="subtitle--content">
          Please enter the 6-digit verification code that was sent to &nbsp;
          {email}. The code is valid for 30 minutes.
        </div>
      </Description>
      <SubTitle>Email Verification Code</SubTitle>
      <form onSubmit={handleSubmit(onSubmitVerify)}>
        <div>
          <Input
            type="text"
            data-status={errors.code?.message ? 'error' : 'normal'}
            placeholder="Enter your code"
            {...register('code')}
          />
        </div>
        <ErrorMessage>{errors.code?.message}</ErrorMessage>
        <ResendButton type="button">
          <div className="css-1c82c04">Resend email&nbsp;</div>
        </ResendButton>
        <HelpButton>
          <div className="text">Didn't receive the code?</div>
        </HelpButton>
        <ConfirmCodeButton id="submit_verification" type="submit">
          Finish
        </ConfirmCodeButton>
      </form>
    </>
  );
};
export default EmailVerification;
