import { Container, Tabs, StyledDropdown } from './style';
import { ReactComponent as InformationIcon } from 'app/assets/img/information.svg';
import { SplitButton, Dropdown } from 'react-bootstrap';
import { useState } from 'react';
const OrderForm = () => {
  const [title, setTitle] = useState('Stop-limit');
  return (
    <Container>
      <div className="d-flex">
        <Tabs>
          <div className="item active">Limit</div>
          <div className="item">Market</div>
          <StyledDropdown className="item">
            <SplitButton
              key="down"
              id="dropdown-button-drop-down"
              drop="down"
              title={title}
            >
              <Dropdown.Item
                className="dropdown-item"
                onClick={() => setTitle('Stop-limit')}
              >
                Stop-limit
              </Dropdown.Item>
              <Dropdown.Item
                className="dropdown-item"
                onClick={() => setTitle('OCO')}
              >
                OCO
              </Dropdown.Item>
            </SplitButton>
          </StyledDropdown>
          <div className="d-flex align-items-center information">
            <InformationIcon className="information-icon" />
          </div>
        </Tabs>
        <div></div>
      </div>
      <span>This is the order form</span>
    </Container>
  );
};
export default OrderForm;
