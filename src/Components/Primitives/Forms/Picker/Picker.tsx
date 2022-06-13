import { Modal } from 'old-components/Guilds/common/Modal';
import { OptionWithId, PickerProps } from './types';
import { MainWrapper, OptionList, SearchWrapper } from './Picker.styled';
import { OptionListItem } from './OptionListItem';
import { useEffect, useMemo, useState } from 'react';
import useMiniSearch from 'hooks/useMiniSearch';
import Input from 'old-components/Guilds/common/Form/Input';
import { FiSearch } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';

const Picker: React.FC<PickerProps> = ({
  data,
  header,
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

  // Check data for ID field. If it doesn't have one, populate it with the array index
  const dataWithId: OptionWithId[] = useMemo(() => {
    return data.map((item, index) => {
      return {
        ...item,
        id: item.id ? item.id : index.toString(),
      };
    });
  }, [data]);

  const { instance, buildIndex, query } = useMiniSearch<OptionWithId>(
    searchConfig ? searchConfig : defaultSearchConfig
  );

  useEffect(() => {
    if (instance?.documentCount !== dataWithId?.length) {
      buildIndex(dataWithId);
    }
  }, [dataWithId, buildIndex, instance]);

  const searchResults = useMemo(() => {
    if (!searchQuery) return [];

    return query({ queries: [searchQuery] });
  }, [searchQuery, query]);

  return (
    <Modal header={header} isOpen={isOpen} onDismiss={onClose} maxWidth={390}>
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
          {(searchQuery ? searchResults : dataWithId)
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
