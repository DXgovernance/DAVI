import styled from 'styled-components';
import { Container } from 'components/primitives/Layout';
import { Dot as GenericDot } from 'components/ActionsBuilder/AddEditOptionModal/AddEditOptionModal.styled';

export const Wrapper = styled.footer`
  padding: 0.2rem 0;
  position: fixed;
  bottom: 0;
  left: 0;
  rigth: 0;
  width: 100%;
  background: ${({ theme }) => theme.colors.bg1};
  z-index: 200;
  display: flex;
  border-top: 1px solid ${({ theme }) => theme.colors.border1};
  @media only screen and (max-width: 768px) {
    position: inherit;
  }
`;

export const FooterContainer = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0;
  color: ${({ theme }) => theme.colors.text};
  @media only screen and (max-width: 468px) {
    flex-direction: column;
    margin: 0;
  }
`;

export const Link = styled.a`
  color: ${({ theme }) => theme.colors.grey};
  text-decoration: none;
  display: flex;
  align-items: center;
  @media only screen and (max-width: 468px) {
    margin-top: 2px;
    margin-bottom: 2px;
  }
`;

export const Dot = styled(GenericDot)`
  margin: 0 0.5rem;
  height: 5px;
  width: 5px;
  @media only screen and (max-width: 468px) {
    display: none;
  }
`;

export const Label = styled.span`
  color: ${({ theme }) => theme.colors.grey};
  text-decoration: none;
  font-size: 12px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
