import {
  Title,
  Description,
  SubTitle,
  ResendButton,
  HelpButton,
  Input,
  ConfirmCodeButton,
} from './style';

const EmailVerification = ({ email }) => {
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
      <div>
        <Input type="text" placeholder="Enter your code" />
      </div>
      <ResendButton type="button">
        <div className="css-1c82c04">Resend email&nbsp;</div>
      </ResendButton>
      <HelpButton>
        <div className="text">Didn't receive the code?</div>
      </HelpButton>
      <ConfirmCodeButton id="submit_verification" type="submit">
        Finish
      </ConfirmCodeButton>
    </>
  );
};
export default EmailVerification;
