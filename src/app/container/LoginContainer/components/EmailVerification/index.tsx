import {
  SubTitle,
  Input,
  ConfirmCodeButton,
  Title,
  Description,
} from './style';
const EmailVerification = () => {
  return (
    <>
      <Title>Security verification</Title>
      <Description>
        To secure your account, please complete the following verification.
      </Description>
      <SubTitle>Email Verification Code</SubTitle>
      <div>
        <Input type="text" placeholder="Enter your code" />
      </div>
      <ConfirmCodeButton id="submit_verification" type="submit">
        Confirm
      </ConfirmCodeButton>
    </>
  );
};
export default EmailVerification;
