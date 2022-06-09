import { Modal } from 'old-components/Guilds/common/Modal';
import { Option, PickerProps } from './types';
import { MainWrapper, OptionList, SearchWrapper } from './Picker.styled';
import { OptionListItem } from './OptionListItem';
import { useEffect, useMemo, useState } from 'react';
import useMiniSearch from 'hooks/useMiniSearch';
import Input from 'old-components/Guilds/common/Form/Input';
import { FiSearch } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';

const Picker: React.FC<PickerProps> = ({
  data,
  isOpen,
  onSelect,
  onClose,
  searchConfig,
  numberOfVisibleItems,
}) => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');

  const defaultSearchConfig = {
    fields: ['title', 'subtitle', 'value'],
    searchOptions: {
      fuzzy: 2,
      prefix: true,
    },
  };

  const { instance, buildIndex, query } = useMiniSearch<Option>(
    searchConfig ? searchConfig : defaultSearchConfig
  );

  useEffect(() => {
    if (instance?.documentCount !== data?.length) {
      buildIndex(data);
    }
  }, [data, buildIndex, instance]);

  const searchResults = useMemo(() => {
    if (!searchQuery) return [];

    return query({ queries: [searchQuery] });
  }, [searchQuery, query]);

  return (
    <Modal
      header={'Some header'}
      isOpen={isOpen}
      onDismiss={onClose}
      maxWidth={390}
    >
      <MainWrapper>
        <SearchWrapper>
          <Input
            icon={<FiSearch />}
            placeholder={t('search')}
            value={searchQuery}
            onChange={e => setSearchQuery(e?.target?.value)}
          />
        </SearchWrapper>
        <OptionList>
          {(searchQuery ? searchResults : data)
            .slice(0, numberOfVisibleItems ? numberOfVisibleItems : undefined)
            .map((option, index) => (
              <OptionListItem
                key={index}
                item={option}
                onSelect={() => onSelect(option)}
              />
            ))}
        </OptionList>
      </MainWrapper>
    </Modal>
  );
};

export default Picker;

// TODO: Handle long lists of items
