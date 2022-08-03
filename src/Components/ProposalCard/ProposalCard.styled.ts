import styled from 'styled-components';
import { Box } from 'Components/Primitives/Layout';
import { Heading } from 'old-components/Guilds/common/Typography';
import { Button } from 'old-components/Guilds/common/Button';

// TODO: base these components on a generic Card component
export const CardWrapper = styled(Box)<{ disabled?: boolean }>`
  border: 1px solid ${({ theme }) => theme.colors.muted};
  border-radius: ${({ theme }) => theme.radii.curved};
  margin-bottom: 1rem;
  padding: 1rem;
  color: ${({ theme }) => theme.colors.proposalText.lightGrey};

  &:hover {
    ${({ theme, disabled }) =>
      disabled
        ? `cursor: default;`
        : `border-color: ${theme.colors.border.hover};
          color: ${theme.colors.text};`}
  }
`;

export const CardHeader = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const CardContent = styled(Box)`
  margin: 1rem 0;
`;

export const CardFooter = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  @media only screen and (max-width: 524px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const CardTitle = styled(Heading)`
  font-size: 1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  @media only screen and (min-width: 768px) {
    font-size: 1.25rem;
  }
`;

export const IconDetailWrapper = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex: 1;
`;

export const Detail = styled(Box)`
  font-size: 0.95rem;
  font-weight: 600;
  margin-left: 0.5rem;
`;

export const ActionsWrapper = styled(Box)`
  display: flex;
  flex: 1;
  margin-right: 24px;
  position: relative;
  overflow-x: hidden;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background: ${({ theme }) =>
      `linear-gradient(to right, transparent 89%, ${theme.colors.background} 100%)`};
  }
  & > div {
    margin: 4px 2px;
  }
  @media only screen and (max-width: 524px) {
    flex-wrap: wrap;
    border-bottom: 1px solid ${({ theme }) => theme.colors.muted};
    margin-bottom: 0.5rem;
    padding-bottom: 0.5rem;
    & > div:nth-child(n + 3) {
      display: none;
    }
    &::before {
      content: none;
    }
  }
`;

export const WinningOptionWrapper = styled(IconDetailWrapper)``;

export const OptionVotesAndLabelWrapper = styled(IconDetailWrapper)`
  display: flex;
  flex: none;
  border: 1px solid ${({ theme }) => theme.colors.border.initial};
  border-radius: 1rem 0rem 0rem 1rem;
  border-right: none;
  font-weight: 600;
  width: fit-content;
  height: 30px;
  padding: 0 12px;
`;

export const ActionDetailsWrapper = styled(Button)<{ isClickable: boolean }>`
  display: flex;
  justify-content: flex-start;
  flex: none;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.colors.border.initial};
  border-radius: 0rem 1rem 1rem 0rem;
  height: 32px;
  width: fit-content;
  margin: 0;
  padding: 0 12px;
  color: ${({ theme }) => theme.colors.grey};

  :hover {
    color: ${({ theme }) => theme.colors.text};
    ${({ isClickable }) =>
      isClickable
        ? `cursor: pointer;`
        : `cursor: default;
          `}
  }
`;

export const NotFoundActionWrapper = styled.div`
  display: flex;
  padding: 4px;
  border: ${({ theme }) => `1px solid ${theme.colors.red}`};
  border-radius: 30px;
`;

export const ActionsTooltipWrapper = styled.div`
  margin-left: -11px;
  margin-top: 2.5rem;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: flex-start;
  border-radius: ${({ theme }) => theme.radii.curved};
  border: 1px solid ${({ theme }) => theme.colors.muted};
  padding: 16px 20px;
  background-color: ${({ theme }) => theme.colors.modalBackground};
  color: ${({ theme }) => theme.colors.proposalText.lightGrey};
`;

export const ActionWrapper = styled.div`
  display: flex;
`;

export const ActionNumber = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 1.5rem;
  width: 1.5rem;
  color: ${({ theme }) => theme.colors.proposalText.lightGrey};
  border: 1px solid;
  border-radius: 50%;
  font-weight: 600;
  margin-right: 12px;
`;

export const ActionCountWrapper = styled.div`
  display: flex;
  align-items: center;
  font-weight: 600;
`;

export const ActionCount = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.muted};
  border-radius: 50%;
  height: 24px;
  width: 24px;
  margin-right: 8px;
`;

export const SpacerLine = styled.div`
  height: 20px;
  color: ${({ theme }) => theme.colors.proposalText.lightGrey};
  border-right: 1px solid;
  margin-left: 13px;
`;

export const Icon = styled.img<{
  spaceLeft?: boolean;
  spaceRight?: boolean;
  bordered?: boolean;
}>`
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;

  ${props => props.spaceLeft && `margin-left: 0.5rem;`}
  ${props => props.spaceRight && `margin-right: 0.5rem;`}

  ${props =>
    props.bordered &&
    `
    border: 1px solid #000;
    border-radius: 50%;
  `}
`;

export const VoteInfoWrapper = styled(Box)`
  min-width: unset;
`;
