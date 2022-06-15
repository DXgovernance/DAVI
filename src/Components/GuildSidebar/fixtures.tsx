import { GuildSidebarProps } from './GuildSidebar';

export const withData: GuildSidebarProps = {
  guildName: 'Test Guild',
  numberOfMembers: 10,
  actions: () => <div>Test</div>,
};
