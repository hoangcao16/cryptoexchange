import { Container, Steps, Step } from './style';
const Stepper = () => {
  return (
    <Container>
      <div>
        <Steps>
          <div className="bn-steps-step" data-status="process">
            <Step className="bn-step">
              <div className="step_marker_column">
                <span className="step-counter">1</span>
              </div>
              <div className="step-title">Enter Account Details</div>
              <div className="css-vdqias"></div>
            </Step>
          </div>
          <div data-status="wait" className="line"></div>
          <div className="bn-steps-step" data-status="wait">
            <Step className="bn-step">
              <div className="step_marker_column">
                <span className="step-counter">2</span>
              </div>
              <div className="step-title">Email Verification</div>
              <div className="css-vdqias"></div>
            </Step>
          </div>
          <div data-status="wait" className="line"></div>
          <div className="bn-steps-step" data-status="wait">
            <Step className="bn-step">
              <div className="step_marker_column">
                <span className="step-counter">3</span>
              </div>
              <div className="step-title">Enter Phone Number</div>
              <div className="css-vdqias"></div>
            </Step>
          </div>
          <div data-status="wait" className="line"></div>
          <div className="bn-steps-step" data-status="wait">
            <Step className="bn-step">
              <div className="step_marker_column">
                <span className="step-counter">4</span>
              </div>
              <div className="step-title">Phone Verification</div>
              <div className="css-vdqias"></div>
            </Step>
          </div>
        </Steps>
      </div>
    </Container>
  );
};
export default Stepper;
