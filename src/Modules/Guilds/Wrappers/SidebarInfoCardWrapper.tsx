import { useTypedParams } from 'Modules/Guilds/Hooks/useTypedParams';
import { useGuildConfig } from 'hooks/Guilds/ether-swr/guild/useGuildConfig';
import useVotingPowerPercent from 'hooks/Guilds/guild/useVotingPowerPercent';
import useTotalLocked from 'hooks/Guilds/ether-swr/guild/useTotalLocked';
import { SidebarInfoCard } from 'components/SidebarInfoCard';

const SidebarInfoCardWrapper = () => {
  const { guildId } = useTypedParams();
  const { data: config } = useGuildConfig(guildId);
  const { data: totalLocked } = useTotalLocked(guildId);
  const quorum = useVotingPowerPercent(
    config?.votingPowerForProposalExecution,
    totalLocked
  );
  return (
    <SidebarInfoCard proposalTime={config?.proposalTime} quorum={quorum} />
  );
};

export default SidebarInfoCardWrapper;
