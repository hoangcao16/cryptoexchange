import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  Offcanvas,
} from 'react-bootstrap';
import BuyCrypto from './components/BuyCrypto';
import TradeNav from './components/Trade';
import DerivativesNav from './components/Derivatives';
import EarnNav from './components/Earn';
import FinanceNav from './components/Finance';
const NavMenu = () => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container fluid>
        <Navbar.Brand href="#home">BINANCE</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <BuyCrypto />
            <Nav.Link href="#pricing">Markets</Nav.Link>
            <TradeNav />
            <DerivativesNav />
            <EarnNav />
            <FinanceNav />
            <Nav.Link href="#pricing">NFT</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Nav>
          <Nav.Link href="#deets">Login</Nav.Link>
          <Nav.Link eventKey={2} href="#memes">
            Register
          </Nav.Link>
          <Nav.Link href="#pricing">Download</Nav.Link>
          <Nav.Link href="#pricing">English</Nav.Link>
          <Nav.Link href="#pricing">USD</Nav.Link>

          <Navbar.Toggle aria-controls="offcanvasNavbar" />
          <Navbar.Offcanvas
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel">
                Offcanvas
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link href="#action1">Home</Nav.Link>
                <Nav.Link href="#action2">Link</Nav.Link>
                <NavDropdown title="Dropdown" id="offcanvasNavbarDropdown">
                  <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action4">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action5">
                    Something else here
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavMenu;
