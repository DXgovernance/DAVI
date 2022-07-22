import { Segment } from '../common/infoLine';
import { MdArrowRightAlt } from 'react-icons/md';
import ENSIcon from 'assets/images/ens.svg';
import { useUpdateEnsName } from 'hooks/Guilds/guild/useUpdateEnsName';
import { StyledENSIcon } from './styles';
import useENSAvatar from 'hooks/Guilds/ether-swr/ens/useENSAvatar';
import { MAINNET_ID } from 'utils';
import Avatar from 'old-components/Guilds/Avatar';
import { shortenAddress } from 'utils';
import { ActionViewProps } from '..';
import { useTranslation } from 'react-i18next';

const UpdateENSNameInfoLine: React.FC<ActionViewProps> = ({ decodedCall, compact }) => {
  const { parsedData } = useUpdateEnsName({ decodedCall });
  const { ensName, imageUrl } = useENSAvatar(parsedData?.from, MAINNET_ID);
  const { t } = useTranslation();

  return (
    <>
      <Segment>
        <StyledENSIcon src={ENSIcon} />
      </Segment>
      <Segment>{!compact ? t('ensName.updateContent') : ''}</Segment>
      <Segment>
        <MdArrowRightAlt />
      </Segment>
      <Segment>
      <Avatar
          defaultSeed={parsedData?.from}
          src={imageUrl}
          size={compact ? 14 : 24}
        />
      </Segment>
      <Segment>
        {ensName ||
          (parsedData?.from
            ? shortenAddress(parsedData?.from, compact ? 2 : 4)
            : '')}
      </Segment>
    </>
  );
};

export default UpdateENSNameInfoLine;
