import { useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { NavDropdown } from 'react-bootstrap';
import {
  StyledNavDropdown,
  DropdownItemGroup,
  DropdownItemTitle,
} from './style';
const TradeNav = () => {
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
      <DropdownItemGroup>
        <NavDropdown.Item href="#action/3.1">
          <DropdownItemTitle>
            <span>Convert</span>
            <br></br>
            <span className="title_description">The easiest way to trade</span>
          </DropdownItemTitle>
          <FaArrowRight className="arrow-right" />
          <br />
        </NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">
          <DropdownItemTitle>
            <span>Classic</span>
            <br></br>
            <span className="title_description">
              Simple and easy-to-use interface
            </span>
          </DropdownItemTitle>
          <FaArrowRight className="arrow-right" />
        </NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">
          <DropdownItemTitle>
            <span>Advanced</span>
            <br></br>
            <span className="title_description">
              Full access to all trading tools
            </span>
          </DropdownItemTitle>
          <FaArrowRight className="arrow-right" />
        </NavDropdown.Item>
        <NavDropdown.Item href="#action/3.4">
          <DropdownItemTitle>
            <span>Margin</span>
            <br></br>
            <span className="title_description">
              Increase your profits with leverage
            </span>
          </DropdownItemTitle>
          <FaArrowRight className="arrow-right" />
        </NavDropdown.Item>
        <NavDropdown.Item href="#action/3.4">
          <DropdownItemTitle>
            <span>P2P</span>
            <br></br>
            <span className="title_description">
              Bank transfer and 100+ options
            </span>
          </DropdownItemTitle>
          <FaArrowRight className="arrow-right" />
        </NavDropdown.Item>

        <NavDropdown.Item href="#action/3.4">
          <DropdownItemTitle>
            <span>Strategy Trading</span>
            <br></br>
            <span className="title_description">
              Trading made easy, trade like a pro
            </span>
          </DropdownItemTitle>
          <FaArrowRight className="arrow-right" />
        </NavDropdown.Item>
        <NavDropdown.Item href="#action/3.4">
          <DropdownItemTitle>
            <span>Swap Farming</span>
            <br></br>
            <span className="title_description">Swap to earn BNB</span>
          </DropdownItemTitle>
          <FaArrowRight className="arrow-right" />
        </NavDropdown.Item>
        <NavDropdown.Item href="#action/3.4">
          <DropdownItemTitle>
            <span>Fan Token</span>
            <br></br>
            <span className="title_description">
              Upgrade your fan experience
            </span>
          </DropdownItemTitle>
          <FaArrowRight className="arrow-right" />
        </NavDropdown.Item>
      </DropdownItemGroup>
    </StyledNavDropdown>
  );
};
export default TradeNav;
