import { Picker } from 'Components/Primitives/Forms/Picker';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TransparentButton } from './SwaprPicker.styled';
import { SwaprPickerProps } from './types';
import AddressButton from 'Components/AddressButton/AddressButton';
import { useContext } from '../../contexts';
import { Loading } from 'Components/Primitives/Loading';
import moment from 'moment';

const SwaprPicker: React.FC<SwaprPickerProps> = ({ value, onChange }) => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    context: { subgraphService },
  } = useContext();
  const [swaprPairsFetchedData, setSwaprPairsFetchedData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getSwaprPairData = async () => {
    const currentUnixTimestamp = moment().unix();
    const pageSize = 1000;
    const data = await subgraphService.getSwaprPairs(
      currentUnixTimestamp,
      '',
      pageSize,
      ''
    );
    setSwaprPairsFetchedData(data);
    setIsLoading(false);
  };

  useEffect(() => {
    getSwaprPairData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const parsedPairs = useMemo(() => {
    return swaprPairsFetchedData?.map(pair => {
      return {
        ...pair,
        title: `${pair?.token0.symbol} - ${pair?.token1.symbol}`,
        subtitle: `${pair?.token0.name} - ${pair?.token1.name}`,
      };
    });
  }, [swaprPairsFetchedData]);

  const onSelect = value => {
    onChange(value.address);
    setIsModalOpen(false);
  };

  if (isLoading)
    return (
      <TransparentButton
        variant="secondary"
        aria-label="Skeleton loading button"
        type="button"
      >
        <Loading loading text />
      </TransparentButton>
    );

  return (
    <>
      {value === '' ? (
        <TransparentButton
          variant="secondary"
          onClick={() => setIsModalOpen(true)}
          aria-label="Swapr picker button"
          type="button"
        >
          {value}
        </TransparentButton>
      ) : (
        <AddressButton
          address={value}
          onClick={() => setIsModalOpen(true)}
          showFullAddress={true}
          aria-label="Swapr picker button"
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
