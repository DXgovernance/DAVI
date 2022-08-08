import { Box } from 'Components/Primitives/Layout';
import { useTypedParams } from 'Modules/Guilds/Hooks/useTypedParams';
import styled from 'styled-components';
import GuildSidebarWrapper from 'Modules/Guilds/Wrappers/GuildSidebarWrapper';
import AllProposals from './AllProposals';
import Governance from './Governance';

const PageContainer = styled(Box)`
  display: grid;
  grid-template-columns: 1fr;

  /* Medium devices (landscape tablets, 768px and up) */
  @media only screen and (min-width: 768px) {
    grid-template-columns: 300px minmax(0, 1fr);
  }
`;

const SidebarContent = styled(Box)`
  @media only screen and (min-width: 768px) {
    margin-right: 0.5rem;
  }
`;

const PageContent = styled(Box)`
  @media only screen and (min-width: 768px) {
    margin-left: 0.5rem;
  }
`;

interface GuildsPageProps {
  pageContent?: 'governance' | 'allProposals';
}

const GuildsPage: React.FC<GuildsPageProps> = ({
  pageContent = 'governance',
}) => {
  const { guildId } = useTypedParams();

  return (
    <PageContainer>
      <SidebarContent>
        <GuildSidebarWrapper />
      </SidebarContent>
      <PageContent>
        {pageContent}

        {pageContent === 'governance' && <Governance guildId={guildId} />}

        {pageContent === 'allProposals' && <AllProposals guildId={guildId} />}
      </PageContent>
    </PageContainer>
  );
};

export default GuildsPage;
