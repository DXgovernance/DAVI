import { createContext, useContext, useState } from 'react';
import { useMenu } from '../../hooks/Guilds/useMenu';
import { Proposal } from 'types/types.guilds.d';

const FilterContext = createContext(null);

export const FilterProvider = ({
  initialStates = [],
  initialTypes = [],
  initialCurrencies = [],
  children,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const filterData = useMenu({
    initialStates,
    initialTypes,
    initialCurrencies,
  });

  const {
    countStateSelected,
    filterState,
    countActionTypeSelected,
    filterActionTypes,
    countCurrencySelected,
    filterCurrency,
  } = filterData;

  const matchTitle = (proposal: Proposal, query) => {
    if (!query) return true;
    if (proposal?.title) {
      let reg = new RegExp('w*' + query + 'w*', 'gi');
      return proposal.title.match(reg)?.length;
    }
    return false;
  };

  const matchCreatorAddress = (proposal: Proposal, query) => {
    if (!query) return true;
    if (proposal?.creator) {
      let reg = new RegExp('w*' + query + 'w*', 'gi');
      return proposal.creator.match(reg)?.length;
    }
    return false;
  };

  const matchRecipientAddresses = (proposal: Proposal, query) => {
    if (!query) return true;
    if (proposal?.to) {
      let reg = new RegExp('w*' + query + 'w*', 'gi');
      return proposal.to?.some(address => address.match(reg)?.length);
    }
    return false;
  };

  const matchState = proposalState =>
    countStateSelected ? filterState.includes(proposalState) : true;

  const matchActionType = summaryActions =>
    countActionTypeSelected
      ? summaryActions?.some(action =>
          filterActionTypes.includes(action?.decodedCall?.callType)
        )
      : true;

  const matchCurrency = summaryActions =>
    countCurrencySelected
      ? summaryActions.some(action =>
          filterCurrency.includes(action.decodedCall?.to)
        )
      : true;
  const matchSearch = proposal =>
    searchQuery
      ? [matchTitle, matchCreatorAddress, matchRecipientAddresses].some(
          matcher => matcher(proposal, searchQuery)
        )
      : true;

  const match = (proposal, proposalState, summaryActions) => {
    return (
      matchState(proposalState) &&
      matchActionType(summaryActions) &&
      matchCurrency(summaryActions) &&
      matchSearch(proposal)
    );
  };

  const withFilters =
    Component => (proposal, proposalState, summaryActions) => {
      return match(proposal, proposalState, summaryActions) ? Component : null;
    };

  return (
    <FilterContext.Provider
      value={{
        ...filterData,
        setSearchQuery,
        searchQuery,
        withFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => useContext(FilterContext);
