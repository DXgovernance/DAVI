import { MetadataTag } from '../SupportedActions/common/infoLine';
import { DetailRow } from '../SupportedActions/common/Summary.styled';
import styled, { css } from 'styled-components';
import { Box } from 'components/primitives/Layout/Box';
import { Button } from 'components/primitives/Button';

export const ParamTag = styled(MetadataTag)`
  margin: 0;
  padding: 0;
  color: ${({ color }) => color};
  background-color: transparent;
`;

export const ParamTitleRow = styled(DetailRow)`
  margin: ${({ margin }) => margin || 'inherit inherit 0.75rem'};
`;
export const ParamDescription = styled(Box)`
  color: ${({ theme }) => theme.colors.white};
  font-size: 0.75rem;
  margin-bottom: 0.75rem;
`;

export const ParamTitleTag = styled(MetadataTag)`
  display: inline-block;
  padding: 0.375rem 0.5rem;
  color: ${({ color }) => color};
`;

export const ActionParamRow = styled(Box)`
  margin-top: 20px;
`;

export const ParamDetail = styled(Box)`
  color: ${({ theme }) => theme.colors.grey};
  overflow-wrap: break-word;
`;

export const DetailsSection = styled(Box)`
  padding-top: 0.75rem;
`;

export const DetailsButton = styled(Button)<{ isExpanded: boolean }>`
  font-size: 12px;
  margin: 0;
  padding: 4px 8px;
  ${({ isExpanded }) =>
    isExpanded &&
    css`
      border-color: ${({ theme }) => theme.colors.border3};
    `}
`;
