import { useState } from 'react';
import { NavDropdown } from 'react-bootstrap';
import { FaArrowRight } from 'react-icons/fa';
import {
  StyledNavDropdown,
  DropdownHeader,
  DropdownItemGroup,
  DropdownItemTitle,
  Tag,
} from './style';
import { data } from './data';
const Title = () => {
  return (
    <>
      <span>Buy Crypto</span>
      <Tag>EUR</Tag>
    </>
  );
};
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
      title={<Title />}
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
              <item.icon
                style={{
                  fontSize: '24px',
                  color: '#f0b90b',
                  marginRight: '16px',
                }}
              />
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
