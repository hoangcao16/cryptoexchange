import { useState } from 'react';
import { StyledNavDropdown, DropdownItemTitle } from './style';
import { Link } from 'react-router-dom';

const WalletLogged = () => {
  const [show, setShow] = useState(false);
  const showDropdown = e => {
    setShow(!show);
  };
  const hideDropdown = e => {
    setShow(false);
  };
  return (
    <StyledNavDropdown
      title="Wallet"
      id="collasible-nav-dropdown"
      show={show}
      onMouseEnter={showDropdown}
      onMouseLeave={hideDropdown}
    >
      <Link to="/wallet/fiat">
        <div className="item">
          <DropdownItemTitle>
            <span>Fiat & Spot</span>
            <br></br>
            <span className="title_description">(Deposit & Withdraw)</span>
          </DropdownItemTitle>
        </div>
      </Link>
    </StyledNavDropdown>
  );
};
export default WalletLogged;
