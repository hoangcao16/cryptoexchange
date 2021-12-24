import { useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { NavDropdown } from 'react-bootstrap';
import { CgMenuGridR } from 'react-icons/cg';
import {
  StyledNavDropdown,
  DropdownItemGroup,
  DropdownItemTitle,
} from './style';
import { data } from './data';
const ProductNav = () => {
  const [show, setShow] = useState(false);
  const showDropdown = e => {
    setShow(!show);
  };
  const hideDropdown = e => {
    setShow(false);
  };
  return (
    <StyledNavDropdown
      title={<CgMenuGridR style={{ fontSize: '24px' }} />}
      id="collasible-nav-dropdown"
      show={show}
      onMouseEnter={showDropdown}
      onMouseLeave={hideDropdown}
    >
      <DropdownItemGroup>
        {data.map((e, index) => {
          return (
            <NavDropdown.Item href="#action/3.1" key={index}>
              <DropdownItemTitle>
                <span>{e.name}</span>
                <br></br>
                <span className="title_description">{e.description}</span>
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
export default ProductNav;
