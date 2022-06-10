import { Picker } from 'Components/Primitives/Forms/Picker';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { dummyData } from './dummyData';

const SwaprPicker = () => {
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
    console.log(value);
  };

  return (
    <>
      <button type="button" onClick={() => setIsModalOpen(true)}>
        {t('pickSwaprPair')}
      </button>
      <Picker
        data={parsedPairs}
        header={'Pick swapr pair'}
        isOpen={isModalOpen}
        onSelect={onSelect}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default SwaprPicker;
