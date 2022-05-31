import { ActionViewProps } from '../SupportedActions';
import { BigNumber } from 'ethers';
import { Button } from 'old-components/Guilds/common/Button';
import { Box } from 'Components/Primitives/Layout';
import UnstyledLink from 'Components/Primitives/Links/UnstyledLink';
import { FiExternalLink } from 'react-icons/fi';
import { useTheme } from 'styled-components';
import { Divider } from 'old-components/Guilds/common/Divider';
import {
  ActionParamRow,
  ParamDetail,
  ParamTag,
  ParamTitleRow,
  ParamTitleTag,
} from './CallDetails.styled';
import { useTranslation } from 'react-i18next';

export const CallDetails: React.FC<ActionViewProps> = ({
  decodedCall,
  approveSpendTokens,
}) => {
  const theme = useTheme();
  const { t } = useTranslation();

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
        <>
          <ActionParamRow>
            <Box>
              approve ({' '}
              <ParamTag color={theme?.colors?.params?.[0]}>address</ParamTag>
              {', '}
              <ParamTag color={theme?.colors?.params?.[1]}>uint256</ParamTag> )
            </Box>
          </ActionParamRow>
          <ActionParamRow>
            <ParamTitleRow>
              <ParamTitleTag color={theme?.colors?.params?.[0]}>
                spender <em>(address)</em>
              </ParamTitleTag>
            </ParamTitleRow>
            {renderByParamType('address', decodedCall.from)}
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
      <ActionParamRow>
        <Box>
          {decodedCall?.function?.name} (
          {decodedCall?.function?.inputs.map((param, index, params) => (
            <span key={index}>
              <ParamTag color={theme?.colors?.params?.[index]}>
                {param?.type}
              </ParamTag>
              {index < params.length - 1 && <span> , </span>}
            </span>
          ))}
          )
        </Box>
      </ActionParamRow>

      {decodedCall?.function?.inputs?.map((param, index) => (
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
    </>
  );
};

export default CallDetails;
