import { resolveUri } from 'utils/url';

import useBigNumberToNumber from 'hooks/Guilds/conversions/useBigNumberToNumber';

import { Loading } from 'components/Primitives/Loading';
import { Avatar } from 'components/Avatar';

import { TokenProps } from './types';

import {
  TokenItem,
  TokenDetail,
  TokenIcon,
  TokenTicker,
  TokenName,
} from './TokenListItem.styled';

const TokenListItem: React.FC<TokenProps> = ({ token, onSelect }) => {
  const roundedBalance = useBigNumberToNumber(
    token?.balance,
    token?.decimals,
    3
  );

  return (
    <TokenItem onClick={() => onSelect(token)}>
      <TokenDetail>
        <TokenIcon>
          <Avatar
            src={resolveUri(token.logoURI)}
            defaultSeed={token.address}
            size={28}
          />
        </TokenIcon>
        <div>
          <TokenTicker>{token.symbol}</TokenTicker>
          <TokenName>{token.name}</TokenName>
        </div>
      </TokenDetail>
      <div>
        {roundedBalance !== undefined ? roundedBalance : <Loading loading />}
      </div>
    </TokenItem>
  );
};

export default TokenListItem;
