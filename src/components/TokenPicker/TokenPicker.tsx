import { useEffect, useMemo, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';

import { Input } from 'components/primitives/Forms/Input';
import { Modal } from 'components/primitives/Modal';
import { useAllERC20Balances } from 'hooks/Guilds/erc20/useAllERC20Balances';
import useMiniSearch from 'hooks/useMiniSearch';

import { TokenListItem } from './components/TokenListItem';
import { TokenPickerProps, TokenWithBalanceIndexable } from './types';

import {
  TokenPickerContainer,
  SearchWrapper,
  TokenList,
} from './TokenPicker.styled';
import { useAccount } from 'wagmi';
import { TokenType } from 'hooks/Guilds/tokens/useTokenList';

const TokenPicker: React.FC<TokenPickerProps> = ({
  walletAddress,
  isOpen,
  onSelect,
  onClose,
  showNativeToken,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { t } = useTranslation();
  const { address } = useAccount();
  const { data } = useAllERC20Balances(
    walletAddress || address,
    showNativeToken
  );

  const { instance, buildIndex, query } =
    useMiniSearch<TokenWithBalanceIndexable>({
      fields: ['name', 'symbol', 'address'],
      storeFields: ['address'],
      searchOptions: {
        fuzzy: 2,
        prefix: true,
      },
    });

  const tokens = useMemo(() => {
    return data.map(token => {
      return {
        ...token,
        id: token.type === TokenType.NATIVE ? 'NATIVE' : token?.address,
      };
    });
  }, [data]);

  useEffect(() => {
    if (instance?.documentCount !== tokens?.length) {
      buildIndex(tokens);
    }
  }, [buildIndex, tokens, instance]);

  const searchResults = useMemo(() => {
    if (!searchQuery) return [];

    return query({ queries: [searchQuery] });
  }, [searchQuery, query]);

  return (
    <Modal
      header={t('selectAToken')}
      isOpen={isOpen}
      onDismiss={onClose}
      maxWidth={390}
    >
      <TokenPickerContainer>
        <SearchWrapper>
          <Input
            icon={<FiSearch />}
            placeholder={t('searchToken')}
            value={searchQuery}
            onChange={e => setSearchQuery(e?.target?.value)}
          />
        </SearchWrapper>
        <TokenList>
          {(searchQuery ? searchResults : tokens)?.map(token => (
            <TokenListItem
              key={token.id}
              token={token}
              onSelect={() => onSelect(token)}
            />
          ))}
        </TokenList>
      </TokenPickerContainer>
    </Modal>
  );
};

export default TokenPicker;
