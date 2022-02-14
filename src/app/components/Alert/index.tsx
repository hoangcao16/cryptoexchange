import { useState } from 'react';
import { StyledAlert, StyledAlertLink } from './style';
import { ReactComponent as AlertIcon } from 'app/assets/img/alert.svg';
import { BiChevronRight } from 'react-icons/bi';
import { useTranslation } from 'react-i18next';
const WarningAlert = () => {
  const [show, setShow] = useState(true);
  const { t } = useTranslation();
  if (show) {
    return (
      <StyledAlert variant="warning" onClose={() => setShow(false)} dismissible>
        <AlertIcon />
        {t('alert-home')}
        <StyledAlertLink href="#">
          {t('view-more')}
          <BiChevronRight />
        </StyledAlertLink>
      </StyledAlert>
    );
  } else {
    return null;
  }
};
export default WarningAlert;
