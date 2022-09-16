import { useTypedParams } from 'Modules/Guilds/Hooks/useTypedParams';
import { useMemo } from 'react';
import { useAccount } from 'wagmi';
import { useGuildConfig } from 'Modules/Guilds/Hooks/useGuildConfig';
import { useVotingPowerOf } from 'Modules/Guilds/Hooks/useVotingPowerOf';

const useIsProposalCreationAllowed = () => {
  const { guildId } = useTypedParams();
  const { address } = useAccount();
  const { data: guildConfig } = useGuildConfig(guildId);
  const { data: votingPower } = useVotingPowerOf({
    contractAddress: guildId,
    userAddress: address,
  });

  const isProposalCreationAllowed = useMemo(() => {
    if (!guildConfig || !votingPower) {
      return false;
    }
    if (votingPower.gte(guildConfig.votingPowerForProposalCreation)) {
      return true;
    }
    return false;
  }, [votingPower, guildConfig]);

  return isProposalCreationAllowed;
};

export default useIsProposalCreationAllowed;
