import { Button as CommonButton } from 'components/primitives/Button';
import { Heading } from 'components/primitives/Typography';
import styled, { css } from 'styled-components';

export const Container = styled.div`
  padding: 2rem;
`;
export const Title = styled(Heading)`
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
`;

export const InfoItem = styled.span`
  display: flex;
  font-size: ${({ theme }) => theme.fontSizes.body};
  color: ${({ theme }) => theme.colors.grey};
  justify-content: center;
`;
export const Widget = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  margin: 2.5rem 0 2rem;
  border: 1px solid ${({ theme }) => theme.colors.border1};
  border-radius: ${({ theme }) => theme.radii.curved};
`;
export const InfoRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 8px 0;
`;

export const BaseFont = css`
  font-size: 12px;

  @media only screen and (min-width: 769px) {
    font-size: 14px;
  }
`;

export const InfoLabel = styled.span`
  ${BaseFont}
  color: ${({ theme }) => theme.colors.grey};
`;
export const InfoValue = styled.span<{ grey?: boolean }>`
  ${BaseFont}
  font-weight: bold;
  flex-wrap: wrap;
  display: inline-flex;
  align-items: center;
  color: ${({ theme, grey }) => (grey ? theme.colors.grey : theme.colors.text)};
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
  border: 1px solid ${({ theme }) => theme.colors.border1};
  margin-left: 0;
`;
