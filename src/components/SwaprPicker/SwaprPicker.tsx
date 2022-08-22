import { Picker } from 'components/Primitives/Forms/Picker';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TransparentButton } from './SwaprPicker.styled';
import { SwaprPickerProps } from './types';
import AddressButton from 'components/AddressButton/AddressButton';
import { Loading } from 'components/Primitives/Loading';
import moment from 'moment';
import { useSwaprFetchPairs } from 'hooks/Guilds/useSwaprFetchPairs';
import { SwaprFetchPairsInterface } from 'hooks/Guilds/useSwaprFetchPairs';
import { useNetwork } from 'wagmi';

const SwaprPicker: React.FC<SwaprPickerProps> = ({ value, onChange }) => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [swaprPairsFetchedData, setSwaprPairsFetchedData] = useState<
    SwaprFetchPairsInterface[]
  >([]);
  const [errorFetchingData, setErrorFetchingData] = useState(null);

  const { chain } = useNetwork();
  const currentUnixTimestamp = moment().unix();
  const userId = '';
  const pageSize = 1000;
  const lastId = '';

  let data = useSwaprFetchPairs(
    chain?.id,
    currentUnixTimestamp,
    userId,
    pageSize,
    lastId
  );

  useEffect(() => {
    async function assignData() {
      data.then(response => {
        setSwaprPairsFetchedData(response[0]);
        setErrorFetchingData(response[1]);
      });
    }
    assignData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const parsedPairs = useMemo(() => {
    if (swaprPairsFetchedData !== undefined) {
      return swaprPairsFetchedData.map(pair => {
        return {
          ...pair,
          title: `${pair?.token0.symbol} - ${pair?.token1.symbol}`,
          subtitle: `${pair?.token0.name} - ${pair?.token1.name}`,
        };
      });
    }
    return [];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const onSelect = value => {
    onChange(value.address);
    setIsModalOpen(false);
  };

  if (errorFetchingData) {
    return (
      <TransparentButton
        variant="secondary"
        aria-label="Skeleton loading button"
        type="button"
      >
        {errorFetchingData}
      </TransparentButton>
    );
  }

  if (swaprPairsFetchedData === undefined)
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
          aria-label="Swapr picker button"
          type="button"
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
