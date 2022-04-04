import styled from 'styled-components';
import { Col } from 'react-bootstrap';

export const Wrapper = styled.div`
  position: relative;
  .cover {
    position: absolute;
    width: 100%;
    bottom: calc(4%);
    left: 0;
    background-color: ${({ theme }) => theme.brightGrayColorBlur};
    z-index: -1;
  }
  .info {
    position: absolute;
    top: 0;
    right: 0;
    background-color: ${({ theme }) => theme.grayColor};
    transform: translate(100%, -50%);
    padding: 10px;
    border-radius: 5px;
    margin-left: 10px;
    z-index: 999;

    p {
      margin-bottom: 0;
    }

    &::before {
      position: absolute;
      content: '';
      left: 0;
      top: 50%;
      height: 10px;
      width: 10px;
      background-color: inherit;
      transform: translate(-50%, -51%) rotate(45deg);
    }
  }
`;

export const Price = styled(Col)`
  color: ${({ theme }) => theme.darkPinkColor};
  padding: 0;
  font-size: 12px;
  cursor: pointer;
`;
export const Amount = styled(Col)`
  color: ${({ theme }) => theme.colorDescription};
  cursor: pointer;
  font-size: 12px;
  padding: 0;
  text-align: right;
`;
export const Total = styled(Col)`
  color: ${({ theme }) => theme.colorDescription};
  cursor: pointer;
  font-size: 12px;
  padding: 0;
  text-align: right;
`;
export const Table = styled.div`
  overflow-y: scroll;
  height: 96%;
  padding: 0 16px 16px 16px;
  .table-item {
    height: 20px;
  }
  &[data-type='mini'] {
    overflow: hidden;
    /* display: flex; */
    /* flex-direction: column; */
    /* flex-direction: column-reverse; */
  }
`;
