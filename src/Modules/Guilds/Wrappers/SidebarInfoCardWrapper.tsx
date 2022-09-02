import { useTypedParams } from 'Modules/Guilds/Hooks/useTypedParams';
import { useGuildConfig } from 'Modules/Guilds/Hooks/useGuildConfig';
import useVotingPowerPercent from 'Modules/Guilds/Hooks/useVotingPowerPercent';
import useTotalLocked from 'Modules/Guilds/Hooks/useTotalLocked';
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
