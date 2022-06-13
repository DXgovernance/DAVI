import { Picker } from 'Components/Primitives/Forms/Picker';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { dummyData } from './dummyData';
import { TransparentButton } from './SwaprPicker.styled';
import { SwaprPickerProps } from './types';
import AddressButton from 'Components/AddressButton/AddressButton';

const SwaprPicker: React.FC<SwaprPickerProps> = ({ value, onChange }) => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  let data = dummyData.pairs;

  const parsedPairs = useMemo(() => {
    return data.map(pair => {
      return {
        ...pair,
        title: `${pair?.token0.name}-${pair?.token1.name}`,
      };
    });
  }, [data]);

  const onSelect = value => {
    onChange(value.address);
    setIsModalOpen(false);
  };

  return (
    <>
      {value === '' ? (
        <TransparentButton
          variant="secondary"
          onClick={() => setIsModalOpen(true)}
          aria-label="Duration picker button"
          type="button"
        >
          {value}
        </TransparentButton>
      ) : (
        <AddressButton
          address={value}
          onClick={() => setIsModalOpen(true)}
          showFullAddress={true}
        />
      )}
      <Picker
        data={parsedPairs}
        header={t('pickSwaprPair')}
        isOpen={isModalOpen}
        onSelect={onSelect}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default SwaprPicker;
