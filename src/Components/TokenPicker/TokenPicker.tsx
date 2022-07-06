import { useEffect, useMemo, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { FiSearch } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';

import Input from 'old-components/Guilds/common/Form/Input';
import { Modal } from 'Components';
import { useAllERC20Balances } from 'hooks/Guilds/ether-swr/erc20/useAllERC20Balances';
import useMiniSearch from 'hooks/useMiniSearch';

import { TokenListItem } from './components/TokenListItem';
import { TokenPickerProps, TokenWithBalanceIndexable } from './types';

import {
  TokenPickerContainer,
  SearchWrapper,
  TokenList,
} from './TokenPicker.styled';

const TokenPicker: React.FC<TokenPickerProps> = ({
  walletAddress,
  isOpen,
  onSelect,
  onClose,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { t } = useTranslation();
  const { account } = useWeb3React();
  const { data } = useAllERC20Balances(walletAddress || account);

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
        id: token?.address,
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
          {(searchQuery ? searchResults : data)?.slice(0, 4).map(token => (
            <TokenListItem
              key={token.address}
              token={token}
              onSelect={() => onSelect(token.address)}
            />
          ))}
        </TokenList>
      </TokenPickerContainer>
    </Modal>
  );
};

export default TokenPicker;
