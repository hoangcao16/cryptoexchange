import { Button } from 'antd';
import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import styled from 'styled-components';

function CardPaymentMethod() {
  return (
    <Wrapper>
      <div className="cardPM--header">
        <div className="cardPM--payment">Momo</div>
        <Button
          type="link"
          icon={<AiOutlineClose className="cardPM--icon" />}
        ></Button>
      </div>

      <div className="cardPM--row">
        <div className="cardPM--label">Full name</div>
        <div className="cardPM--value">Ha Quoc Tuan</div>
      </div>

      <div className="cardPM--row">
        <div className="cardPM--label">Mobile phone</div>
        <div className="cardPM--value">0918273645</div>
      </div>
    </Wrapper>
  );
}

export default CardPaymentMethod;

const Wrapper = styled.div`
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid ${({ theme }) => theme.p2pBorder};
  cursor: pointer;

  &:hover {
    border: 1px solid ${({ theme }) => theme.powColor};
  }

  .cardPM {
    &--header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    &--row {
      display: flex;
      padding: 4px 0px;
    }

    &--label {
      width: 120px;
      color: ${({ theme }) => theme.p2pGray};
    }

    &--value {
      font-weight: 500;
      font-size: 16px;
    }

    &--icon {
      color: ${({ theme }) => theme.powColor};
    }
  }
`;
