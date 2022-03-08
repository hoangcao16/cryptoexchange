import { useState } from 'react';
import { StyledAlert, StyledAlertLink } from './style';
import IconSvg from 'app/assets/img/icon';

import { BiChevronRight } from 'react-icons/bi';
import { useTranslation } from 'react-i18next';
const WarningAlert = () => {
  const [show, setShow] = useState(true);
  const { t } = useTranslation();
  if (show) {
    return (
      <StyledAlert variant="warning" onClose={() => setShow(false)} dismissible>
        <IconSvg name="alert" />
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
