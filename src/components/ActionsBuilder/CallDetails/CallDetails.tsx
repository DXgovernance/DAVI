import { useState } from 'react';
import { ActionViewProps } from '../SupportedActions';
import { BigNumber } from 'ethers';
import { Button } from 'components/Primitives/Button';
import { Box } from 'components/Primitives/Layout/Box';
import UnstyledLink from 'components/Primitives/Links/UnstyledLink';
import { FiExternalLink } from 'react-icons/fi';
import { useTheme } from 'styled-components';
import { Divider } from 'components/Divider';
import {
  ActionParamRow,
  DetailsButton,
  DetailsSection,
  ParamDetail,
  ParamTag,
  ParamTitleRow,
  ParamTitleTag,
} from './CallDetails.styled';
import { useTranslation } from 'react-i18next';
import { SupportedAction } from '../types';

export const CallDetails: React.FC<ActionViewProps> = ({
  decodedCall,
  approveSpendTokens,
}) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isApprovalExpanded, setIsApprovalExpanded] = useState(false);

  function renderByParamType(type: string, value: any) {
    if (!type || !value) return null;

    if (type === 'address') {
      return (
        <UnstyledLink to="#">
          <ParamDetail>
            {value} <FiExternalLink size={16} />
          </ParamDetail>
        </UnstyledLink>
      );
    }

    if (type.startsWith('uint') || type.startsWith('int')) {
      if (Array.isArray(value)) {
        let valuesStringFromArray: string = '[';

        value.forEach((element, index) => {
          let separator = ', ';
          if (index === 0) separator = '';

          const elementBigNumber = BigNumber.from(element).toString();
          return (valuesStringFromArray += separator += elementBigNumber);
        });
        valuesStringFromArray += ']';

        return <ParamDetail>{valuesStringFromArray}</ParamDetail>;
      }

      return <ParamDetail>{BigNumber.from(value).toString()}</ParamDetail>;
    }

    return <ParamDetail>{value}</ParamDetail>;
  }
  return (
    <>
      {!!approveSpendTokens && (
        <Box>
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
                {renderByParamType('address', decodedCall.to)}
              </ActionParamRow>
              <ActionParamRow>
                <ParamTitleRow>
                  <ParamTitleTag color={theme?.colors?.params?.[1]}>
                    amount <em>(uint256)</em>
                  </ParamTitleTag>
                </ParamTitleRow>
                {renderByParamType('uint256', approveSpendTokens?.amount)}
              </ActionParamRow>
              <Divider style={{ marginBottom: '2rem' }} />
            </>
          )}
        </Box>
      )}

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
            decodedCall?.function?.inputs?.map((param, index) => (
              <ActionParamRow key={index}>
                <ParamTitleRow>
                  <ParamTitleTag color={theme?.colors?.params?.[index]}>
                    {param.name} <em>({param.type})</em>
                  </ParamTitleTag>
                  {param.type === 'bytes' && (
                    <Button variant="secondary">{t('decode')}</Button>
                  )}
                </ParamTitleRow>

                {renderByParamType(param.type, decodedCall?.args?.[param.name])}
              </ActionParamRow>
            ))}
        </DetailsSection>
      )}
    </>
  );
};

export default CallDetails;
