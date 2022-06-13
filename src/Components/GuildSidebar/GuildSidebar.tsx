import dxIcon from 'assets/images/dxdao-icon.svg';
import { Loading } from 'Components/Primitives/Loading';
import { useTranslation } from 'react-i18next';
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

export interface GuildSidebarProps {
  guildName?: string;
  numberOfMembers?: number;
  actions?: React.ReactNode;
}

export const GuildSidebar: React.FC<GuildSidebarProps> = ({
  guildName,
  numberOfMembers,
  actions,
}) => {
  const { t } = useTranslation();

  return (
    <SidebarWrapper data-testid="sidebar">
      <DaoInfoPanel>
        <DaoInfo>
          <DaoBrand>
            <DaoIcon src={dxIcon} alt={guildName} />

            <DaoTitle size={2} as="h1">
              {guildName || <Loading loading text />}
            </DaoTitle>
          </DaoBrand>
          <DaoMemberCount>
            {numberOfMembers != null ? (
              t('members', {
                count: numberOfMembers,
              })
            ) : (
              <Loading loading text />
            )}
          </DaoMemberCount>
        </DaoInfo>
        {actions}
      </DaoInfoPanel>
      <SidebarMenu>
        <SidebarMenuItem href="#">{t('proposals')}</SidebarMenuItem>
        <SidebarMenuItem href="#">{t('members')}</SidebarMenuItem>
        <SidebarMenuItem href="#">{t('portfolio')}</SidebarMenuItem>
        <SidebarMenuItem href="#">{t('settings')}</SidebarMenuItem>
      </SidebarMenu>
    </SidebarWrapper>
  );
};
