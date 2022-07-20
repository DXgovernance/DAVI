import { ethers } from 'ethers';
import { Call, Option } from 'Components/ActionsBuilder/types';
import { useNetwork, useProvider } from 'wagmi';

// Variables are hardcoded because they didn't work
// with GitHub. It might change later
const TENDERLY_USER = 'dxdao';
const TENDERLY_PROJECT = 'dxdao-proposal-simulation';
const TENDERLY_ACCESS_KEY = 'fbzJG0PD3R8sX5i2vCCqh4r3YyrELtIO';

export const useTransactionSimulation = () => {
  const { chain } = useNetwork();
  const provider = useProvider();

  async function simulateTransactions(options: Option[]) {
    try {
      const [forkId, forkUrl] = await getForkData(chain?.id, provider);

      const forkRPC = `https://rpc.tenderly.co/fork/${forkId}`;
      const forkProvider = new ethers.providers.JsonRpcProvider(forkRPC);
      const forkStartingPoint = await forkProvider.send('evm_snapshot', []);
      let failedTransactions = 0;

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
            chain?.id
          );
          currentOption.decodedActions[j].simulationResult =
            await simulationResult;

          if (simulationResult.transaction.status === false)
            failedTransactions++;
        }
      }

      // Uncomment to delete fork after simulation
      // deleteFork(forkId);

      return { options, failedTransactions, error: null };
    } catch (error) {
      console.log(error);
      return { options, failedTransactions: 1, error };
    }
  }

  return simulateTransactions;
};

const getForkData = async (chainId: number, provider) => {
  let latestBlock = await provider.getBlockNumber();

  const createForkUrl = `https://api.tenderly.co/api/v1/account/${TENDERLY_USER}/project/${TENDERLY_PROJECT}/fork`;

  const headers = { 'X-Access-Key': TENDERLY_ACCESS_KEY };

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
  const simulationUrl = `${forkUrl}/simulate`;
  const network_id = chainId.toString();
  const { from, to, data: input } = action;

  const headers = { 'X-Access-Key': TENDERLY_ACCESS_KEY };

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

  return simulationResult;
};

// The deleteFork function is useful while developing
// to delete forks while manually testing, to prevent
// a lot of forks spamming the dashboard

// const deleteFork = async (forkId: string) => {

//   const forkUrl = `https://api.tenderly.co/api/v2/project/${TENDERLY_PROJECT}/forks/${forkId}`;
//   const headers = { 'X-Access-Key': TENDERLY_ACCESS_KEY };

//   await fetch(forkUrl, {
//     method: 'DELETE',
//     headers,
//   });
// };
