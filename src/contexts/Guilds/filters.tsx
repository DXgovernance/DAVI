import { createContext, useContext } from 'react';
import { useMenu } from '../../hooks/Guilds/useMenu';
import { Proposal } from 'types/types.guilds.d';

const FilterContext = createContext(null);

export const FilterProvider = ({
  initialStates = [],
  initialTypes = [],
  initialCurrencies = [],
  children,
}) => {
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

  return (
    <FilterContext.Provider
      value={{
        ...useMenu({ initialStates, initialTypes, initialCurrencies }),
        matchTitle,
        matchCreatorAddress,
        matchRecipientAddresses,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => useContext(FilterContext);
