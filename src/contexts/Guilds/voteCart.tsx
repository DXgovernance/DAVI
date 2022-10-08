import { createContext, useContext, useState } from 'react';
import MerkleTree from 'merkletreejs';
import { BigNumber } from 'ethers';
import { Proposal } from 'types/types.guilds.d';
// import { ERC20Guild } from 'types/contracts';
import { utils } from 'ethers';
import { Buffer } from 'buffer';
import { useSignMessage } from 'wagmi';

// import { voteOnProposal, confirmVoteProposal } from './utils';
// import ERC20Guild from 'contracts/BaseERC20Guild.json';
// import { useTypedParams } from 'Modules/Guilds/Hooks/useTypedParams';
import { toast } from 'react-toastify';
// import { Multicall } from 'ethereum-multicall';
// import { useProvider } from 'wagmi';
// import config from 'configs/localhost/config.json';
import { Modal } from 'components/primitives/Modal';
import { RiDeleteBin2Line } from 'react-icons/ri';
import { Button } from 'components/primitives/Button';

interface Vote {
  voter: string;
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
  const [voteData, setVoteData] = useState(null);

  const { signMessage } = useSignMessage({
    onSuccess: sig => {
      executeSignedVotes(sig);
    },
  });
  // const provider = useProvider();

  const addVote = ({
    voter,
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
      voter,
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

  const setData = () => {
    if (votes.length === 0) {
      toast.error('No votes in cart');
    }

    const _votes = votes.map(
      ({ voter, proposal, selectedOption, votingPower }) => {
        const str = JSON.stringify({
          voter,
          proposalId: proposal.id,
          option: selectedOption.toString(),
          votingPower: votingPower.toString(),
        });
        const hash = utils.keccak256(Buffer.from(str));

        return {
          voteInfo: {
            voter,
            proposalId: proposal.id,
            option: selectedOption.toString(),
            votingPower: votingPower.toString(),
          },
          hash,
        };
      }
    );

    const leaves = _votes.map(vote => vote.hash);
    const tree = new MerkleTree(leaves, utils.keccak256, { sort: true });
    const root = tree.getHexRoot();

    const result = {
      root,
      data: _votes.map((vote, idx) => {
        const proof = tree.getHexProof(leaves[idx]);
        // console.log('proof', proof);
        // console.log('verified? ', tree.verify(proof, vote.hash, root));
        return {
          ...vote,
          proof,
        };
      }),
    };

    console.log(result);
    setVoteData(result);
  };

  const executeSignedVotes = sig => {
    console.log({
      ...voteData,
      signature: sig,
    });
  };
  const confirmVote = async () => {
    setData();
    signMessage({ message: voteData?.root });
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
              <Button variant="primary" onClick={confirmVote}>
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

