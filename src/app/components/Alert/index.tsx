import { useState } from 'react';
import { StyledAlert, StyledAlertLink } from './style';
import { ReactComponent as AlertIcon } from 'app/assets/img/alert.svg';
import { BiChevronRight } from 'react-icons/bi';
const WarningAlert = () => {
  const [show, setShow] = useState(true);
  if (show) {
    return (
      <StyledAlert variant="warning" onClose={() => setShow(false)} dismissible>
        <AlertIcon />
        Introducing Highstreet (HIGH) on Binance Launchpool! Farm HIGH by
        Staking BNB and BUSD Tokens
        <StyledAlertLink href="#">
          View More
          <BiChevronRight />
        </StyledAlertLink>
      </StyledAlert>
    );
  } else {
    return null;
  }
};
export default WarningAlert;
