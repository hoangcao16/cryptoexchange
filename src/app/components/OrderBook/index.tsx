import { useState } from 'react';
import OrderBookAsk from './components/OrderBookAsk';
import OrderBookBid from './components/OrderBookBid';
import OrderBookTHeader from './components/OrderBookHeader';
import {
  Container,
  Header,
  GroupButton,
  MoreButton,
  StyledDropdown,
} from './style';
import { ReactComponent as OrderBookIcon } from 'app/assets/img/Orderbook/orderbook.svg';
import { ReactComponent as BuyOrderIcon } from 'app/assets/img/Orderbook/buyorder.svg';
import { ReactComponent as SellOrderIcon } from 'app/assets/img/Orderbook/sellorder.svg';
import { ReactComponent as MoreIcon } from 'app/assets/img/more.svg';
import Select from 'react-select';
import { Dropdown } from 'react-bootstrap';
const OrderBook = () => {
  const [Layout, setLayout] = useState(1);
  const [show, setShow] = useState(false);
  const showDropdown = e => {
    setShow(!show);
  };
  const hideDropdown = e => {
    setShow(false);
  };
  const options = [
    { value: '1', label: '0.01' },
    { value: '2', label: '0.1' },
    { value: '3', label: '1' },
    { value: '4', label: '10' },
    { value: '5', label: '50' },
    { value: '6', label: '100' },
  ];
  return (
    <Container>
      <Header>
        <GroupButton>
          <button onClick={() => setLayout(1)}>
            <OrderBookIcon
              style={{
                width: '1em',
                height: '1em',
                fontSize: '24px',
                opacity: Layout === 1 ? 1 : 0.5,
              }}
            />
          </button>
          <button onClick={() => setLayout(2)}>
            <BuyOrderIcon
              style={{
                width: '1em',
                height: '1em',
                fontSize: '24px',
                opacity: Layout === 2 ? 1 : 0.5,
              }}
            />
          </button>
          <button onClick={() => setLayout(3)}>
            <SellOrderIcon
              style={{
                width: '1em',
                height: '1em',
                fontSize: '24px',
                opacity: Layout === 3 ? 1 : 0.5,
              }}
            />
          </button>
        </GroupButton>
        <div className="d-flex align-items-center">
          <Select
            className="react-select-container"
            classNamePrefix="react-select"
            options={options}
            isSearchable={false}
            defaultValue={options[0]}
          />
          <MoreButton>
            <StyledDropdown
              show={show}
              onMouseEnter={showDropdown}
              onMouseLeave={hideDropdown}
            >
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                <MoreIcon className="more-icon" />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <div className="label">
                  <label htmlFor="AVGsum" className="labelView">
                    <input id="AVGsum" type="checkbox" />
                    <span className="checkmark"></span>
                    Display AVG&sum
                  </label>
                </div>
              </Dropdown.Menu>
            </StyledDropdown>
          </MoreButton>
        </div>
      </Header>
      {Layout === 1 ? (
        <>
          <OrderBookTHeader />
          <OrderBookAsk />
          <OrderBookBid />
        </>
      ) : Layout === 2 ? (
        <>
          <OrderBookTHeader /> <OrderBookAsk />
        </>
      ) : (
        <>
          <OrderBookTHeader /> <OrderBookBid />
        </>
      )}
    </Container>
  );
};
export default OrderBook;
