import { useMemo, useState } from 'react';
import { isDesktop, isMobile } from 'react-device-detect';
import { AiOutlineSearch } from 'react-icons/ai';
import { useHistory, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Button } from 'old-components/Guilds/common/Button';
import Input from 'old-components/Guilds/common/Form/Input';
import { FilterMenu, FilterButton } from './components';
import { useTypedParams } from 'Modules/Guilds/Hooks/useTypedParams';
import { useFilter } from 'contexts/Guilds/filters';
import { useGuildConfig } from 'hooks/Guilds/ether-swr/guild/useGuildConfig';
import { useVotingPowerOf } from 'hooks/Guilds/ether-swr/guild/useVotingPowerOf';
import {
  FilterContainer,
  FilterRow,
  ButtonContainer,
  StyledIconButton,
  StyledInputWrapper,
  FilterBadge,
} from './Filter.styled';
import { useAccount } from 'wagmi';

const Filter = () => {
  const { t } = useTranslation();
  const { guildId } = useTypedParams();
  const [viewFilter, setViewFilter] = useState(false);
  const { totalFilters, searchQuery, setSearchQuery } = useFilter();

  const history = useHistory();
  const location = useLocation();

  const { address } = useAccount();
  const { data: votingPower } = useVotingPowerOf({
    contractAddress: guildId,
    userAddress: address,
  });
  const { data: guildConfig } = useGuildConfig(guildId);
  const isProposalCreationAllowed = useMemo(() => {
    if (!guildConfig || !votingPower) {
      return false;
    }
    if (votingPower.gte(guildConfig.votingPowerForProposalCreation)) {
      return true;
    }
    return false;
  }, [votingPower, guildConfig]);
  const [openSearchBar, setOpenSearchBar] = useState(false);

  return (
    <FilterContainer>
      <FilterRow>
        {isMobile && !isProposalCreationAllowed && (
          <FilterButton onClick={() => setViewFilter(!viewFilter)}>
            {t('filter')}
            {totalFilters > 0 && <FilterBadge>{totalFilters}</FilterBadge>}
          </FilterButton>
        )}
        {isDesktop && <FilterMenu />}

        <ButtonContainer>
          <StyledIconButton
            variant="secondary"
            padding="0.4rem"
            onClick={() => setOpenSearchBar(!openSearchBar)}
          >
            <AiOutlineSearch size={20} />
          </StyledIconButton>
          {isProposalCreationAllowed && (
            <Button
              variant="secondary"
              onClick={() => history.push(location.pathname + '/proposalType')}
              data-testid="create-proposal-button"
            >
              {t('createProposal')}
            </Button>
          )}
        </ButtonContainer>
      </FilterRow>
      {isMobile && viewFilter && <FilterMenu />}
      {openSearchBar ? (
        <StyledInputWrapper>
          <Input
            value={searchQuery}
            onChange={e => {
              setSearchQuery(e.target.value);
            }}
            icon={<AiOutlineSearch size={24} />}
            placeholder={t('searchTitleEnsAddress')}
          />
        </StyledInputWrapper>
      ) : null}
    </FilterContainer>
  );
};

export default Filter;
