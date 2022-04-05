import styled from 'styled-components';
import { Col } from 'react-bootstrap';
export const OrderBookBidHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 16px;
  overflow-y: hidden;

  .contractPrice {
    font-size: 20px;
    display: flex;
    align-items: center;
    &[data-type='up'] {
      color: ${({ theme }) => theme.greenColor};
    }
    &[data-type='down'] {
      color: ${({ theme }) => theme.darkPinkColor};
    }
  }
  .markPrice {
    font-size: 12px;
    margin-left: 8px;
    color: ${({ theme }) => theme.grayColor};
  }
  .readmore {
    color: ${({ theme }) => theme.grayColor};
    font-size: 12px;
    text-decoration: none;
    &:hover {
      color: ${({ theme }) => theme.primary};
    }
  }
`;
export const Price = styled(Col)`
  color: ${({ theme }) => theme.greenColor};
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
  overflow-y: auto;
  height: 100%;
  .table-item {
    height: 20px;
  }
  &[data-type='mini'] {
    padding: 0 16px;
    /* overflow-y: hidden;
    overflow-x: visible; */
  }
`;

export const Wrapper = styled.div``;
