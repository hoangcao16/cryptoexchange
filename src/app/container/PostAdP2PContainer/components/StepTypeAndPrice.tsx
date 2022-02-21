import { Button, Input, Radio } from 'antd';
import React, { useState } from 'react';
import {
  AiOutlineFileUnknown,
  AiOutlineInfoCircle,
  AiOutlineMinus,
  AiOutlinePlus,
} from 'react-icons/ai';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { assets, cashs } from '../data';
import HelpGuide from './HelpGuide';

function StepTypeAndPrice() {
  const [active, setActive] = useState<'buy' | 'sell'>('buy');

  const [priceType, setPriceType] = useState<'fixed' | 'floating'>('fixed');

  const handleType = (key: 'buy' | 'sell') => {
    if (key === active) {
      return;
    }
    setActive(key);
  };

  const handlePriceType = (e: any) => {
    setPriceType(e.target.value);
  };

  return (
    <Wrapper>
      <div className="containerTabsSTP">
        <Button
          type="link"
          className={
            active === 'buy'
              ? 'containerTabsSTP--item containerTabsSTP--item-active'
              : 'containerTabsSTP--item'
          }
          onClick={() => handleType('buy')}
        >
          I want to buy
        </Button>
        <Button
          type="link"
          className={
            active === 'sell'
              ? 'containerTabsSTP--item containerTabsSTP--item-active'
              : 'containerTabsSTP--item'
          }
          onClick={() => handleType('sell')}
        >
          I want to sell
        </Button>
      </div>
      <div className="contentSTP">
        {/* asset */}
        <div className="contentSTP--row">
          <div className="contentSTP--label">Asset</div>
          <Radio.Group className="contentSTP--options">
            {assets.map((a, i) => (
              <Radio value={a.name} key={i} className="contentSTP--item">
                {a.name}
              </Radio>
            ))}
          </Radio.Group>
        </div>

        {/* Cash */}
        <div className="contentSTP--row">
          <div className="contentSTP--label">
            with Cash <AiOutlineInfoCircle className="contentSTP--label-icon" />
          </div>
          <Radio.Group className="contentSTP--options">
            {cashs.map((a, i) => (
              <Radio value={a.name} key={i} className="contentSTP--item">
                {a.name}
              </Radio>
            ))}
          </Radio.Group>
        </div>

        <div className="contentSTP--detailPrice">
          <div className="contentSTP--detailPrice-col">
            <div className="contentSTP--label">Your Price</div>
            <div className="contentSTP--price">$ 3,057.43</div>
          </div>

          <div className="contentSTP--detailPrice-col">
            <div className="contentSTP--label">
              Lowest Order Price{' '}
              <AiOutlineInfoCircle className="contentSTP--label-icon" />
            </div>
            <div className="contentSTP--price">$ 403.36</div>
          </div>
        </div>

        {/*  price type */}
        <div className="contentSTP--priceType">
          <div className="contentSTP--label">Price Type</div>
          <Radio.Group
            className="contentSTP--options"
            value={priceType}
            onChange={handlePriceType}
          >
            <Radio value="fixed" className="contentSTP--item">
              Fixed
            </Radio>
            <Radio value="floating" className="contentSTP--item">
              Floating
            </Radio>
          </Radio.Group>
        </div>

        <div className="contentSTP--range">
          {priceType === 'fixed' && (
            <>
              <div className="contentSTP--label mb-2">Fixed</div>
              <Input
                suffix={
                  <Button
                    className="contentSTP--range-btn"
                    type="link"
                    icon={<AiOutlinePlus />}
                  />
                }
                prefix={
                  <Button
                    className="contentSTP--range-btn"
                    type="link"
                    icon={<AiOutlineMinus />}
                  />
                }
                className="contentSTP--range-input"
              ></Input>
            </>
          )}

          {priceType === 'floating' && (
            <>
              <div className="contentSTP--label mb-2">
                Floating Price Margin
              </div>
              <Input
                suffix={
                  <Button
                    className="contentSTP--range-btn"
                    type="link"
                    icon={<AiOutlinePlus />}
                  />
                }
                prefix={
                  <Button
                    className="contentSTP--range-btn"
                    type="link"
                    icon={<AiOutlineMinus />}
                  />
                }
                className="contentSTP--range-input"
              ></Input>
              <div>Pricing formula: 7.80 * 100.00% ≈ 7.80 HKD</div>
            </>
          )}
        </div>
      </div>
      {/* <HelpGuide /> */}
    </Wrapper>
  );
}

export default StepTypeAndPrice;

const Wrapper = styled.div`
  .containerTabsSTP {
    height: 48px;
    width: 100%;

    display: flex;
    align-items: center;

    &--item {
      width: 50%;
      height: 48px;
      font-size: 16px;
      text-align: center;

      color: ${({ theme }) => theme.powColor};
      background-color: ${({ theme }) => theme.p2pGrayLight};

      &-active {
        background-color: ${({ theme }) => theme.p2pBackground};
        font-weight: bold;
      }
    }
  }

  .contentSTP {
    min-height: 300px;
    background-color: ${({ theme }) => theme.p2pBackground};

    padding: 30px;

    &--row {
      margin-bottom: 30px;
    }

    &--label {
      height: 20px;
      font-size: 14px;
      color: ${({ theme }) => theme.p2pGray};

      &-icon {
        font-size: 18px;
      }
    }

    &--options {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
    }

    &--item {
      min-width: 100px;
      width: calc(100% / 7);
      margin: 10px 0px;
    }

    &--detailPrice {
      display: flex;
      border-top: 1px dashed ${({ theme }) => theme.p2pBorder};
      padding: 30px 0px;
      &-col {
        min-width: 180px;
      }
    }

    &--price {
      font-size: 24px;
    }

    &--priceType {
    }

    &--range {
      &-input {
        max-width: 250px;
        height: 32px;
      }

      &-btn {
        color: ${({ theme }) => theme.p2pText};
        border: 1px solid ${({ theme }) => theme.p2pBorder};
        height: 26px;
        width: 26px;
        padding: 0px;
      }
    }
  }
`;
