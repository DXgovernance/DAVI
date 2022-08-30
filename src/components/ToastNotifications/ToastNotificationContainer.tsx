import styled from 'styled-components';
import { ToastContainer } from 'react-toastify';

export const ToastNotificationContainer = styled(ToastContainer)`
  &.Toastify__toast-container--top-right {
    top: 6em;
  }
  .Toastify__toast {
    color: ${({ theme }) => theme.colors.text};
    background: ${({ theme }) => theme.colors.bg3};
    box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.25);
    padding: 0.6rem;
  }
  .Toastify__progress-bar {
    background: ${({ theme }) => theme.colors.text};
  }
  .Toastify__close-button svg {
    height: 20px;
    width: 20px;
    fill: ${({ theme }) => theme.colors.text};
  }
`;
