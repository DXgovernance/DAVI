import { ActionViewProps } from '..';
import { Segment } from '../common/infoLine';
import { DetailBody, DetailHeader, DetailRow } from '../common/summary';
import Avatar from 'old-components/Guilds/Avatar';
import { ParsedDataInterface } from './types';
import { useMemo } from 'react';
import useENSAvatar from 'hooks/Guilds/ether-swr/ens/useENSAvatar';
import { MAINNET_ID } from 'utils';
import { useTranslation } from 'react-i18next';

// TODO: What is the best way to display the information?

const SetPermissionsSummary: React.FC<ActionViewProps> = ({ decodedCall }) => {
  const { t } = useTranslation();

  const parsedData = useMemo<ParsedDataInterface>(() => {
    if (!decodedCall) return null;

    const { functionName } = decodedCall;
    const { asset, to, functionSignature, valueAllowed, allowance } =
      decodedCall.args;
    return {
      asset,
      to,
      functionSignature,
      valueAllowed,
      allowance,
      functionName,
    };
  }, [decodedCall]);

  const { ensName, imageUrl } = useENSAvatar(parsedData?.to[0], MAINNET_ID);

  return (
    <>
      <DetailHeader>{t('interactWith')}:</DetailHeader>

      <DetailRow>
        <DetailBody>
          <Segment>
            <Avatar defaultSeed={parsedData?.to[0]} src={imageUrl} size={24} />
          </Segment>
          <Segment>{ensName || parsedData?.to[0]}</Segment>
        </DetailBody>
      </DetailRow>
    </>
  );
};

export default SetPermissionsSummary;
