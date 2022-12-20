import { Avatar } from 'components/Avatar';
import useBigNumberToString from 'hooks/Guilds/conversions/useBigNumberToString';
import useENSAvatar from 'hooks/Guilds/ens/useENSAvatar';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { FiAlertCircle, FiArrowRight } from 'react-icons/fi';
import { getNetworkById, MAINNET_ID, shortenAddress } from 'utils';
import { useNetwork } from 'wagmi';
import { Segment } from 'components/ActionsBuilder/SupportedActions/common/infoLine';
import { RedWrapper } from './styles';

const UndecodableCallInfoLine = ({
  call,
  compact = false,
  noAvatar = false,
}) => {
  const parsedData = useMemo(() => {
    return {
      to: call?.to,
      value: call?.value,
      data: call?.data,
    };
  }, [call]);

  const { t } = useTranslation();
  const { ensName, imageUrl } = useENSAvatar(parsedData?.to, MAINNET_ID);
  const parsedValueToString = useBigNumberToString(parsedData?.value, 18);
  const { chain } = useNetwork();
  const nativeTokenSymbol = useMemo(() => {
    return getNetworkById(chain?.id).nativeAsset.symbol;
  }, [chain]);

  const hasData = useMemo(() => {
    if (!parsedData?.data || parsedData?.data.toString() === '0x00') {
      return false;
    }
    return true;
  }, [parsedData]);

  const hasValue = useMemo(() => {
    if (parsedData?.value && parsedData?.value.toString() === '0') {
      return false;
    }
    return true;
  }, [parsedData]);

  return (
    <RedWrapper>
      {hasData && (
        <Segment>
          <FiAlertCircle size={16} />
        </Segment>
      )}

      <Segment>
        {hasData && <Segment>{t('unknownAction')}</Segment>}
        {hasData && hasValue && <> + </>}
        {hasValue && (
          <>
            {parsedValueToString} {nativeTokenSymbol}
          </>
        )}
      </Segment>

      <Segment>
        <FiArrowRight />
      </Segment>

      {noAvatar ? null : (
        <Segment>
          <Avatar
            defaultSeed={parsedData?.to}
            src={imageUrl}
            size={compact ? 14 : 24}
          />
        </Segment>
      )}
      <Segment>
        {ensName ||
          (parsedData?.to && shortenAddress(parsedData?.to, compact ? 2 : 4))}
      </Segment>
    </RedWrapper>
  );
};

export default UndecodableCallInfoLine;
