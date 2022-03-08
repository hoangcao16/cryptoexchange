import { Container, Nav, Offcanvas } from 'react-bootstrap';
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
import UserLogged from 'app/components/Navbar/components/UserLogged';
import { BsFillQuestionSquareFill } from 'react-icons/bs';
import { AiOutlineSetting } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { getToken } from 'app/components/common/common';
import ChangeLanguage from '../ChangeLanguage';
import { useTranslation } from 'react-i18next';
import POWlogo from 'app/assets/img/POWlogo.png';
// import POWlogo2 from 'app/assets/img/logo3.jpg';
const Title = () => {
  const { t } = useTranslation();
  return (
    <>
      <span>NFT</span>
      <Tag>{t('new')}</Tag>
    </>
  );
};
const NavMenu = () => {
  const { t } = useTranslation();
  return (
    <StyledNavBar collapseOnSelect expand="xl" bg="dark" variant="dark">
      <Container fluid style={{ height: '64px' }}>
        <Link to="/">
          <StyledNavBrand>
            <img src={POWlogo} className="logo" alt="POW" />
          </StyledNavBrand>
        </Link>
        {/* <Navbar.Collapse id="responsive-navbar-nav"> */}
        <StyledNav className="me-auto">
          <ProductNav />
          <BuyCrypto />
          <StyledNavLink href="#pricing">{t('markets')}</StyledNavLink>
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
                {t('log-in')}
              </Link>
              <RegisterButton to="/register">{t('register')}</RegisterButton>
            </AuthGroup>
          ) : (
            <UserLogged />
          )}
          <Nav.Link href="#pricing">{t('downloads')}</Nav.Link>
          <ChangeLanguage />
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
