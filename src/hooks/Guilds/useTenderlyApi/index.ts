import { ethers } from 'ethers';
import { useWeb3React } from '@web3-react/core';
import useJsonRpcProvider from 'hooks/Guilds/web3/useJsonRpcProvider';
import { Call, Option } from 'Components/ActionsBuilder/types';

export const useTransactionSimulation = () => {
  const { chainId } = useWeb3React();
  const provider = useJsonRpcProvider(chainId);

  async function simulateTransactions(options: Option[]) {
    const [forkId, forkUrl] = await getForkData(chainId, provider);
    const forkRPC = `https://rpc.tenderly.co/fork/${forkId}`;
    const forkProvider = new ethers.providers.JsonRpcProvider(forkRPC);
    const forkStartingPoint = await forkProvider.send('evm_snapshot', []);

    // Tenderly simulation API requires to execute the simulations
    // serialized, that's why I used a for loop
    for (let i = 0; i < options.length; i++) {
      await forkProvider.send('evm_revert', [forkStartingPoint]); // Reset fork
      let currentOption = options[i];

      for (let j = 0; j < currentOption.actions.length; j++) {
        let currentAction = currentOption.actions[j];
        let simulationResult = await simulateAction(
          forkUrl,
          currentAction,
          chainId
        );
        currentOption.decodedActions[j].simulationResult =
          await simulationResult;
      }
    }

    //! Delete before PR
    deleteFork(forkId);

    return options;
  }

  return simulateTransactions;
};

const getForkData = async (chainId: number, provider) => {
  const {
    REACT_APP_TENDERLY_USER,
    REACT_APP_TENDERLY_PROJECT,
    REACT_APP_TENDERLY_ACCESS_KEY,
  } = process.env;

  let latestBlock = await provider.getBlockNumber();

  const createForkUrl = `https://api.tenderly.co/api/v1/account/${REACT_APP_TENDERLY_USER}/project/${REACT_APP_TENDERLY_PROJECT}/fork`;

  const headers = { 'X-Access-Key': REACT_APP_TENDERLY_ACCESS_KEY };

  const bodyData = {
    network_id: chainId.toString(),
    block_number: latestBlock,
  };

  try {
    const response = await fetch(createForkUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(bodyData),
    }).then(response => response.json());
    const forkId = response.simulation_fork.id;
    const forkUrl = `${createForkUrl}/${forkId}`;

    return [forkId, forkUrl];
  } catch (err) {
    return err;
  }
};

const simulateAction = async (
  forkUrl: string,
  action: Call,
  chainId: number
) => {
  const { REACT_APP_TENDERLY_ACCESS_KEY } = process.env;
  const simulationUrl = `${forkUrl}/simulate`;
  const network_id = chainId.toString();
  const { from, to, data: input } = action;

  const headers = { 'X-Access-Key': REACT_APP_TENDERLY_ACCESS_KEY };

  const body = {
    network_id,
    from,
    to,
    input,
    gas: 800000,
    gas_price: '0',
    value: 0,
    save_if_fails: true,
    save: true,
  };

  let simulationResult = await fetch(simulationUrl, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  }).then(response => response.json());

  console.log(simulationResult);

  return simulationResult;
};

// The deleteFork function is useful while developing
// to delete forks while manually testing

const deleteFork = async (forkId: string) => {
  const { REACT_APP_TENDERLY_PROJECT, REACT_APP_TENDERLY_ACCESS_KEY } =
    process.env;

  const forkUrl = `https://api.tenderly.co/api/v2/project/${REACT_APP_TENDERLY_PROJECT}/forks/${forkId}`;
  const headers = { 'X-Access-Key': REACT_APP_TENDERLY_ACCESS_KEY };

  await fetch(forkUrl, {
    method: 'DELETE',
    headers,
  });
};
