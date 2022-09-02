import { useState, useMemo } from 'react';
import { ActionViewProps } from '../SupportedActions';
import { BigNumber } from 'ethers';
import { Button } from 'components/primitives/Button';
import { Box } from 'components/primitives/Layout/Box';
import { UnstyledLink } from 'components/primitives/Links';
import { FiExternalLink } from 'react-icons/fi';
import { useTheme } from 'styled-components';
import { Divider } from 'components/Divider';
import { getSummaryView } from '../SupportedActions';
import {
  ActionParamRow,
  DetailsButton,
  DetailsSection,
  ParamDetail,
  ParamTag,
  ParamTitleRow,
  ParamTitleTag,
} from './CallDetails.styled';
import useRichContractData from 'hooks/Guilds/contracts/useRichContractData';
import { useTranslation } from 'react-i18next';
import { FunctionParamWithValue } from 'components/ActionsBuilder/SupportedActions/GenericCall/GenericCallInfoLine';
import { ENSAvatar } from 'components/Avatar';
import { DecodedCall, SupportedAction } from 'components/ActionsBuilder/types';
import { renderGenericCallParamValue } from 'components/ActionsBuilder/SupportedActions/GenericCall/GenericCallParamsMatcher';

type Param = Partial<FunctionParamWithValue>;

function getStringValueForParam(type: string, value: any) {
  if (!type || !value) return null;

  if (type.startsWith('uint') || type.startsWith('int')) {
    return BigNumber.from(value).toString();
  }
  return value;
}

function renderDefaultParamValue(param: Param) {
  if (!param) return null;

  if (param.type === 'address') {
    return (
      <UnstyledLink to="#">
        <ParamDetail>
          <ENSAvatar address={param.value} size={16} /> {param.value}{' '}
          <FiExternalLink size={16} />
        </ParamDetail>
      </UnstyledLink>
    );
  }

  if (param.type.startsWith('uint') || param.type.startsWith('int')) {
    if (Array.isArray(param.value)) {
      let valuesStringFromArray: string = '[';

      param.value.forEach((element, index) => {
        let separator = ', ';
        if (index === 0) separator = '';

        const elementBigNumber = BigNumber.from(element).toString();
        return (valuesStringFromArray += separator += elementBigNumber);
      });
      valuesStringFromArray += ']';

      return <ParamDetail>{valuesStringFromArray}</ParamDetail>;
    }

    return <ParamDetail>{BigNumber.from(param.value).toString()}</ParamDetail>;
  }

  return <ParamDetail>{param.value}</ParamDetail>;
}

function renderParamValue(param: Param, decodedCall: DecodedCall) {
  if (!param) return null;
  switch (decodedCall.callType) {
    case SupportedAction.GENERIC_CALL:
      return renderGenericCallParamValue(param);
    default:
      return renderDefaultParamValue(param);
  }
}

export const CallDetails: React.FC<ActionViewProps> = ({
  decodedCall,
  approveSpendTokens,
}) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isApprovalExpanded, setIsApprovalExpanded] = useState(false);
  const ActionSummary = getSummaryView(decodedCall?.callType);
  const { functionData } = useRichContractData(decodedCall);

  const params: Param[] = useMemo(() => {
    if (!decodedCall) return null;

    return decodedCall.callType === SupportedAction.GENERIC_CALL && functionData
      ? functionData.params.map(param => ({
          ...param,
          value: getStringValueForParam(
            param.type,
            decodedCall.args[param.name]
          ),
        }))
      : decodedCall?.function?.inputs.map(param => ({
          ...param,
          value: getStringValueForParam(
            param.type,
            decodedCall.args[param.name]
          ),
        }));
  }, [functionData, decodedCall]);

  return (
    <>
      {!!approveSpendTokens && (
        <>
          <Box margin="0 0 1rem">
            {ActionSummary && (
              <ActionSummary decodedCall={approveSpendTokens} />
            )}
            <DetailsSection>
              <DetailsButton
                onClick={() => setIsApprovalExpanded(!isApprovalExpanded)}
                isExpanded={isApprovalExpanded}
                variant={'secondary'}
              >
                approve ({' '}
                <ParamTag
                  color={
                    isApprovalExpanded
                      ? theme?.colors?.params?.[0]
                      : theme?.colors?.text
                  }
                >
                  address
                </ParamTag>
                {', '}
                <ParamTag
                  color={
                    isApprovalExpanded
                      ? theme?.colors?.params?.[1]
                      : theme?.colors?.text
                  }
                >
                  uint256
                </ParamTag>{' '}
                )
              </DetailsButton>
              {isApprovalExpanded && (
                <>
                  <ActionParamRow></ActionParamRow>
                  <ActionParamRow>
                    <ParamTitleRow>
                      <ParamTitleTag color={theme?.colors?.params?.[0]}>
                        spender <em>(address)</em>
                      </ParamTitleTag>
                    </ParamTitleRow>
                    {renderDefaultParamValue({
                      type: 'address',
                      value: decodedCall?.to,
                    })}
                  </ActionParamRow>
                  <ActionParamRow>
                    <ParamTitleRow>
                      <ParamTitleTag color={theme?.colors?.params?.[1]}>
                        amount <em>(uint256)</em>
                      </ParamTitleTag>
                    </ParamTitleRow>
                    {renderDefaultParamValue({
                      type: 'uint256',
                      value: approveSpendTokens?.amount?.toString(),
                    })}
                  </ActionParamRow>
                </>
              )}
            </DetailsSection>
          </Box>
          <Divider style={{ marginBottom: '1rem' }} />
        </>
      )}

      {ActionSummary && <ActionSummary decodedCall={decodedCall} />}

      {decodedCall.callType !== SupportedAction.NATIVE_TRANSFER && (
        <DetailsSection>
          <DetailsButton
            onClick={() => setIsExpanded(!isExpanded)}
            isExpanded={isExpanded}
            variant={'secondary'}
          >
            {decodedCall?.function?.name} (
            {decodedCall?.function?.inputs.map((param, index) => (
              <span key={index}>
                {index > 0 && <span>, </span>}
                <ParamTag
                  key={index}
                  color={
                    isExpanded
                      ? theme?.colors?.params?.[index]
                      : theme?.colors?.text
                  }
                >
                  {param?.type}
                </ParamTag>
              </span>
            ))}
            )
          </DetailsButton>

          {isExpanded &&
            params?.map((param, index) => {
              return (
                <ActionParamRow key={index}>
                  <ParamTitleRow>
                    <ParamTitleTag color={theme?.colors?.params?.[index]}>
                      {param.name} <em>({param.type})</em>
                    </ParamTitleTag>
                    {param.type === 'bytes' && (
                      <Button variant="secondary">{t('decode')}</Button>
                    )}
                  </ParamTitleRow>
                  {renderParamValue(param, decodedCall)}
                </ActionParamRow>
              );
            })}
        </DetailsSection>
      )}
    </>
  );
};

export default CallDetails;
