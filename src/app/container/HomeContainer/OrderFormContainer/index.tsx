import { useState } from 'react';
import { Container, Header, A, StyledDropdown } from './style';
import { ReactComponent as MoreIcon } from 'app/assets/img/more.svg';
import { Dropdown } from 'react-bootstrap';
import OrderForm from 'app/components/OrderForm';
const OrderFormContainer = () => {
  const [show, setShow] = useState(false);
  const showDropdown = () => {
    setShow(!show);
  };
  const hideDropdown = () => {
    setShow(false);
  };
  return (
    <Container>
      <Header>
        <div className="tradeItemSwitchWrap spotTab active ">Spot</div>
        <div className="tradeItemSwitchWrap" style={{ flex: ' 1 1 0%' }}></div>
        <div className="tradeItemSwitchWrap">
          <A target="_blank" href="/#">
            <div className="hrefText">Margin</div>
            <div className="marginRatio">10x</div>
          </A>
          <StyledDropdown
            show={show}
            onMouseEnter={showDropdown}
            onMouseLeave={hideDropdown}
          >
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              <MoreIcon className="more-icon" />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="/#">Trading Rules</Dropdown.Item>
              <Dropdown.Item href="/#">FAQ</Dropdown.Item>
              <Dropdown.Item href="/#">Spot Tutorial</Dropdown.Item>
            </Dropdown.Menu>
          </StyledDropdown>
        </div>
      </Header>
      <div>
        <OrderForm />
      </div>
    </Container>
  );
};
export default OrderFormContainer;
