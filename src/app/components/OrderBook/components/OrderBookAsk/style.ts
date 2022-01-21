import styled from 'styled-components';
import { Col } from 'react-bootstrap';
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
