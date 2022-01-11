import styled from 'styled-components';
import { Col } from 'react-bootstrap';

export const Container = styled.div`
  border: ${props => props.theme.borderGray};
  border-left: none;
  border-right: none;
  padding: 16px 8px 16px 16px;
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  max-height: 384px;
`;
export const Tabs = styled.div`
  padding: 0 0 8px 0;
  button {
    background-color: transparent;
    border: none;
    outline: none;
    color: ${props => props.theme.text};
    padding: 0;
    font-size: 14px;
    font-weight: 400;
    &:hover {
      color: ${({ theme }) => theme.primary};
    }
  }
  .btn-myTrades {
    padding-left: 48px;
  }
  .btn-active {
    font-weight: 600;
    color: ${({ theme }) => theme.primary};
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
export const Time = styled(Col)`
  color: ${({ theme }) => theme.colorDescription};
  cursor: pointer;
  font-size: 12px;
  padding: 0;
  text-align: right;
`;
export const Table = styled.div`
  height: 100%; /* relevant part */
  overflow-y: auto;
  padding-right: 6px;
  .table-item {
    height: 20px;
  }
`;
export const MyTradesComponent = styled.div`
  height: 320px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
