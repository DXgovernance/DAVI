import { useTypedParams } from 'Modules/Guilds/Hooks/useTypedParams';
import { useGuildConfig } from 'hooks/Guilds/ether-swr/guild/useGuildConfig';
import useVotingPowerPercent from 'hooks/Guilds/guild/useVotingPowerPercent';
import { SidebarInfoCard } from 'Components/SidebarInfoCard';
const SidebarInfoCardWrapper = () => {
  const { guildId } = useTypedParams();
  const {
    data: { proposalTime, votingPowerForProposalExecution, totalLocked },
  } = useGuildConfig(guildId);

  const quorum = useVotingPowerPercent(
    votingPowerForProposalExecution,
    totalLocked
  );
  return <SidebarInfoCard proposalTime={proposalTime} quorum={quorum} />;
};

export default SidebarInfoCardWrapper;
