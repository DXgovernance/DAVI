import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  TokenWithBalance,
  useAllERC20Balances,
} from 'hooks/Guilds/ether-swr/erc20/useAllERC20Balances';
import { TokenPickerProps } from './types';
import { Picker } from 'Components/Primitives/Forms/Picker';
import { ethers } from 'ethers';
import { resolveUri } from 'utils/url';
import Avatar from 'old-components/Guilds/Avatar';
import { useAccount } from 'wagmi';

const TokenPicker: React.FC<TokenPickerProps> = ({
  walletAddress,
  isOpen,
  onSelect,
  onClose,
}) => {
  const { t } = useTranslation();
  const { address } = useAccount();
  const { data } = useAllERC20Balances(walletAddress || address);

  const handleSelect = (option: TokenWithBalance) => {
    onSelect(option.address);
  };

  // "Translate" token data to fields needed in the Picker component
  const tokens = useMemo(() => {
    return data.map(token => {
      let formattedBalance = (
        token.balance !== undefined
          ? ethers.utils.formatUnits(token?.balance, token?.decimals)
          : '-'
      ).slice(0, -2);

      return {
        ...token,
        id: token?.address,
        title: token?.symbol,
        subtitle: token?.name,
        value: token?.address,
        rightData: formattedBalance,
        icon: (
          <Avatar
            src={resolveUri(token?.logoURI)}
            defaultSeed={token?.address}
            size={28}
          />
        ),
      };
    });
  }, [data]);

  return (
    <Picker
      data={tokens}
      header={t('selectAToken')}
      isOpen={isOpen}
      onSelect={handleSelect}
      onClose={onClose}
    />
  );
};

export default TokenPicker;
