import React, { useContext, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { FiArrowLeft } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';

import { Button } from 'components/Primitives/Button';
import { Loading } from 'components/Primitives/Loading';
import { useNavigate, useLocation } from 'react-router-dom';
import StyledIcon from 'components/Primitives/SVG';
import { Heading } from 'components/Primitives/Typography';
import { useTypedParams } from 'Modules/Guilds/Hooks/useTypedParams';
import { GuildAvailabilityContext } from 'contexts/Guilds/guildAvailability';
import { ProposalTypeDescriptionProps, ProposalTypesProps } from './types';
import { ProposalTypeDescription } from './components';
import {
  Container,
  PaddingWrapper,
  Backdrop,
  Wrapper,
  Header,
  HeaderWrap,
  ContentWrapper,
  Footer,
  TitleWrapper,
  ContainerHeader,
  ProposalTypeButton,
  ButtonFooter,
  CloseIcon,
} from './ProposalTypes.styled';

const ProposalTypes: React.FC<ProposalTypesProps> = ({ data }) => {
  const { guildId, chainName: chain } = useTypedParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoading: isGuildAvailabilityLoading } = useContext(
    GuildAvailabilityContext
  );
  const [proposalDescription, setProposalDescription] =
    useState<ProposalTypeDescriptionProps>(data[0]);

  const continueUrl = location.pathname.replace(
    '/proposalType',
    `/create/${proposalDescription.title}`
  );

  if (isGuildAvailabilityLoading) return <Loading loading />;

  return (
    <Backdrop>
      <Wrapper>
        {isMobile ? (
          <Header onClick={() => navigate(`/${chain}/${guildId}`)}>
            <HeaderWrap>
              <StyledIcon src={FiArrowLeft} />
              {t('backToOverview')}
            </HeaderWrap>
            <StyledIcon src={CloseIcon} />
          </Header>
        ) : (
          <Header>
            <Button
              variant="secondary"
              onClick={() => navigate(`/${chain}/${guildId}`)}
            >
              <StyledIcon margin="0 10px 0 0" src={AiOutlineArrowLeft} />
              {t('backToOverview')}
            </Button>
          </Header>
        )}
        <ContentWrapper>
          <TitleWrapper>
            <Heading size={2}>{t('createProposal')}</Heading>
          </TitleWrapper>
          <Container>
            <PaddingWrapper data-testid="proposal-types-list">
              <ContainerHeader>{t('chooseProposal')}</ContainerHeader>
              {data.map(({ title, description, onChainAction, icon }) => (
                <ProposalTypeButton
                  key={title}
                  variant="secondary"
                  onClick={() =>
                    setProposalDescription({
                      title: title,
                      description: description,
                      onChainAction: onChainAction,
                    })
                  }
                >
                  {icon && <StyledIcon src={icon} />}
                  {title}
                </ProposalTypeButton>
              ))}
            </PaddingWrapper>
          </Container>

          <ProposalTypeDescription
            title={proposalDescription.title}
            description={proposalDescription.description}
            onChainAction={proposalDescription.onChainAction}
            data-testid="proposal-type-description"
          />
        </ContentWrapper>
        <Footer>
          <ButtonFooter
            variant="primary"
            onClick={() => navigate(continueUrl)}
            data-testid="proposal-type-continue-button"
          >
            {t('continue')}
          </ButtonFooter>
        </Footer>
      </Wrapper>
    </Backdrop>
  );
};

export default ProposalTypes;
