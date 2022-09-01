import {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';
import { useMenu, UseMenuReturn } from 'hooks/Guilds/useMenu';
import { Proposal, ProposalState } from 'types/types.guilds.d';
import { DecodedAction, Option } from 'components/ActionsBuilder/types';

interface FiltersContextReturn extends UseMenuReturn {
  setSearchQuery: Dispatch<SetStateAction<string>>;
  searchQuery: string;
  withFilters: (
    component: JSX.Element
  ) => (
    proposal: Proposal,
    proposalState: ProposalState,
    options: Option[]
  ) => JSX.Element | null;
}

const FilterContext = createContext<FiltersContextReturn>(null);

export const FilterProvider = ({
  initialStates = [],
  initialTypes = [],
  initialCurrencies = [],
  children,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
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

  const matchActionType = (summaryActions: DecodedAction[]) =>
    countActionTypeSelected
      ? summaryActions?.some(action =>
          filterActionTypes.includes(action.decodedCall?.callType)
        )
      : true;

  const matchCurrency = (summaryActions: DecodedAction[]) =>
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
    actions: DecodedAction[]
  ) => {
    return (
      matchState(proposalState) &&
      matchActionType(actions) &&
      matchCurrency(actions) &&
      matchSearch(proposal)
    );
  };

  const withFilters =
    (Component: JSX.Element) =>
    (proposal: Proposal, proposalState: ProposalState, options: Option[]) => {
      const actions = options.map(option => option.decodedActions).flat();
      return match(proposal, proposalState, actions) ? Component : null;
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
