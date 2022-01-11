import styled from 'styled-components';
import { Col } from 'react-bootstrap';
export const OrderBookBidHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 4px;
  padding-bottom: 4px;
  .contractPrice {
    color: ${({ theme }) => theme.greenColor};
    font-size: 20px;
    display: flex;
    align-items: center;
  }
  .markPrice {
    font-size: 12px;
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
  .table-item {
    height: 20px;
  }
`;
