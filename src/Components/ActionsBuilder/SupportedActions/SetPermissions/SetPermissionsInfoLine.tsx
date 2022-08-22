import { useMemo } from 'react';
import { ActionViewProps } from '..';
import { Segment } from '../common/infoLine';
import Avatar from 'Components/Avatar';
import { BiCheckShield } from 'react-icons/bi';
import { ParsedDataInterface } from './types';
import { useTranslation } from 'react-i18next';
import { Flex } from 'Components/Primitives/Layout';
import { useNetwork } from 'wagmi';
import { useTokenList } from 'hooks/Guilds/tokens/useTokenList';
import { resolveUri } from 'utils/url';

const SetPermissionsInfoLine: React.FC<ActionViewProps> = ({
  decodedCall,
  compact,
  noAvatar,
}) => {
  const { t } = useTranslation();

  const parsedData = useMemo<ParsedDataInterface>(() => {
    if (!decodedCall) return null;

    const { functionName, asset } = decodedCall?.optionalProps;
    const { to, functionSignature, valueAllowed, allowance } = decodedCall.args;
    return {
      asset,
      to,
      functionSignature,
      valueAllowed,
      allowance,
      functionName,
    };
  }, [decodedCall]);

  const { chain } = useNetwork();
  const { tokens } = useTokenList(chain?.id);

  let currentToken = useMemo(() => {
    return tokens.filter(token => token?.address === parsedData?.asset)[0];
  }, [tokens, parsedData]);

  return (
    <>
      <Segment>
        <BiCheckShield size={16} />
      </Segment>
      <Segment>{t('setPermissionsFor')}</Segment>
      <Segment>
        {currentToken && currentToken.address ? (
          <>
            <Avatar
              src={resolveUri(currentToken.logoURI)}
              defaultSeed={currentToken.address}
              size={24}
            />
            <Flex margin={'0 0.5rem'}>{currentToken.symbol}</Flex>
          </>
        ) : (
          t('anyToken')
        )}
      </Segment>
    </>
  );
};

export default SetPermissionsInfoLine;
