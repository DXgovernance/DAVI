import dxIcon from 'assets/images/dxdao-icon.svg';
import { UnstyledLink } from 'components/primitives/Links';
import { Loading } from 'components/primitives/Loading';
import { useTypedParams } from 'Modules/Guilds/Hooks/useTypedParams';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { MdOutlinePeopleAlt } from 'react-icons/md';
import { Label } from 'components/SidebarInfoCard/SidebarInfoCard.styled';
import {
  DaoBrand,
  DaoIcon,
  DaoInfo,
  DaoInfoPanel,
  DaoMemberCount,
  DaoTitle,
  MemberIconWrapper,
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
    allProposals: `/${chainName}/${guildId}/all-proposals`,
  };
  return (
    <SidebarWrapper data-testid="sidebar">
      <DaoInfoPanel>
        <DaoMemberCount>
          {numberOfMembers != null ? (
            <MemberIconWrapper>
              <MdOutlinePeopleAlt size={26} />
              <Label>{numberOfMembers.toString()}</Label>
            </MemberIconWrapper>
          ) : (
            <Loading loading text />
          )}
        </DaoMemberCount>
        <DaoInfo>
          <DaoBrand>
            <DaoIcon src={dxIcon} alt={guildName} />

            <DaoTitle size={2} as="h1">
              {guildName || <Loading loading text />}
            </DaoTitle>
          </DaoBrand>
        </DaoInfo>
        {actions}
      </DaoInfoPanel>
      <SidebarMenu>
        <UnstyledLink data-testid="governance-page" to={locations.governance}>
          <SidebarMenuItem current={pathname === locations.governance}>
            {t('governance')}
          </SidebarMenuItem>
        </UnstyledLink>
        <UnstyledLink
          data-testid="all-proposals-page"
          to={locations.allProposals}
        >
          <SidebarMenuItem current={pathname === locations.allProposals}>
            {t('allProposals')}
          </SidebarMenuItem>
        </UnstyledLink>
        <SidebarMenuItem>{t('settings')}</SidebarMenuItem>
      </SidebarMenu>
    </SidebarWrapper>
  );
};
