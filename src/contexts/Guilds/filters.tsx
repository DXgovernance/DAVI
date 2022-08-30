import { createContext, useContext, useState, FC } from 'react';
import { useMenu } from '../../hooks/Guilds/useMenu';
import { Proposal, ProposalState } from 'types/types.guilds.d';
import { PointedDecodedAction } from 'hooks/Guilds/guild/useProposalSummaryActions';

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

  const regex = new RegExp('w*' + searchQuery + 'w*', 'gi');

  const matchTitle = (proposal: Proposal) => {
    if (!searchQuery) return true;
    if (proposal?.title) {
      return proposal.title.match(regex)?.length;
    }
    return false;
  };

  const matchCreatorAddress = (proposal: Proposal) => {
    if (!searchQuery) return true;
    if (proposal?.creator) {
      return proposal.creator.match(regex)?.length;
    }
    return false;
  };

  const matchRecipientAddresses = (proposal: Proposal) => {
    if (!searchQuery) return true;
    if (proposal?.to) {
      return proposal.to?.some(address => address.match(regex)?.length);
    }
    return false;
  };

  const matchState = (proposalState: ProposalState) =>
    countStateSelected ? filterState.includes(proposalState) : true;

  const matchActionType = (summaryActions: PointedDecodedAction[]) =>
    countActionTypeSelected
      ? summaryActions?.some(action =>
          filterActionTypes.includes(action.decodedCall?.callType)
        )
      : true;

  const matchCurrency = (summaryActions: PointedDecodedAction[]) =>
    countCurrencySelected
      ? summaryActions?.some(action =>
          filterCurrency.includes(action.decodedCall?.to)
        )
      : true;
  const matchSearch = (proposal: Proposal) =>
    searchQuery
      ? [matchTitle, matchCreatorAddress, matchRecipientAddresses].some(
          matcher => matcher(proposal)
        )
      : true;

  const match = (
    proposal: Proposal,
    proposalState: ProposalState,
    summaryActions: PointedDecodedAction[]
  ) => {
    return (
      matchState(proposalState) &&
      matchActionType(summaryActions) &&
      matchCurrency(summaryActions) &&
      matchSearch(proposal)
    );
  };

  const withFilters =
    (Component: FC<any>) =>
    (
      proposal: Proposal,
      proposalState: ProposalState,
      summaryActions: PointedDecodedAction[]
    ) => {
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
