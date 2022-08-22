import { Button as CommonButton } from 'Components/Primitives/Button';
import { Heading } from 'Components/Primitives/Typography';
import styled, { css } from 'styled-components';

export const Container = styled.div`
  padding: 1rem;
`;
export const TextContainer = styled.div`
  padding: 3rem 0 4rem;
`;
export const Title = styled(Heading)`
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
`;

export const InfoItem = styled.span`
  display: flex;
  font-size: ${({ theme }) => theme.fontSizes.body};
  color: ${({ theme }) => theme.colors.card.grey};
  justify-content: center;
`;

export const BaseFont = css`
  font-size: 12px;

  @media only screen and (min-width: 769px) {
    font-size: 14px;
  }
`;
export const ActionWrapper = styled.div`
  display: flex;
`;
export const ConfirmButton = styled(CommonButton)`
  height: 40px;
  margin: 0 8px;
  border: 0;
  flex: 1;
  margin-right: 0;
`;

export const CancelButton = styled(ConfirmButton).attrs({
  variant: 'secondary',
})`
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.muted};
  margin-left: 0;
`;
