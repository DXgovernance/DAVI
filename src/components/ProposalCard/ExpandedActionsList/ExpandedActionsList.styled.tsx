import styled from 'styled-components';

export const ActionWrapper = styled.div`
  display: flex;
`;

export const ActionNumber = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 1.5rem;
  width: 1.5rem;
  color: ${({ theme }) => theme.colors.grey2};
  border: 1px solid;
  border-radius: 50%;
  font-weight: 600;
  margin-right: 12px;
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
  border: 1px solid ${({ theme }) => theme.colors.border1};
  padding: 16px 20px;
  background-color: ${({ theme }) => theme.colors.bg3};
  color: ${({ theme }) => theme.colors.grey2};
`;

export const SpacerLine = styled.div`
  height: 20px;
  color: ${({ theme }) => theme.colors.grey2};
  border-right: 1px solid;
  margin-left: 13px;
`;
