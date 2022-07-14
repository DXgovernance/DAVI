import { MetadataTag } from '../SupportedActions/common/infoLine';
import { DetailRow } from '../SupportedActions/common/summary';
import styled, { css } from 'styled-components';
import { Box } from 'Components/Primitives/Layout';
import { Button } from 'old-components/Guilds/common/Button';

export const ParamTag = styled(MetadataTag)`
  margin: 0;
  padding: 0;
  color: ${({ color }) => color};
  background-color: transparent;
`;

export const ParamTitleRow = styled(DetailRow)`
  margin-bottom: 0.75rem;
`;

export const ParamTitleTag = styled(MetadataTag)`
  display: inline-block;
  padding: 0.375rem 0.5rem;
  color: ${({ color }) => color};
`;

export const ActionParamRow = styled(Box)`
  margin-bottom: 1.5rem;
`;

export const ParamDetail = styled(Box)`
  color: ${({ theme }) => theme.colors.proposalText.grey};
  overflow-wrap: break-word;
`;

export const DetailsButton = styled(Button)<{ isExpanded: boolean }>`
  ${({ isExpanded }) =>
    isExpanded &&
    css`
      border-color: ${({ theme }) => theme.colors.border.hover};
    `}
`;
