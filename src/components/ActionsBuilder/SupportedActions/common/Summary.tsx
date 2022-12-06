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

  const isNativeTransfer = useMemo(
    () => decodedCall?.callType === SupportedAction.NATIVE_TRANSFER,
    [decodedCall?.callType]
  );

  const isRawTransaction = useMemo(
    () => decodedCall?.callType === SupportedAction.RAW_TRANSACTION,
    [decodedCall?.callType]
  );

  return (
    <>
      <DetailHeader>
        {isNativeTransfer ? t('transfer') : t('interactWith')}{' '}
        {!isNativeTransfer && parsedValueToString !== '0.0' ? (
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

      {!isRawTransaction && (
        <DetailRow>
          <DetailBody>
            <BlockExplorerLink address={decodedCall?.to} showAvatar />
          </DetailBody>
        </DetailRow>
      )}
    </>
  );
};

export default Summary;
