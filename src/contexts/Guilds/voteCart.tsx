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
// import { RiDeleteBin2Line } from 'react-icons/ri';
import { MultiVoteModal } from 'components/MultiVoteModal';
import { OrbisContext } from './orbis';

import { connect, isConnected } from 'components/Forum';
import { useSignMessage } from 'wagmi';

export interface Vote {
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
  removeVote: (vote: Vote) => void;
}

const VoteCartContext = createContext<VoteCartContextReturn>(null);

export const VoteCartProvider = ({ children }) => {
  const [votes, setVotes] = useState<any[]>([]);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  // const [voteData, setVoteData] = useState(null);

  const { orbis } = useContext(OrbisContext);

  // const provider = useProvider();

  const { signMessage } = useSignMessage({
    onSuccess: signedMessage => {
      toast.success('votes signed');

      for (let i = 0; i < arrayOfVotes.length; i++) {
        let result = { ...arrayOfVotes[i], signature: signedMessage };
        console.log(result);
        debugger;
        createNewVote(result);
      }
    },
  });

  const [arrayOfVotes, setArrayOfVotes] = useState([]);

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

  const removeVote = (voteToDelete: Vote) => {
    const newVotes = votes.reduce((accumulator, vote) => {
      if (
        voteToDelete.proposal.id === vote.proposal.id &&
        voteToDelete.voter === vote.voter &&
        voteToDelete.optionLabel === vote.optionLabel
      )
        return accumulator;
      return [...accumulator, vote];
    }, []);
    setVotes(newVotes);
  };

  const populateData = async () => {
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

    const arrayOfVotes2 = votes.map(
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
        return result;
      }
    );

    setArrayOfVotes(arrayOfVotes2);

    signMessage({ message: root });
    // arrayOfVotes.forEach(vote => {
    //   createNewVote(vote);
    // });

    // setVoteData(arrayOfVotes);
  };

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
    console.log(result);
  };

  const confirmVote = async () => {
    // send to orbis
    populateData();
    setVotes([]);
  };
  return (
    <VoteCartContext.Provider
      value={{
        votes,
        addVote,
        confirmVote,
        openVoteCart: () => setModalOpen(true),
        closeVoteCart: () => setModalOpen(false),
        removeVote,
      }}
    >
      {children}
      <MultiVoteModal
        isModalOpen={isModalOpen}
        setModalOpen={setModalOpen}
        votes={votes}
        confirmVote={confirmVote}
        setVotes={setVotes}
        removeVote={removeVote}
      />
    </VoteCartContext.Provider>
  );
};

export const useVoteCart = () => useContext(VoteCartContext);

