import styled, { css } from 'styled-components';
import { Heading } from 'Components/Primitives/Typography';
import TokenAmountInput from 'Components/Primitives/Forms/TokenAmountInput';
import { Button } from 'Components/Primitives/Button';

export const GuestContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  color: black;
  @media only screen and (min-width: 769px) {
    padding: 20px 40px;
  }
`;

export const DaoBrand = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const DaoIcon = styled.img`
  height: 3rem;
  width: 3rem;
`;

export const DaoTitle = styled(Heading)`
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.text};
`;

export const InfoItem = styled.div`
  display: flex;
  font-size: ${({ theme }) => theme.fontSizes.body};
  color: ${({ theme }) => theme.colors.card.grey};
  margin-bottom: 0.4rem;
`;

export const BalanceWidget = styled.div`
  width: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
  border: 1px solid ${({ theme }) => theme.colors.muted};
  border-radius: ${({ theme }) => theme.radii.curved};
`;

export const InfoRow = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
`;

export const BaseFont = css`
  font-size: 12px;

  @media only screen and (min-width: 769px) {
    font-size: 14px;
  }
`;

export const InfoLabel = styled.span`
  ${BaseFont}
  color: ${({ theme }) => theme.colors.card.grey};
`;

export const InfoValue = styled.span`
  ${BaseFont}
  font-weight: bold;
  flex-wrap: wrap;
  display: inline-flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.text};
`;

export const InfoOldValue = styled(InfoValue)`
  color: ${({ theme }) => theme.colors.muted};
  display: inline-flex;
  align-items: center;
`;

export const StakeAmountInput = styled(TokenAmountInput)`
  font-size: 20px;
  font-weight: 600;
  border: none;
  outline: none;
  width: inherit;
  font-family: inherit;
`;

export const ActionButton = styled(Button)`
  width: 100%;
  margin-top: 22px;
  self-align: flex-end;
`;
