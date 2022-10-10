import { Avatar } from 'components/Avatar';
import useENSAvatar from 'hooks/Guilds/ens/useENSAvatar';
import { FiArrowRight } from 'react-icons/fi';
import { MAINNET_ID, shortenAddress } from 'utils';
import { ActionViewProps } from '..';
import { Segment } from '../common/infoLine';
import { ReactComponent as Mint } from 'assets/images/mint.svg';
import useBigNumberToNumber from 'hooks/Guilds/conversions/useBigNumberToNumber';
import { useTotalSupply } from 'Modules/Guilds/Hooks/useTotalSupply';
import { useTokenData } from 'Modules/Guilds/Hooks/useTokenData';
import { useTranslation } from 'react-i18next';
import { StyledMintIcon } from './styles';

const RepMintInfoLine: React.FC<ActionViewProps> = ({
  decodedCall,
  compact,
  noAvatar,
}) => {
  const { t } = useTranslation();

  const { data } = useTotalSupply({ decodedCall });
  const { tokenData } = useTokenData();

  const { ensName, imageUrl } = useENSAvatar(data?.toAddress, MAINNET_ID);

  const roundedRepAmount = useBigNumberToNumber(data?.amount, 16, 3);
  const roundedRepPercent =
    roundedRepAmount / tokenData?.totalSupply?.toNumber();

  return (
    <>
      <Segment>
        <StyledMintIcon src={Mint} />
      </Segment>
      <Segment>
        {!compact ? t('mint') : ''} {roundedRepPercent} %
      </Segment>
      <Segment>
        <FiArrowRight />
      </Segment>
      {noAvatar ? null : (
        <Segment>
          <Avatar
            defaultSeed={data?.toAddress}
            src={imageUrl}
            size={compact ? 14 : 24}
          />
        </Segment>
      )}
      <Segment>
        {ensName || shortenAddress(data?.toAddress, compact ? 2 : 2)}
      </Segment>
    </>
  );
};

export default RepMintInfoLine;
