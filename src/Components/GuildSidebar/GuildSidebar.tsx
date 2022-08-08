import dxIcon from 'assets/images/dxdao-icon.svg';
import UnstyledLink from 'Components/Primitives/Links/UnstyledLink';
import { Loading } from 'Components/Primitives/Loading';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { navigateUrl } from 'utils';
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
  let { chainName, guildId } = useParams<{
    chainName: string;
    guildId: string;
  }>();

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
        <UnstyledLink to={`/${chainName}/${guildId}`}>
          <SidebarMenuItem>{t('governance')}</SidebarMenuItem>
        </UnstyledLink>
        <UnstyledLink to={location => navigateUrl(location, 'allproposals')}>
          <SidebarMenuItem href="#">{t('proposals_all')}</SidebarMenuItem>
        </UnstyledLink>
        <SidebarMenuItem href="#">{t('settings')}</SidebarMenuItem>
      </SidebarMenu>
    </SidebarWrapper>
  );
};
