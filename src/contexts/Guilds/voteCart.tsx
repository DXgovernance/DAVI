import { createContext, useContext, useEffect, useState } from 'react';
import MerkleTree from 'merkletreejs';
import { BigNumber } from 'ethers';
import { Proposal } from 'types/types.guilds.d';
// import { ERC20Guild } from 'types/contracts';
import { utils } from 'ethers';
// import { useSignMessage } from 'wagmi';

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
import { OrbisContext } from './orbis';

import { connect, isConnected } from 'components/Forum';

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
  // const [voteData, setVoteData] = useState(null);

  const { orbis } = useContext(OrbisContext);

  // const { signMessage } = useSignMessage({
  //   onSuccess: sig => {
  //     executeSignedVotes(sig);
  //   },
  // });
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

  const populateData = () => {
    if (votes.length === 0) {
      toast.error('No votes in cart');
    }

    // Make array of vote hashes
    let arrayOfVoteHashes = votes.map(
      ({ voter, proposal, selectedOption, votingPower }) => {
        const dataToHash = [voter, proposal.id, selectedOption, votingPower];

        const hash = utils.solidityKeccak256(
          ['address', 'bytes32', 'uint256', 'uint256'],
          dataToHash
        );
        return hash;
      }
    );

    const leaves = arrayOfVoteHashes.map(voteHash => voteHash);
    const tree = new MerkleTree(leaves, utils.keccak256, { sort: true });
    const root = tree.getHexRoot();

    const arrayOfVotes = votes.map(
      ({ voter, proposal, selectedOption, votingPower }, index) => {
        let currentVoteHash = arrayOfVoteHashes[index];
        let result = {
          root: root,
          voter: voter,
          voteHash: currentVoteHash,
          proof: tree.getHexProof(currentVoteHash),
          proposalId: proposal.id,
          option: selectedOption,
          votingPower: votingPower,
        };
        console.log(result);
        return result;
      }
    );

    arrayOfVotes.forEach(vote => {
      createNewVote(vote);
    });

    // setVoteData(arrayOfVotes);
  };

  // const executeSignedVotes = sig => {
  //   console.log({
  //     ...voteData,
  //     signature: sig,
  //   });
  // };

  useEffect(() => {
    isConnected(orbis).then(res => {
      if (res) {
        console.log('Already connected with: ', res);
      } else {
        connect(orbis);
      }
    });
  }, [orbis]);

  const createNewVote = async vote => {
    let result = await orbis.createPost({
      body: 'hope this works',
      context: `signed-votes-${vote.proposalId}`,
      data: vote,
    });
    console.log('post created? i guess');
    console.log(result);
  };

  const confirmVote = async () => {
    // send to orbis
    populateData();
    setVotes([]);
    toast.success('votes signed');
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

