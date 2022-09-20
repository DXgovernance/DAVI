import { createContext, useContext, useState } from 'react';
import { BigNumber } from 'ethers';
import { useTransactions } from 'contexts/Guilds/transactions';
import { Proposal } from 'types/types.guilds.d';
// import { voteOnProposal, confirmVoteProposal } from './utils';
import ERC20Guild from 'contracts/BaseERC20Guild.json';
// import { useTypedParams } from 'Modules/Guilds/Hooks/useTypedParams';
import { toast } from 'react-toastify';
import { Multicall } from 'ethereum-multicall';
import { useProvider } from 'wagmi';
import config from 'configs/localhost/config.json';
import { Modal } from 'components/primitives/Modal';
import { RiDeleteBin2Line } from 'react-icons/ri';
import { Button } from 'components/primitives/Button';

interface Vote {
  proposal: Proposal;
  selectedOption: BigNumber;
  votingPower: BigNumber;
  contractAddress: string;
  optionLabel: string;
}

interface VoteCartContextReturn {
  votes: Vote[];
  addVote: (vote: Vote) => void;
  confirmVote: () => void;
  openVoteCart: () => void;
  closeVoteCart: () => void;
}

const VoteCartContext = createContext<VoteCartContextReturn>(null);

export const VoteCartProvider = ({ children }) => {
  const [votes, setVotes] = useState<any[]>([]);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const { createTransaction } = useTransactions();

  const provider = useProvider();

  const addVote = ({
    proposal,
    selectedOption,
    votingPower,
    contractAddress,
    optionLabel,
  }: Vote) => {
    if (votes.some(vote => vote.proposal.id === proposal.id)) {
      toast.error('You already added a vote for this proposal');
      return;
    }
    const newVote = {
      proposal,
      selectedOption,
      votingPower,
      contractAddress,
      optionLabel,
    };

    setVotes(v => [...v, newVote]);
    // toast.success(`Added your vote for proposal ${proposal.title}`);
    setModalOpen(true);
    setTimeout(() => {
      setModalOpen(false);
    }, 2000);
  };

  const removeVote = voteToDelete => {
    const newVotes = votes.reduce((accumulator, vote) => {
      if (voteToDelete.proposal.id === vote.proposal.id) return accumulator;
      return [...accumulator, vote];
    }, []);
    setVotes(newVotes);
  };

  const confirmVote = async () => {
    if (votes.length === 0) {
      toast.error('No votes in cart');
    }

    const contractCall = {
      reference: 'upV2Controller',
      contractAddress: '0xE9bDaB08f2FBb370d2a6F6661a92d9B6157E9fd2', //guild
      abi: ERC20Guild.abi,
      calls: votes.map(
        ({ proposal, selectedOption, votingPower, contractAddress }) => {
          return {
            contractAddress,
            reference: 'setVote',
            methodName: 'setVote',
            methodParameters: [
              proposal.id,
              selectedOption.toString(),
              votingPower.toString(),
            ],
          };
        }
      ),
    };

    try {
      const multicall = new Multicall({
        ethersProvider: provider,
        tryAggregate: false,
        multicallCustomContractAddress: config.contracts.utils.multicall,
      });

      console.info({ multicall, contractCall });
      const results = await multicall.call(contractCall);
      console.log('contractCall success', results);
    } catch (e) {
      console.log('contractCall error', e);
    }
  };

  const confirmVote2 = async () => {
    createTransaction(
      `MultiVote`,
      async () =>
        new Promise(res => {
          setTimeout(res, 2000);
        }),
      true
    );
  };
  return (
    <VoteCartContext.Provider
      value={{
        votes,
        addVote,
        confirmVote,
        openVoteCart: () => setModalOpen(true),
        closeVoteCart: () => setModalOpen(false),
      }}
    >
      {children}
      <Modal
        isOpen={isModalOpen}
        onDismiss={() => setModalOpen(false)}
        header="Vote Cart Modal"
        // hideHeader?: boolean;
        // confirmText?: string;
        // cancelText?: string;
        // onConfirm?: () => void;
        // onCancel?: () => void;
        // maxWidth?: number;
        cross
        // zIndex?: number;
        // backnCross?: boolean;
        // prevContent?: () => void;
        // leftIcon?: boolean;
        // dataTestId?: string;
      >
        <div
          style={{
            margin: 16,
          }}
        >
          {!votes.length && <div>No votes added to the cart. Start voting</div>}
          {votes.length > 0 &&
            votes?.map(vote => {
              return (
                <div
                  style={{
                    padding: 10,
                    border: '1px solid #2f3136',
                    borderRadius: 4,
                    position: 'relative',
                  }}
                >
                  <h3>Proposal: "{vote.proposal.title}"</h3>
                  <p>Voted for option "{vote.optionLabel}"</p>
                  <RiDeleteBin2Line
                    size={18}
                    style={{
                      position: 'absolute',
                      top: 10,
                      right: 10,
                      cursor: 'pointer',
                    }}
                    onClick={() => removeVote(vote)}
                  />
                </div>
              );
            })}
          {votes.length > 0 && (
            <div>
              <Button variant="secondary" onClick={() => setVotes([])}>
                Clear all votes
              </Button>
              <Button variant="primary" onClick={confirmVote2}>
                Confirm MultiVote
              </Button>
            </div>
          )}
        </div>
      </Modal>
    </VoteCartContext.Provider>
  );
};

export const useVoteCart = () => useContext(VoteCartContext);

