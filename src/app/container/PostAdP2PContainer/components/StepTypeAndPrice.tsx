import { Button, Input, Radio } from 'antd';
import React, { useEffect, useState } from 'react';
import {
  AiOutlineInfoCircle,
  AiOutlineMinus,
  AiOutlinePlus,
} from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { postAdP2PServices } from 'services/postAdP2PService';
import styled from 'styled-components';
import { cashs } from '../data';
import { usePostAdP2PSlice } from '../slice';
import { selectPostAdP2P } from '../slice/selectors';
import { PostAdP2PState } from '../slice/types';
import { RadioStyled } from '../style';
import SwitchStep from './SwitchStep';

function StepTypeAndPrice() {
  const { actions } = usePostAdP2PSlice();
  const dispatch = useDispatch();
  const PostAdP2PState: PostAdP2PState = useSelector(selectPostAdP2P);

  const [active, setActive] = useState<'buy' | 'sell'>('buy');
  const [priceType, setPriceType] = useState<'fixed' | 'floating'>('fixed');
  const [tokens, setTokens] = useState<any[]>([]);
  const [assetSelected, setAssetSelected] = useState();

  const handleType = (key: 'buy' | 'sell') => {
    if (key === active) {
      return;
    }
    setActive(key);
  };

  const handleSelectAsset = (e: any) => {
    setAssetSelected(e.target.value);
  };

  const handlePriceType = (e: any) => {
    setPriceType(e.target.value);
  };

  const handleNextStep = () => {
    dispatch(actions.setCurrentStep(2));
  };

  useEffect(() => {
    postAdP2PServices
      .getAllAllowBuySellService()
      .then(res => {
        if (res.data.rc !== 0) {
          return;
        }

        setTokens(res.data.rows);
        setAssetSelected(res.data.rows[0].assetCode);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

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
          <Radio.Group
            onChange={handleSelectAsset}
            value={assetSelected}
            className="contentSTP--options"
          >
            {tokens.map((token, i) => (
              <RadioStyled
                value={token.assetCode}
                key={i}
                className="contentSTP--item"
              >
                {token.assetName}
              </RadioStyled>
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
              <RadioStyled value={a.name} key={i} className="contentSTP--item">
                {a.name}
              </RadioStyled>
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
            <RadioStyled value="fixed" className="contentSTP--item">
              Fixed
            </RadioStyled>
            <RadioStyled value="floating" className="contentSTP--item">
              Floating
            </RadioStyled>
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

      <SwitchStep next={handleNextStep} post={() => {}} />
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
