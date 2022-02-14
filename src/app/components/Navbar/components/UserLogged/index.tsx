import { useState } from 'react';
import { NavDropdown, Button } from 'react-bootstrap';
import { StyledNavDropdown, DropdownItemGroup } from './style';
import { authService } from 'services/authService';
import WalletLogged from './wallet';
import { useTranslation } from 'react-i18next';

const UserLogged = () => {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  const showDropdown = e => {
    setShow(!show);
  };
  const hideDropdown = e => {
    setShow(false);
  };
  const logout = () => {
    authService.removeAccessToken();
    authService.removeUserId();
    window.location.href = '/';
  };
  const username = JSON.parse(
    JSON.stringify(localStorage.getItem('userId') || ''),
  );
  return (
    <>
      <WalletLogged />
      <StyledNavDropdown
        title={`${t('user')} ${username}`}
        id="collasible-nav-dropdown"
        show={show}
        onMouseEnter={showDropdown}
        onMouseLeave={hideDropdown}
      >
        <DropdownItemGroup>
          <NavDropdown.Item href="#action/3.1">
            <Button variant="danger" onClick={logout}>
              {t('logout')}
            </Button>
          </NavDropdown.Item>
        </DropdownItemGroup>
      </StyledNavDropdown>
    </>
  );
};
export default UserLogged;
