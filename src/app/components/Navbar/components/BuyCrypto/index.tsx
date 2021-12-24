import { useState } from 'react';
import { NavDropdown } from 'react-bootstrap';
import { FaArrowRight } from 'react-icons/fa';
import {
  StyledNavDropdown,
  DropdownHeader,
  DropdownItemGroup,
  DropdownItemTitle,
} from './style';
const BuyCryptoNav = () => {
  const [show, setShow] = useState(false);
  const showDropdown = e => {
    setShow(!show);
  };
  const hideDropdown = e => {
    setShow(false);
  };
  return (
    <StyledNavDropdown
      title="Buy Crypto"
      id="collasible-nav-dropdown"
      show={show}
      onMouseEnter={showDropdown}
      onMouseLeave={hideDropdown}
    >
      <DropdownHeader>Pay with</DropdownHeader>
      <DropdownItemGroup>
        <NavDropdown.Item href="#action/3.1">
          <DropdownItemTitle>
            <span>Card Deposit</span>
            <br></br>
            <span className="title_description">Deposit EUR via card</span>
          </DropdownItemTitle>
          <FaArrowRight className="arrow-right" />
          <br />
        </NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">
          <DropdownItemTitle>
            <span>Credit/Debit Card</span>
            <br></br>
            <span className="title_description">Buy Crypto via card</span>
          </DropdownItemTitle>
          <FaArrowRight className="arrow-right" />
        </NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">
          <DropdownItemTitle>
            <span>P2P Trading</span>
            <br></br>
            <span className="title_description">
              Bank transfer and 100+ options
            </span>
          </DropdownItemTitle>
          <FaArrowRight className="arrow-right" />
        </NavDropdown.Item>
        <NavDropdown.Item href="#action/3.4">
          <DropdownItemTitle>
            <span>Card Balance</span>
            <br></br>
            <span className="title_description">
              Buy Crypto with your EUR balance
            </span>
          </DropdownItemTitle>
          <FaArrowRight className="arrow-right" />
        </NavDropdown.Item>
        <NavDropdown.Item href="#action/3.4">
          <DropdownItemTitle>
            <span>Third-Party Payment</span>
            <br></br>
            <span className="title_description">Simplex, Banxa(SEPA)</span>
          </DropdownItemTitle>
          <FaArrowRight className="arrow-right" />
        </NavDropdown.Item>
      </DropdownItemGroup>
    </StyledNavDropdown>
  );
};
export default BuyCryptoNav;
