import useBigNumberToString from 'hooks/Guilds/conversions/useBigNumberToString';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { getNetworkById, preventEmptyString } from 'utils';
import { useNetwork } from 'wagmi';
import {
  DetailBody,
  DetailHeader,
  DetailRow,
  RedHighlight,
} from './Summary.styled';
import { SummaryProps } from './types';
import { SupportedAction } from 'components/ActionsBuilder/types';
import { BlockExplorerLink } from 'components/primitives/Links';

const Summary = ({ decodedCall }: SummaryProps) => {
  const { t } = useTranslation();

  const parsedValueToString = useBigNumberToString(
    preventEmptyString(decodedCall?.value),
    18
  );
  const { chain } = useNetwork();
  const nativeTokenSymbol = useMemo(() => {
    return getNetworkById(chain?.id).nativeAsset.symbol;
  }, [chain]);

  return (
    <>
      <DetailHeader>
        {decodedCall?.callType === SupportedAction?.NATIVE_TRANSFER
          ? t('transfer')
          : t('interactWith')}{' '}
        {decodedCall?.callType !== SupportedAction?.NATIVE_TRANSFER &&
        parsedValueToString !== '0.0' ? (
          <RedHighlight>
            {parsedValueToString} {nativeTokenSymbol}
          </RedHighlight>
        ) : (
          <span>
            {parsedValueToString} {nativeTokenSymbol}
          </span>
        )}
        :
      </DetailHeader>

      <DetailRow>
        <DetailBody>
          <BlockExplorerLink address={decodedCall?.to} showAvatar />
        </DetailBody>
      </DetailRow>
    </>
  );
};

export default Summary;
