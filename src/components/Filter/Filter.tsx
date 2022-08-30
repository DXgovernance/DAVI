import { useState } from 'react';
import { isDesktop, isMobile } from 'react-device-detect';
import { AiOutlineSearch } from 'react-icons/ai';
import { useTranslation } from 'react-i18next';
import { Button } from 'components/primitives/Button';
import { Input } from 'components/primitives/Forms/Input';
import { FilterMenu, FilterButton } from './components';
import { useTypedParams } from 'Modules/Guilds/Hooks/useTypedParams';
import { useFilter } from 'contexts/Guilds/filters';
import {
  FilterContainer,
  FilterRow,
  ButtonContainer,
  StyledIconButton,
  StyledInputWrapper,
  FilterBadge,
} from './Filter.styled';
import { UnstyledLink } from 'components/primitives/Links';
import useIsProposalCreationAllowed from 'hooks/Guilds/useIsProposalCreationAllowed';

interface FilterProps {
  openSearchBar: boolean;
  setOpenSearchBar: (openSearchBar: boolean) => void;
}

export const Filter: React.FC<FilterProps> = ({
  openSearchBar,
  setOpenSearchBar,
}) => {
  const { t } = useTranslation();
  const { chainName, guildId } = useTypedParams();
  const [viewFilter, setViewFilter] = useState(false);
  const { totalFilters, searchQuery, setSearchQuery } = useFilter();
  const isProposalCreationAllowed = useIsProposalCreationAllowed();

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
            <>
              <UnstyledLink to={`/${chainName}/${guildId}/create-proposal`}>
                <Button
                  variant="secondary"
                  data-testid="create-proposal-button"
                >
                  {t('createProposal')}
                </Button>
              </UnstyledLink>
            </>
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
