import styled from 'styled-components';
import { Button } from 'components/primitives/Button';

export const OptionButton = styled(Button)`
  width: 100%;

  padding: 0.6rem 1.5rem;
  border: 1px solid ${({ theme }) => theme.colors.border1};
  margin-bottom: 0.8rem;

  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    background-color: ${({ theme }) => theme.colors.bg1} !important;
    color: ${({ theme }) => theme.colors.text} !important;
    outline: 1px solid ${({ theme }) => theme.colors.text};
  }

  &:focus {
    border: 1px solid ${({ theme }) => theme.colors.text};
  }
`;

export const OptionButtonText = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.text};
  gap: 0.5rem;
`;

export const IconWrapper = styled.div<{ size?: number }>`
  ${({ theme }) => theme.flexColumnNoWrap};
  align-items: center;
  justify-content: center;
  & > img,
  span {
    height: ${({ size }) => (size ? size + 'px' : '24px')};
    width: ${({ size }) => (size ? size + 'px' : '24px')};
  }
  ${({ theme }) => theme.mediaWidth.upToMedium`
  align-items: flex-end;
`};
`;
