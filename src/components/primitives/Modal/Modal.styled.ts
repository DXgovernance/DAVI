import styled, { css } from 'styled-components';
import { Button } from 'components/primitives/Button';
import { FiX } from 'react-icons/fi';
import { IoIosArrowBack } from 'react-icons/io';
import { Heading } from 'components/primitives/Typography';
import { Flex } from 'components/primitives/Layout';

export const Wrapper = styled.div<{ zIndex: number; maxWidth: number }>`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: ${props => props.zIndex};
  width: 40%;
  min-width: 400px;
  max-width: ${({ maxWidth }) => maxWidth}px;
  outline: 0;
`;

export const Backdrop = styled.div<{ zIndex: number }>`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(27, 29, 31, 0.5);
  z-index: ${props => props.zIndex};
`;

export const StyledModal = styled.div`
  z-index: 100;
  background: ${({ theme }) => theme.colors.modalBackground};
  position: relative;
  margin: auto;
  border: 1px solid ${({ theme }) => theme.colors.muted};
  border-radius: ${({ theme }) => theme.radii.curved};
  box-sizing: border-box;
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.25);
  /* ===== Scrollbar CSS ===== */
  /* Firefox */
  * {
    scrollbar-width: 12px;
    scrollbar-color: ${({ theme }) => theme.colors.muted} transparent;
  }
  /* Chrome, Edge, and Safari */
  *::-webkit-scrollbar {
    width: 12px;
  }
  *::-webkit-scrollbar-track {
    background: transparent;
  }
  *::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.muted};
    border-radius: 10px;
    border: 3px solid ${({ theme }) => theme.colors.modalBackground};
  }
`;

export const Header = styled.div`
  display: flex;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.muted};
  position: relative;
  align-items: center;
  color: ${({ theme }) => theme.colors.text};
`;

export const SecondaryHeader = styled(Header)`
  justify-content: center;
  border-bottom: none;
  @media only screen and (max-width: 768px) {
    position: relative;
    top: 25%;
  }
`;

export const HeaderText = styled(Heading)`
  margin: auto 8px;
`;

export const CloseIcon = styled(FiX)`
  position: absolute;
  color: ${({ theme }) => theme.colors.text};
  right: 1.5rem;
  top: 50%;
  transform: translateY(-50%);
  height: 1.5rem;
  width: 1.5rem;
  z-index: 800;
  &:hover {
    cursor: pointer;
    opacity: 0.6;
  }
`;

export const SecondaryCloseIcon = styled(CloseIcon)`
  top: 25px;
`;

export const Content = styled.div<{ modal?: boolean }>`
  color: ${({ theme }) => theme.colors.text};
  max-height: 80vh;
  overflow-x: hidden;
  overflow-y: auto;
  ${props =>
    props.modal === true &&
    css`
      @media only screen and (max-width: 768px) {
        position: relative;
        top: 25%;
      }
    `}
`;

export const Footer = styled.div<{ modal?: boolean }>`
  display: flex;
  justify-content: space-around;
  padding: 0 1.5rem 1.5rem 1.5rem;
  ${props =>
    props.modal === true &&
    css`
      @media only screen and (max-width: 768px) {
        position: relative;
        top: 60%;
      }
    `}
`;

export const ModalButton = styled(Button)`
  margin: 8px;
  flex: 1;
`;

export const LeftArrowContainer = styled(Flex)`
  flex-direction: row;
`;

export const BackButton = styled(IoIosArrowBack)`
  cursor: pointer;
`;
