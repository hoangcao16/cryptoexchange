import { NavDropdown } from 'react-bootstrap';
const FinanceNav = () => {
  return (
    <NavDropdown title="NFT" id="collasible-nav-dropdown">
      <NavDropdown.Item href="#action/3.1">Buy Crypto</NavDropdown.Item>
      <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
      <NavDropdown.Item href="#action/3.3">Market</NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item href="#action/3.4">Trade</NavDropdown.Item>
    </NavDropdown>
  );
};
export default FinanceNav;
