import { BigNumber } from 'ethers';
import useRichContractData from 'hooks/Guilds/contracts/useRichContractData';
import { RichContractFunctionParam } from 'hooks/Guilds/contracts/useRichContractRegistry';
import useBigNumberToString from 'hooks/Guilds/conversions/useBigNumberToString';
import { Interweave } from 'interweave';
import {
  useERC20Info,
  getTokenInfoParsedParams,
} from 'hooks/Guilds/erc20/useERC20Info';
import { Segment } from '../common/infoLine';
import { useMemo } from 'react';
import { FiArrowRight, FiCode } from 'react-icons/fi';
import { ActionViewProps } from '..';
import GenericCallParamsMatcher from './GenericCallParamsMatcher';
import { useTranslation } from 'react-i18next';
import { preventEmptyString } from 'utils';

export interface FunctionParamWithValue extends RichContractFunctionParam {
  value: string;
}

const GenericCallInfoLine: React.FC<ActionViewProps> = ({
  decodedCall,
  approveSpendTokens,
  compact = false,
}) => {
  const { t } = useTranslation();
  const { data: tokenInfo } = useERC20Info(approveSpendTokens?.token);
  const approvalAmount = useBigNumberToString(
    preventEmptyString(approveSpendTokens?.amount),
    tokenInfo?.decimals
  );
  const { functionData } = useRichContractData(decodedCall);

  function getReadableStringForParam(type: string, value: any, name: string) {
    if (!type || !value) return null;

    if (name === 'proposalId') {
      return `${value.substring(0, 6)}...${value.substring(value.length - 4)}`;
    }

    if (type.startsWith('uint') || type.startsWith('int')) {
      return BigNumber.from(value).toString();
    }

    return value;
  }

  const params: FunctionParamWithValue[] = useMemo(() => {
    if (!decodedCall || !functionData) return null;
    return functionData.params
      .map(param => ({
        ...param,
        value: getReadableStringForParam(
          param.type,
          decodedCall.args[param.name],
          param.name
        ),
      }))
      .concat(getTokenInfoParsedParams(tokenInfo));
  }, [functionData, decodedCall, tokenInfo]);

  return (
    <>
      <Segment>
        <FiCode size={16} />
      </Segment>

      {compact || !params ? (
        <>
          {!!approveSpendTokens && (
            <>
              <Segment>
                {!!tokenInfo
                  ? approvalAmount + tokenInfo?.symbol
                  : t('unknownToken')}
              </Segment>
              <Segment>
                <FiArrowRight />
              </Segment>
            </>
          )}
          <Segment>
            {decodedCall?.richFunctionData?.title ||
              decodedCall?.function?.name}
          </Segment>
        </>
      ) : (
        <>
          {!!approveSpendTokens && (
            <>
              <Segment>
                {!!tokenInfo
                  ? approvalAmount + tokenInfo?.symbol ?? ''
                  : 'Unknown token'}
              </Segment>
              <Segment>
                <FiArrowRight />
              </Segment>
            </>
          )}
          <Segment>
            <Interweave
              content={functionData?.templateLiteral}
              matchers={[
                new GenericCallParamsMatcher('genericCallParamsMatcher', {
                  params,
                }),
              ]}
            />
          </Segment>
        </>
      )}
    </>
  );
};

export default GenericCallInfoLine;
