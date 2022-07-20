import { useTypedParams } from 'Modules/Guilds/Hooks/useTypedParams';
import { useGuildConfig } from 'hooks/Guilds/ether-swr/guild/useGuildConfig';
import useVotingPowerPercent from 'hooks/Guilds/guild/useVotingPowerPercent';
import useTotalLocked from 'hooks/Guilds/ether-swr/guild/useTotalLocked';
import { SidebarInfoCard } from 'Components/SidebarInfoCard';

const SidebarInfoCardWrapper = () => {
  const { guildId } = useTypedParams();
  const {
    data
  } = useGuildConfig(guildId);

  const { data: totalLocked } = useTotalLocked(guildId);

  const quorum = useVotingPowerPercent(
    data?.votingPowerForProposalExecution,
    totalLocked
  );
  return <SidebarInfoCard proposalTime={data?.proposalTime} quorum={quorum} />;
};

export default SidebarInfoCardWrapper;
