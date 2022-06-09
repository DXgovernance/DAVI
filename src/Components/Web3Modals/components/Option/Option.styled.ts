import styled from 'styled-components';
import { Button } from 'old-components/Guilds/common/Button';

interface OptionButtonProps {
  active: boolean;
}

export const OptionButton = styled(Button)<OptionButtonProps>`
  width: 100%;

  padding: 0.6rem 1.5rem;
  border: 1px solid ${({ theme }) => theme.colors.muted};
  margin-bottom: 0.8rem;

  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    background-color: ${({ theme }) => theme.colors.background} !important;
    color: ${({ theme }) => theme.colors.text} !important;
    outline: 2px solid #ccc;
  }

  &:focus {
    border: 2px solid ${({ theme }) => theme.colors.text};
  }

  ${props => props.active && `border: 2px solid #fff;`};
`;

export const OptionButtonText = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.text};
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
