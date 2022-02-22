import { Checkbox, Form, Input, Radio } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { usePostAdP2PSlice } from '../slice';
import { RadioStyled } from '../style';
import SwitchStep from './SwitchStep';

const { TextArea } = Input;

function StepRemarksAndResponse() {
  const [form] = Form.useForm();
  const { actions } = usePostAdP2PSlice();
  const dispatch = useDispatch();

  const handlePost = () => {
    console.log('post');
  };

  return (
    <Wrapper>
      <Form form={form}>
        <div className="stepRAR--label">Remarks (Optional)</div>
        <Form.Item name="remarks">
          <TextArea
            rows={4}
            maxLength={1000}
            showCount
            placeholder="Please do not include any crypto-related words, such as crypto, P2P, C2C, BTC, USDT, ETH etc."
          />
        </Form.Item>

        <div className="stepRAR--label">Auto Reply (Optional)</div>
        <Form.Item name="reply">
          <TextArea
            rows={4}
            maxLength={1000}
            showCount
            placeholder="Auto reply message will be sent to the counter party once the order is created"
          />
        </Form.Item>

        <div className="stepRAR--dash"></div>

        <div className="stepRAR--label">Counterparty Conditions</div>

        <div>
          <Checkbox value="A" checked disabled>
            Completed KYC
          </Checkbox>
        </div>

        <div>
          <Checkbox value="B">
            <div className="stepRAR--titleChecked">
              Registered
              <Input type={'number'} className="stepRAR--inputChecked"></Input>
              day(s) ago
            </div>
          </Checkbox>
        </div>

        <div>
          <Checkbox value="C">
            <div className="stepRAR--titleChecked">
              Holdings more than
              <Input type={'number'} className="stepRAR--inputChecked"></Input>
              BTC
            </div>
          </Checkbox>
        </div>

        <div className="stepRAR--label mt-4">Status</div>
        <Form.Item name="radio-group">
          <Radio.Group>
            <RadioStyled value="a">Online right now</RadioStyled>
            <RadioStyled value="b">Offline, manually later</RadioStyled>
          </Radio.Group>
        </Form.Item>
      </Form>

      <SwitchStep next={() => {}} post={handlePost} />
    </Wrapper>
  );
}

export default StepRemarksAndResponse;

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.p2pBackground};
  min-height: 400px;
  padding: 30px;

  .stepRAR {
    &--label {
      color: ${({ theme }) => theme.p2pGray};
      padding-bottom: 4px;
    }

    &--dash {
      border-top: 1px dashed ${({ theme }) => theme.p2pBorder};
      margin-top: 35px;
      margin-bottom: 30px;
    }

    &--inputChecked {
      width: 70px;
      margin: 0px 4px;
    }

    &--titleChecked {
      display: flex;
      align-items: center;
    }
  }
`;
