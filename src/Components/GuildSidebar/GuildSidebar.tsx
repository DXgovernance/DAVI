import dxIcon from 'assets/images/dxdao-icon.svg';
import UnstyledLink from 'Components/Primitives/Links/UnstyledLink';
import { Loading } from 'Components/Primitives/Loading';
import { useTypedParams } from 'Modules/Guilds/Hooks/useTypedParams';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
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
  let { chainName, guildId } = useTypedParams();
  const { pathname } = useLocation();

  const locations = {
    governance: `/${chainName}/${guildId}`,
    allProposals: `/${chainName}/${guildId}/allProposals`,
  };

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
        <UnstyledLink to={locations.governance}>
          <SidebarMenuItem current={pathname === locations.governance}>
            {t('governance')}
          </SidebarMenuItem>
        </UnstyledLink>
        <UnstyledLink to={locations.allProposals}>
          <SidebarMenuItem current={pathname === locations.allProposals}>
            {t('proposals_all')}
          </SidebarMenuItem>
        </UnstyledLink>
        <SidebarMenuItem>{t('settings')}</SidebarMenuItem>
      </SidebarMenu>
    </SidebarWrapper>
  );
};
