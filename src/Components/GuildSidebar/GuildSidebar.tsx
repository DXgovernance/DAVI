import dxIcon from 'assets/images/dxdao-icon.svg';
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

interface GuildSidebarProps {
  guildName: string;
  numberOfMembers: number;
  actions: React.ReactNode;
}

export const GuildSidebar: React.FC<GuildSidebarProps> = ({
  guildName,
  numberOfMembers,
  actions,
}) => {
  return (
    <SidebarWrapper>
      <DaoInfoPanel>
        <DaoInfo>
          <DaoBrand>
            <DaoIcon src={dxIcon} alt={'DXdao Logo'} />

            <DaoTitle size={2} as="h1">
              {guildName}
            </DaoTitle>
          </DaoBrand>
          <DaoMemberCount>{numberOfMembers?.toString()} Members</DaoMemberCount>
        </DaoInfo>
        {actions}
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
