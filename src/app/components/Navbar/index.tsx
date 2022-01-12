import { Container, Nav, Offcanvas, Button } from 'react-bootstrap';
import BuyCrypto from './components/BuyCrypto';
import TradeNav from './components/Trade';
import DerivativesNav from './components/Derivatives';
import EarnNav from './components/Earn';
import FinanceNav from './components/Finance';
import ProductNav from './components/Product';
import {
  StyledNavLink,
  AuthGroup,
  StyledNavBrand,
  Tag,
  StyledNav,
  RegisterButton,
  NavbarToggle,
  NavbarOffcanvas,
  StyledNavBar,
} from './style';
import { BsFillQuestionSquareFill } from 'react-icons/bs';
import { AiOutlineSetting } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from 'app/assets/img/logo.svg';
import { getToken } from 'app/components/common/common';
import { authService } from 'services/authService';

const Title = () => {
  return (
    <>
      <span>NFT</span>
      <Tag>New</Tag>
    </>
  );
};
const NavMenu = () => {
  const logout = () => {
    authService.removeAccessToken();
    window.location.href = '/';
  };
  return (
    <StyledNavBar collapseOnSelect expand="xl" bg="dark" variant="dark">
      <Container fluid style={{ height: '64px' }}>
        <Link to="/">
          <StyledNavBrand>
            <Logo className="Logo" />
          </StyledNavBrand>
        </Link>
        {/* <Navbar.Collapse id="responsive-navbar-nav"> */}
        <StyledNav className="me-auto">
          <ProductNav />
          <BuyCrypto />
          <StyledNavLink href="#pricing">Markets</StyledNavLink>
          <TradeNav />
          <DerivativesNav />
          <EarnNav />
          <FinanceNav />
          <StyledNavLink href="#pricing">
            <Title />
          </StyledNavLink>
        </StyledNav>
        {/* </Navbar.Collapse> */}
        <StyledNav>
          {!getToken() ? (
            <AuthGroup>
              <Link to="/login" className="linktoLogin-button">
                Log In
              </Link>
              <RegisterButton to="/register">Register</RegisterButton>
            </AuthGroup>
          ) : (
            <Button variant="danger" onClick={logout}>
              Logout
            </Button>
          )}

          <Nav.Link href="#pricing">Downloads</Nav.Link>
          <Nav.Link href="#pricing" className="language">
            English
          </Nav.Link>
          <i className="border"></i>
          <Nav.Link href="#pricing">USD</Nav.Link>
          <NavbarToggle aria-controls="offcanvasNavbar" />
          <NavbarOffcanvas
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
              </Nav>
            </Offcanvas.Body>
          </NavbarOffcanvas>
          <Nav.Link href="#pricing">
            <BsFillQuestionSquareFill />
          </Nav.Link>
          <Nav.Link href="#pricing">
            <AiOutlineSetting />
          </Nav.Link>
        </StyledNav>
      </Container>
    </StyledNavBar>
  );
};

export default NavMenu;
