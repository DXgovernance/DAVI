import { MetadataTag } from '../SupportedActions/common/infoLine';
import { DetailRow } from '../SupportedActions/common/summary';
import styled from 'styled-components';
import { Box } from 'old-components/common/Box';

export const ParamTag = styled(MetadataTag)`
  border-radius: ${({ theme }) => theme.radii.pill};
  margin: 0 0.25rem;
  color: ${({ color }) => color};
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
