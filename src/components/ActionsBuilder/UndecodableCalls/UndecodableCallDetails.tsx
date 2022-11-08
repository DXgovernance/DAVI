import { MetadataTag } from '../SupportedActions/common/infoLine';
import { DetailRow } from '../SupportedActions/common/Summary.styled';
import { Call } from '../types';
import { BigNumber } from 'ethers';
import { Box } from 'components/primitives/Layout/Box';
import { BlockExplorerLink } from 'components/primitives/Links';
import styled, { useTheme } from 'styled-components';

const ParamTitleRow = styled(DetailRow)`
  margin-bottom: 0.75rem;
`;

const ParamTitleTag = styled(MetadataTag)`
  display: inline-block;
  padding: 0.375rem 0.5rem;
  color: ${({ color }) => color};
`;

const ActionParamRow = styled(Box)`
  margin-bottom: 1.5rem;
`;

const ParamDetail = styled(Box)`
  color: ${({ theme }) => theme.colors.grey};
  overflow-wrap: break-word;
`;

const UndecodableCallDetails: React.FC<{ call: Call }> = ({ call }) => {
  const theme = useTheme();

  function renderByCallData(key: string, value: any) {
    if (!key || !value) return null;

    if (key === 'to' || key === 'from') {
      return <BlockExplorerLink address={value} unstyled avatarSize={16} />;
    }

    if (key === 'value') {
      return <ParamDetail>{BigNumber.from(value).toString()}</ParamDetail>;
    }

    return <ParamDetail>{value}</ParamDetail>;
  }

  const renderedCallDetails: Call = {
    from: call.from,
    to: call.to,
    data: call.data,
    value: call.value,
  };

  return (
    <>
      {Object.entries(renderedCallDetails)?.map(([key, value], index) => (
        <ActionParamRow key={index}>
          <ParamTitleRow>
            <ParamTitleTag color={theme?.colors?.params?.[index]}>
              {key}
            </ParamTitleTag>
          </ParamTitleRow>

          {renderByCallData(key, value)}
        </ActionParamRow>
      ))}
    </>
  );
};

export default UndecodableCallDetails;
