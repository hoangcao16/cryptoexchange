import styled from 'styled-components';
import { Col } from 'react-bootstrap';
export const OrderBookBidHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 4px;
  padding-bottom: 4px;
  .contractPrice {
    color: rgb(116, 167, 0);
    font-size: 20px;
    display: flex;
    align-items: center;
  }
  .markPrice {
    font-size: 12px;
    color: rgb(132, 142, 156);
  }
  .readmore {
    color: rgb(132, 142, 156);
    font-size: 12px;
    text-decoration: none;
    &:hover {
      color: ${({ theme }) => theme.colors?.secondary};
    }
  }
`;
export const Price = styled(Col)`
  color: rgb(116, 167, 0);
  padding: 0;
  font-size: 12px;
  cursor: pointer;
`;
export const Amount = styled(Col)`
  color: rgb(183, 189, 198);
  cursor: pointer;
  font-size: 12px;
  padding: 0;
  text-align: right;
`;
export const Total = styled(Col)`
  color: rgb(183, 189, 198);
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
