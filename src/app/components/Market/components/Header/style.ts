import styled from 'styled-components';
import { Row } from 'react-bootstrap';
export const THeader = styled(Row)`
  height: 20px;
  font-size: 12px;
  margin-top: 12px;
  color: rgb(132, 142, 156);
  .change-icon {
    box-sizing: border-box;
    margin: 0px 0px 2px;
    color: currentcolor;
    fill: currentcolor;
    min-width: 16px;
    cursor: pointer;
    width: 1em;
    height: 1em;
    font-size: 16px;
    &:hover {
      color: rgb(234, 236, 239);
    }
  }
`;
