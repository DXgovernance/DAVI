import React, { useContext, useEffect, useState } from 'react';
import AddressButton from 'components/AddressButton/AddressButton';
import { ProposalDescription } from 'components/ProposalDescription';
import { UnstyledLink } from 'components/primitives/Links';
import { useTypedParams } from 'Modules/Guilds/Hooks/useTypedParams';
import { Loading } from 'components/primitives/Loading';
import { FaChevronLeft } from 'react-icons/fa';
import { useGuildConfig } from 'Modules/Guilds/Hooks/useGuildConfig';
import { IOrbisPost } from 'types/types.orbis';
import {
  HeaderTopRow,
  PageContainer,
  PageContent,
  PageHeader,
  PageTitle,
  StyledIconButton,
} from './Discussion.styled';
import { useTranslation } from 'react-i18next';
import { SidebarCard, SidebarCardHeaderSpaced } from 'components/SidebarCard';
import { Header as CardHeader } from 'components/Card';
import { Discussion } from 'components/Discussion';
import useDiscussionContext from 'Modules/Guilds/Hooks/useDiscussionContext';
import { OrbisContext } from 'contexts/Guilds/orbis';
import { StyledButton } from 'Modules/Guilds/styles';

const DiscussionPage: React.FC = () => {
  const { t } = useTranslation();
  const { chainName, guildId, discussionId } = useTypedParams();

  const [op, setOp] = useState<IOrbisPost>();

  const { data: guildConfig } = useGuildConfig(guildId);
  const { orbis } = useContext(OrbisContext);
  const { context } = useDiscussionContext(
    `DAVI-${guildId}-${discussionId}-discussions`
  );

  const getPost = async () => {
    const { data } = await orbis.getPost(discussionId);
    setOp(data);
  };

  useEffect(() => {
    getPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PageContainer>
      <PageContent>
        <PageHeader>
          <HeaderTopRow>
            <UnstyledLink to={`/${chainName}/${guildId}`}>
              <StyledIconButton variant="secondary" iconLeft>
                <FaChevronLeft style={{ marginRight: '15px' }} />{' '}
                {guildConfig?.name}
              </StyledIconButton>
            </UnstyledLink>

            <UnstyledLink
              to={`/${chainName}/${guildId}/create-proposal?ref=${discussionId}`}
            >
              <StyledButton
                variant="secondary"
                data-testid="create-proposal-button"
              >
                {t('createProposal')}
              </StyledButton>
            </UnstyledLink>
          </HeaderTopRow>
          <PageTitle>
            {op?.content?.title || (
              <Loading loading text skeletonProps={{ width: '800px' }} />
            )}
          </PageTitle>
        </PageHeader>

        <AddressButton address={op?.creator_details.metadata?.address} />

        <ProposalDescription
          metadata={{ description: op?.content?.body }}
          error={null}
        />

        <SidebarCard
          header={
            <SidebarCardHeaderSpaced>
              <CardHeader>{t('discussionTitle')}</CardHeader>
            </SidebarCardHeaderSpaced>
          }
        >
          <Discussion context={context} master={''} />
        </SidebarCard>
      </PageContent>
    </PageContainer>
  );
};

export default DiscussionPage;
