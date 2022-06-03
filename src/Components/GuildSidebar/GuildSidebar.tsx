import dxIcon from 'assets/images/dxdao-icon.svg';
import { useGuildConfig } from 'hooks/Guilds/ether-swr/guild/useGuildConfig';
import { useVotingPowerOf } from 'hooks/Guilds/ether-swr/guild/useVotingPowerOf';
import { GuestActions } from './GuestActions';
import { MemberActions } from './MemberActions';
import { useWeb3React } from '@web3-react/core';
import { useTypedParams } from 'Modules/Guilds/Hooks/useTypedParams';
import useGuildMemberTotal from 'hooks/Guilds/ether-swr/guild/useGuildMemberTotal';
import {
  DaoBrand,
  DaoIcon,
  DaoInfo,
  DaoInfoPanel,
  DaoMemberCount,
  DaoTitle,
  SidebarMenu,
  SidebarMenuItem,
  SidebarWrapper,
} from './GuildSidebar.styled';

export const GuildSidebar = () => {
  const { account: userAddress } = useWeb3React();
  const { guildId: guildAddress } = useTypedParams();
  const { data } = useGuildConfig(guildAddress);
  const { data: numberOfMembers } = useGuildMemberTotal(guildAddress);

  const { data: votingPower } = useVotingPowerOf({
    contractAddress: guildAddress,
    userAddress,
  });

  return (
    <SidebarWrapper data-testid="sidebar">
      <DaoInfoPanel>
        <DaoInfo>
          <DaoBrand>
            <DaoIcon src={dxIcon} alt={'DXdao Logo'} />

            <DaoTitle size={2} as="h1">
              {data?.name}
            </DaoTitle>
          </DaoBrand>
          <DaoMemberCount>{numberOfMembers?.toString()} Members</DaoMemberCount>
        </DaoInfo>
        {votingPower && !votingPower?.isZero() ? (
          <MemberActions />
        ) : (
          <GuestActions />
        )}
      </DaoInfoPanel>
      <SidebarMenu>
        <SidebarMenuItem href="#">Proposals</SidebarMenuItem>
        <SidebarMenuItem href="#">Members</SidebarMenuItem>
        <SidebarMenuItem href="#">Portfolio</SidebarMenuItem>
        <SidebarMenuItem href="#">Settings</SidebarMenuItem>
      </SidebarMenu>
    </SidebarWrapper>
  );
};
