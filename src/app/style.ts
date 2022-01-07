import styled from 'styled-components';
import { Toast, ToastContainer } from 'react-bootstrap';

export const StyledSuccessToast = styled(Toast)`
  background-color: ${({ theme }) => theme.backgroundDropdown};
  .toast-header {
    background-color: transparent;
    color: ${({ theme }) => theme.text};
    border-bottom: none;
    padding-left: 2rem;
    .icon-success {
      font-size: 20px;
      color: ${({ theme }) => theme.brightGreenColor};
      margin-right: 6px;
    }
  }
  .toast-body {
    color: ${({ theme }) => theme.grayColor};
    padding-left: 2rem;
  }
`;
export const StyledToastContainer = styled(ToastContainer)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 9999;
`;
