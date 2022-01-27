import { useState } from 'react';
import { StyledNavDropdown, DropdownItemTitle, StyledLink } from './style';

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
      <StyledLink to="/wallet/spot">
        <div className="item">
          <DropdownItemTitle>
            <span>Fiat & Spot</span>
            <br></br>
            <span className="title_description">(Deposit & Withdraw)</span>
          </DropdownItemTitle>
        </div>
      </StyledLink>
      <StyledLink to="/wallet/p2p">
        <div className="item">
          <DropdownItemTitle>
            <span>P2P Wallet</span>
            <br></br>
            <span className="title_description">(Deposit & Withdraw)</span>
          </DropdownItemTitle>
        </div>
      </StyledLink>
    </StyledNavDropdown>
  );
};
export default WalletLogged;
