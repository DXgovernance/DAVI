import { GuildSidebarProps } from './GuildSidebar';

const TestDiv = () => <div>Test</div>;

export const withData: GuildSidebarProps = {
  guildName: 'Test Guild',
  numberOfMembers: 10,
  actions: TestDiv(),
};
