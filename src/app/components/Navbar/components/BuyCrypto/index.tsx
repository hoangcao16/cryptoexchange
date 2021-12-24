import { useState } from 'react';
import { NavDropdown } from 'react-bootstrap';
import { FaArrowRight } from 'react-icons/fa';
import {
  StyledNavDropdown,
  DropdownHeader,
  DropdownItemGroup,
  DropdownItemTitle,
} from './style';
import { data } from './data';

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
        {data.map((item, index) => {
          return (
            <NavDropdown.Item href="#action/3.1" key={index}>
              <DropdownItemTitle>
                <span>{item.name}</span>
                <br></br>
                <span className="title_description">{item.description}</span>
              </DropdownItemTitle>
              <FaArrowRight className="arrow-right" />
              <br />
            </NavDropdown.Item>
          );
        })}
      </DropdownItemGroup>
    </StyledNavDropdown>
  );
};
export default BuyCryptoNav;
