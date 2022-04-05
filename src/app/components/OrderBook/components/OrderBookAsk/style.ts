import styled from 'styled-components';
import { Col } from 'react-bootstrap';

export const Wrapper = styled.div``;

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
  max-height: 96%;
  padding: 0;
  overflow: visible scroll;

  .table-item {
    height: 20px;
    padding: 0 16px;
    position: relative;

    .info {
      position: absolute;
      top: 0;
      right: 0;
      transform: translate(calc(100% + 5px), calc(-50% - 1px));
      background-color: ${({ theme }) => theme.grayColor};
      padding: 5px 20px;
      border-radius: 5px;
      width: auto;
      min-width: 200px;
      p {
        margin: 5px 0;
        display: flex;
        justify-content: space-between;

        .label {
          margin-right: 15px;
        }
      }

      &::before {
        content: '';
        position: absolute;
        height: 7px;
        width: 7px;

        background-color: inherit;
        top: 50%;
        left: 0;
        transform: translate(-50%, -50%) rotate(45deg);
      }
    }
    &:hover {
      border-top: 1px dashed ${({ theme }) => theme.grayColor};
    }
  }

  &[data-type='mini'] {
    padding-bottom: 16px;
    overflow: visible;
    /* display: flex; */
    /* flex-direction: column; */
    /* flex-direction: column-reverse; */
  }
`;
