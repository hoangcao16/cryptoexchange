import { Container, Row, Col } from 'react-bootstrap';
import {
  Main,
  LeftMenu,
  Form,
  EmailSection,
  PasswordSection,
  StyledCheckbox,
  RefID,
} from './style';
import ShowIcon from 'app/assets/img/showpassIcon';
import UpDownIcon from 'app/assets/img/UpDownIcon';
import { useState } from 'react';
import Stepper from './components/Stepper';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

type UserSubmitFormSignup = {
  email: string;
  password: string;
};

const RegisterContainer = () => {
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
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSubmitFormSignup>({
    resolver: yupResolver(validation),
  });
  // submit form
  const onSubmitSignup = (data: UserSubmitFormSignup) => {
    console.log(JSON.stringify(data, null, 2));
  };
  return (
    <Main>
      <Container>
        <Row className="justify-content-md-center">
          <LeftMenu xs lg="4">
            <div className="title">Enter Account Details</div>
            <div className="subTitle">
              Enter your account details and a strong password to secure your
              account.
            </div>
            <div>
              <Form onSubmit={handleSubmit(onSubmitSignup)}>
                <div className="form-input">
                  <EmailSection>
                    <div>Email</div>
                    <div className="email-input">
                      <input autoComplete="off" {...register('email')} />
                      <div className="bn-input-suffix">
                        <div className="css-1w8oghj"></div>
                      </div>
                    </div>
                    <div>{errors.email?.message}</div>
                  </EmailSection>
                  <PasswordSection>
                    <div>Password</div>
                    <div className="password-input">
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
                    <div>{errors.password?.message}</div>
                  </PasswordSection>
                  <RefID>
                    <div
                      className="ref-title"
                      onClick={() => setShowRef(!showRef)}
                    >
                      Referral ID (Optional)
                      <UpDownIcon
                        name={showRef ? 'up' : 'down'}
                        className="updown-icon"
                      />
                    </div>
                    <div>
                      <div className={showRef ? 'd-block ref-input' : 'd-none'}>
                        <input name="refID" autoComplete="off" />
                      </div>
                    </div>
                  </RefID>
                  <StyledCheckbox>
                    <label htmlFor="receiveEmail" className="labelView">
                      <input
                        id="receiveEmail"
                        type="checkbox"
                        value="receiveEmail"
                      />
                      <span className="checkmark"></span>I agree to receive
                      email updates from Binance
                    </label>
                  </StyledCheckbox>
                  <StyledCheckbox>
                    <label htmlFor="shareData" className="labelView">
                      <input
                        id="shareData"
                        type="checkbox"
                        value="shareData"
                        defaultChecked={true}
                      />
                      <span className="checkmark"></span>I agree to share data
                      for marketing purposes
                    </label>
                  </StyledCheckbox>
                </div>
                <button id="submit_email" type="submit">
                  Next
                </button>
              </Form>
            </div>
          </LeftMenu>
          <Col xs lg="4">
            <Stepper />
          </Col>
        </Row>
      </Container>
    </Main>
  );
};
export default RegisterContainer;
