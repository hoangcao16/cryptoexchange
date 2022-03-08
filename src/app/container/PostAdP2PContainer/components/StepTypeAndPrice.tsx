import { Button, Form, Input, Radio, Skeleton } from 'antd';
import React, { useEffect, useState } from 'react';
import {
  AiOutlineInfoCircle,
  AiOutlineMinus,
  AiOutlinePlus,
} from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { postAdP2PServices } from 'services/postAdP2PService';
import styled from 'styled-components';
import { usePostAdP2PSlice } from '../slice';
import { selectPostAdP2P } from '../slice/selectors';
import { DataPostAdP2PState, PostAdP2PState } from '../slice/types';
import { RadioStyled } from '../style';
import SwitchStep from './SwitchStep';

function StepTypeAndPrice() {
  const { actions } = usePostAdP2PSlice();
  const dispatch = useDispatch();
  const PostAdP2PState: PostAdP2PState = useSelector(selectPostAdP2P);

  const [active, setActive] = useState<0 | 1>(1); // 0 : buy, 1 : sell

  const [tokens, setTokens] = useState<any[]>([]);
  const [assetSelected, setAssetSelected] = useState();

  const [fiat, setFiat] = useState<any[]>([]);
  const [fiatSelected, setFiatSelected] = useState();

  const [priceType, setPriceType] = useState<0 | 1>(0); //0 fixed, 1 floating
  const [price, setPrice] = useState<number>(123);

  const [loadingToken, setLoadingToken] = useState(false);
  const [loadingFiat, setLoadingFiat] = useState(false);

  const handleType = (key: 0 | 1) => {
    if (key === active) {
      return;
    }
    setActive(key);
  };

  const handleSelectAsset = (e: any) => {
    setAssetSelected(e.target.value);
  };

  const handleSelectFiat = (e: any) => {
    setFiatSelected(e.target.value);
  };

  const handlePriceType = (e: any) => {
    setPriceType(e.target.value);
  };

  const handleChangePrice = (changedValues: any) => {
    const p = Number(parseInt(changedValues.price).toFixed(2));
    setPrice(p);
  };

  const handleButtonPriceFixed = (type: 'minus' | 'plus') => {
    if (type === 'minus') {
      setPrice(Number(price.toFixed(2)) - 0.01);
    }

    if (type === 'plus') {
      setPrice(Number(price.toFixed(2)) + 0.01);
    }
  };

  const handleNextStep = () => {
    const fiatName = fiat.find(fiat => fiat.id === fiatSelected).name;
    const tokenName = tokens.find(
      token => token.id === assetSelected,
    ).assetName;

    const param: DataPostAdP2PState = {
      orderType: active,
      tokenId: assetSelected,
      tokenName: tokenName,
      priceType: priceType,
      price: price,
      fiatId: fiatSelected,
      fiatName: fiatName,
    };
    dispatch(actions.setDataPostAdP2P(param));
    dispatch(actions.setCurrentStep(2));
  };

  //

  const handleGetAllAllowBuySell = () => {
    setLoadingToken(true);
    postAdP2PServices
      .getAllAllowBuySellService()
      .then(res => {
        if (res.data.rc !== 0) {
          return;
        }

        setTokens(res.data.rows);
        setAssetSelected(res.data.rows[0].id);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setLoadingToken(false);
      });
  };

  const handleGetAllFiat = () => {
    setLoadingFiat(true);
    postAdP2PServices
      .getAllFiatService()
      .then(res => {
        if (res.data.rc !== 0) {
          return;
        }

        setFiat(res.data.rows);
        setFiatSelected(res.data.rows[0].id);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setLoadingFiat(false);
      });
  };

  useEffect(() => {
    handleGetAllAllowBuySell();
    handleGetAllFiat();
  }, []);

  return (
    <Wrapper>
      <div className="containerTabsSTP">
        <Button
          type="link"
          className={
            active === 0
              ? 'containerTabsSTP--item containerTabsSTP--item-active'
              : 'containerTabsSTP--item'
          }
          onClick={() => handleType(0)}
        >
          I want to buy
        </Button>
        <Button
          type="link"
          className={
            active === 1
              ? 'containerTabsSTP--item containerTabsSTP--item-active'
              : 'containerTabsSTP--item'
          }
          onClick={() => handleType(1)}
        >
          I want to sell
        </Button>
      </div>
      <div className="contentSTP">
        {/* asset */}
        <div className="contentSTP--row">
          <div className="contentSTP--label">Asset</div>
          {loadingToken && <Skeleton />}

          <Radio.Group
            onChange={handleSelectAsset}
            value={assetSelected}
            className="contentSTP--options"
          >
            {tokens.map((token, i) => (
              <RadioStyled
                value={token.id}
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
          {loadingFiat && <Skeleton />}
          <Radio.Group
            className="contentSTP--options"
            value={fiatSelected}
            onChange={handleSelectFiat}
            name="sdfa"
          >
            {fiat.map((a, i) => (
              <RadioStyled value={a.id} key={i} className="contentSTP--item">
                {a.name}
              </RadioStyled>
            ))}
          </Radio.Group>
        </div>

        <div className="contentSTP--detailPrice">
          <div className="contentSTP--detailPrice-col">
            <div className="contentSTP--label">Your Price</div>
            <div className="contentSTP--price">$ {price.toFixed(2)}</div>
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
            <RadioStyled value={0} className="contentSTP--item">
              Fixed
            </RadioStyled>
            <RadioStyled value={1} className="contentSTP--item">
              Floating
            </RadioStyled>
          </Radio.Group>
        </div>

        <div className="contentSTP--range">
          <Form onValuesChange={handleChangePrice}>
            {priceType === 0 && (
              <>
                <div className="contentSTP--label mb-2">Fixed</div>
                <Form.Item name="price" initialValue={price.toFixed(2)}>
                  <Input
                    suffix={
                      <Button
                        className="contentSTP--range-btn"
                        type="link"
                        icon={<AiOutlinePlus />}
                        onClick={() => handleButtonPriceFixed('plus')}
                      />
                    }
                    prefix={
                      <Button
                        className="contentSTP--range-btn"
                        type="link"
                        icon={<AiOutlineMinus />}
                        onClick={() => handleButtonPriceFixed('minus')}
                      />
                    }
                    className="contentSTP--range-input"
                    type="number"
                  ></Input>
                </Form.Item>
              </>
            )}

            {priceType === 1 && (
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
                  type="number"
                  value={price}
                ></Input>
                <div>Pricing formula: 7.80 * 100.00% ≈ 7.80 HKD</div>
              </>
            )}
          </Form>
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

      color: ${({ theme }) => theme.primary};
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

        input.ant-input {
          text-align: center;
        }
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
