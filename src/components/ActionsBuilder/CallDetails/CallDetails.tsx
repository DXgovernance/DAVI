import { useEffect, useState, useMemo } from 'react';
import { ActionViewProps } from '../SupportedActions';
import { BigNumber } from 'ethers';
import { Button } from 'components/primitives/Button';
import { Box } from 'components/primitives/Layout/Box';
import { Flex } from 'components/primitives/Layout/Flex';
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
import { SupportedAction } from 'components/ActionsBuilder/types';
import { renderGenericCallParamValue } from 'components/ActionsBuilder/SupportedActions/GenericCall/GenericCallParamsMatcher';
import UndecodableCallDetails from 'components/ActionsBuilder/UndecodableCalls/UndecodableCallDetails';
import { BlockExplorerLink } from 'components/primitives/Links/BlockExplorerLink';

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
    return <BlockExplorerLink address={param.value} />;
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

export const CallDetails: React.FC<ActionViewProps> = ({
  decodedCall,
  approveSpendTokens,
}) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);
  const [displayRichData, setDisplayRichData] = useState(false);
  const [isApprovalExpanded, setIsApprovalExpanded] = useState(false);
  const ActionSummary = getSummaryView(decodedCall?.callType);
  const { functionData } = useRichContractData(decodedCall);

  const isGenericCall = decodedCall?.callType === SupportedAction.GENERIC_CALL;

  const isRawTransaction =
    decodedCall?.callType === SupportedAction.RAW_TRANSACTION;

  const isNativeTransfer =
    decodedCall?.callType === SupportedAction.NATIVE_TRANSFER;

  const genericParams: Param[] = useMemo(() => {
    if (
      !decodedCall &&
      !functionData &&
      decodedCall.callType !== SupportedAction.GENERIC_CALL
    )
      return null;
    return functionData?.params?.map(param => ({
      ...param,
      value: getStringValueForParam(param.type, decodedCall.args[param.name]),
    }));
  }, [functionData, decodedCall]);

  const renderRawInputParams = () => {
    return decodedCall?.function?.inputs?.map((param, index) => (
      <ActionParamRow key={index}>
        <ParamTitleRow>
          <ParamTitleTag color={theme?.colors?.params?.[index]}>
            {param.name} <em>({param.type})</em>
          </ParamTitleTag>
          {param.type === 'bytes' && (
            <Button variant="secondary">{t('decode')}</Button>
          )}
        </ParamTitleRow>

        {renderDefaultParamValue({
          ...param,
          value: getStringValueForParam(
            param.type,
            decodedCall.args[param.name]
          ),
        })}
      </ActionParamRow>
    ));
  };

  const renderRichDataParams = () => {
    return genericParams?.map(param => {
      return (
        <ActionParamRow
          key={`${param?.name}${param?.type}${param.description}`}
        >
          <ParamTitleRow>{param?.description ?? param?.name}</ParamTitleRow>
          <ParamDetail>
            {renderGenericCallParamValue({
              ...param,
              value: getStringValueForParam(
                param.type,
                decodedCall?.args[param.name]
              ),
            })}
          </ParamDetail>
        </ActionParamRow>
      );
    });
  };

  useEffect(() => {
    if (isGenericCall && genericParams) {
      setDisplayRichData(true);
    }
  }, []); // eslint-disable-line

  return (
    <>
      {functionData && genericParams && (
        <Flex direction="row" justifyContent="flex-end">
          <DetailsButton
            isExpanded={false}
            variant={'secondary'}
            onClick={() => setDisplayRichData(v => !v)}
          >
            {displayRichData ? t('displayRawData') : t('displayFormatedData')}
          </DetailsButton>
        </Flex>
      )}

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
                {isGenericCall && genericParams && displayRichData ? (
                  t('approveSpendingCall')
                ) : (
                  <>
                    {t('approve').toLowerCase()} ({' '}
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
                  </>
                )}
              </DetailsButton>
              {isApprovalExpanded ? (
                isGenericCall && genericParams && displayRichData ? (
                  <>
                    <ActionParamRow>
                      <ParamTitleRow>
                        {t('addressToWhichTheExpenseIsBeingAuthorized')}
                      </ParamTitleRow>

                      <ParamDetail>
                        {renderGenericCallParamValue({
                          component: 'address',
                          value: decodedCall?.to,
                        })}
                      </ParamDetail>
                    </ActionParamRow>
                    <ActionParamRow>
                      <ParamTitleRow> {t('amountBeingApproved')}</ParamTitleRow>
                      <ParamDetail>
                        {renderGenericCallParamValue({
                          component: 'tokenAmount',
                          value: approveSpendTokens?.amount?.toString(),
                        })}{' '}
                      </ParamDetail>
                    </ActionParamRow>
                  </>
                ) : (
                  <>
                    <ActionParamRow>
                      <ParamTitleRow>
                        <ParamTitleTag color={theme?.colors?.params?.[0]}>
                          {t('spender').toLowerCase()} <em>(address)</em>
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
                          {t('amount').toLowerCase()} <em>(uint256)</em>
                        </ParamTitleTag>
                      </ParamTitleRow>
                      {renderDefaultParamValue({
                        type: 'uint256',
                        value: approveSpendTokens?.amount?.toString(),
                      })}
                    </ActionParamRow>
                  </>
                )
              ) : null}
            </DetailsSection>
          </Box>
          <Divider />
        </>
      )}

      {ActionSummary && (
        <Box margin="1rem 0 0">
          <ActionSummary decodedCall={decodedCall} />
        </Box>
      )}

      {!isNativeTransfer && !isRawTransaction && (
        <DetailsSection>
          <DetailsButton
            onClick={() => setIsExpanded(!isExpanded)}
            isExpanded={isExpanded}
            variant={'secondary'}
          >
            {isGenericCall && genericParams && displayRichData ? (
              functionData.title
            ) : (
              <>
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
              </>
            )}
          </DetailsButton>

          {isExpanded
            ? isGenericCall && genericParams && displayRichData
              ? renderRichDataParams()
              : renderRawInputParams()
            : null}
        </DetailsSection>
      )}
      {isRawTransaction && (
        <DetailsSection>
          <UndecodableCallDetails call={decodedCall} />
        </DetailsSection>
      )}
    </>
  );
};

export default CallDetails;
