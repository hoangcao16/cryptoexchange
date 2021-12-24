import styled from 'styled-components';
import { NavDropdown } from 'react-bootstrap';

export const StyledNavDropdown = styled(NavDropdown)`
  &:hover {
    .dropdown-toggle:hover {
      color: ${({ theme }) => theme.colors?.secondary};
    }
  }
  .arrow-right {
    display: none;
    float: right;
    color: ${({ theme }) => theme.colors?.secondary};
  }
  .dropdown-menu {
    background-color: ${({ theme }) => theme.background};
    min-width: 300px;
    .dropdown-item {
      padding: 16px;
      color: ${({ theme }) => theme.text};
      border-radius: 8px;
      display: flex;
      align-items: center;
      &:hover {
        background-color: ${({ theme }) => theme.backgroundDropdown};
        .arrow-right {
          display: inline-block;
        }
      }
    }
  }
`;
export const DropdownHeader = styled.div`
  margin: 0 0 0 16px;
  color: ${({ theme }) => theme.text};
`;
export const DropdownItemGroup = styled.div`
  margin: 0 16px 16px;
`;
export const DropdownItemTitle = styled.div`
  flex: 1;
  .title_description {
    color: ${({ theme }) => theme.colorDescription};
    font-size: 12px;
  }
`;
