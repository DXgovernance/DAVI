import { useMemo, useState } from 'react';
import { SwaprPickerProps } from './types';
import { useNetwork } from 'wagmi';
import { Input } from 'components/primitives/Forms/Input';
import { Avatar } from 'components/Avatar';
import { FiChevronDown } from 'react-icons/fi';
import { resolveUri } from 'utils/url';
import { useTokenList } from 'hooks/Guilds/tokens/useTokenList';
import TokenPicker from 'components/TokenPicker/TokenPicker';
import { useERC20Info } from 'hooks/Guilds/erc20/useERC20Info';
import { useTypedParams } from 'Modules/Guilds/Hooks/useTypedParams';

const TokenPickerInput: React.FC<SwaprPickerProps> = ({
  value: token,
  onChange,
}) => {
  const [isTokenPickerOpen, setIsTokenPickerOpen] = useState(false);

  const { chain } = useNetwork();

  const { guildId } = useTypedParams();
  const { tokens } = useTokenList(chain?.id);
  const { data: tokenInfo } = useERC20Info(token);

  const selectedToken = useMemo(() => {
    if (!token || !tokens) return null;

    return tokens.find(({ address }) => address === token);
  }, [tokens, token]);

  return (
    <div onClick={() => setIsTokenPickerOpen(true)}>
      <Input
        value={tokenInfo?.symbol || ''}
        placeholder="Token"
        icon={
          <div>
            {token && (
              <Avatar
                src={resolveUri(selectedToken?.logoURI)}
                defaultSeed={token}
                size={18}
              />
            )}
          </div>
        }
        iconRight={<FiChevronDown size={24} />}
      />
      <TokenPicker
        walletAddress={guildId}
        isOpen={isTokenPickerOpen}
        onClose={() => setIsTokenPickerOpen(false)}
        onSelect={token => {
          onChange(token.address);
          setIsTokenPickerOpen(false);
        }}
      />
    </div>
  );
};

export default TokenPickerInput;
