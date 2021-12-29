import styled from 'styled-components';
import Slider from 'react-slick';
import { Col } from 'react-bootstrap';
export const Container = styled.div`
  border: ${props => props.theme.borderGray};
  padding: 16px;
  border-top: none;
  border-bottom: none;
`;
export const SearchBox = styled.div`
  margin: 4px 0px 12px;
  min-width: 0px;
  display: inline-flex;
  -webkit-box-align: center;
  align-items: center;
  line-height: 1.5;
  height: 24px;
  flex: 1 1 0%;
  border: none;
  width: 100%;
  border-radius: 4px;
  background-color: rgb(43, 49, 57);
  position: static;
  .search-icon {
    padding-left: 8px;
  }
  input {
    background-color: transparent;
    height: 20px;
    border: none;
    outline: none;
    user-select: none;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    flex: 1;
    color: #eaecef;
  }
  svg {
    margin: 0px;
    min-width: 0px;
    color: rgb(94, 102, 115);
    font-size: 20px;
    fill: rgb(94, 102, 115);
    width: 1em;
    height: 1em;
  }
`;
export const StyledSlick = styled(Slider)`
  color: rgb(132, 142, 156);
  .star-icon {
    box-sizing: border-box;
    margin: 0px;
    min-width: 0px;
    color: currentcolor;
    font-size: 14px;
    fill: currentcolor;
    margin-bottom: 4px;
    width: 1em;
    height: 1em;
    &:focus {
      outline: none;
    }
  }
  .slick-next {
    z-index: 3;
    right: -4px;
    text-align: right;
    background: linear-gradient(
      to left,
      rgb(22, 26, 30) 42.24%,
      transparent 95.69%
    );
  }
  .slick-prev {
    z-index: 3;
    left: -4px;
    background: linear-gradient(
      to right,
      rgb(22, 26, 30) 42.24%,
      transparent 95.69%
    );
  }
  .slick-list {
    max-width: 100%;
    margin: auto;
    text-align: center;
    font-size: 12px;
    .slickItem-active {
      color: ${({ theme }) => theme.colors?.secondary};
    }
    .slick-slide {
      cursor: pointer;
      &:hover {
        color: ${({ theme }) => theme.colors?.secondary};
      }
    }
  }
  .slick-arrow {
    min-width: 40px;
    svg {
      width: 1em;
      height: 1em;
      font-size: 20px;
      color: rgb(61, 70, 83);
      fill: rgb(61, 70, 83);
      &:hover {
        color: rgb(132, 142, 156);
      }
    }
    &::before {
      display: none;
    }
  }
  .slick-disabled {
    display: none !important;
  }
`;

export const Pair = styled(Col)`
  color: rgb(183, 189, 198);
  padding: 0;
  font-size: 12px;
  cursor: pointer;
`;
export const Price = styled(Col)`
  color: rgb(183, 189, 198);
  cursor: pointer;
  font-size: 12px;
  padding: 0;
  text-align: right;
`;
export const Change = styled(Col)`
  color: rgb(183, 189, 198);
  cursor: pointer;
  font-size: 12px;
  padding: 0;
  text-align: right;
`;
export const Table = styled.div`
  height: 270px;
  overflow-y: scroll;
  padding-right: 6px;
  .table-item {
    height: 24px;
    .tableItem-star {
      margin: 0px 2px 0px 0px;
      min-width: 0px;
      color: currentcolor;
      font-size: 12px;
      fill: currentcolor;
      width: 1em;
      height: 1em;
    }
  }
`;
