import { ethers } from 'ethers';

export const simulateAllTransactions = async (
  options,
  chainId: number,
  provider
) => {
  const forkId = await getForkId(chainId, provider);
  const forkRPC = `https://rpc.tenderly.co/fork/${forkId}`;
  const forkProvider = new ethers.providers.JsonRpcProvider(forkRPC);

  const forkStartingPoint = await forkProvider.send('evm_snapshot', []);

  for (let i = 0; i < options.length; i++) {
    await forkProvider.send('evm_revert', [forkStartingPoint]); // Reset fork
    let currentOption = options[i];

    // Tenderly simulation API requires to execute the simulations
    // serialized, that's why I used a for loop
    for (let j = 0; j < currentOption.actions.length; j++) {
      let currentAction = currentOption.actions[j];

      // Fund the wallet with ether
      const params = [currentAction.from, ethers.utils.hexValue(30000000)];
      await forkProvider.send('tenderly_addBalance', params);

      let actionData = {
        from: currentAction.from,
        to: currentAction.to,
        data: currentAction.data,
        gas: ethers.utils.hexValue(500000),
        gasPrice: ethers.utils.hexValue(1),
        value: ethers.utils.hexValue(0),
      };

      let transactionHash = await forkProvider.send('eth_sendTransaction', [
        actionData,
      ]);
      let transactionDetails = await forkProvider.send(
        'eth_getTransactionReceipt',
        [transactionHash]
      );

      options[i].decodedActions[j].success =
        transactionDetails.status === '0x1' ? true : false;
    }
  }

  //! Delete before PR
  deleteFork(forkId);

  return options;
};

const getForkId = async (chainId: number, provider) => {
  const {
    REACT_APP_TENDERLY_USER,
    REACT_APP_TENDERLY_PROJECT,
    REACT_APP_TENDERLY_ACCESS_KEY,
  } = process.env;

  let latestBlock = await provider.getBlockNumber();

  const forkUrl = `https://api.tenderly.co/api/v1/account/${REACT_APP_TENDERLY_USER}/project/${REACT_APP_TENDERLY_PROJECT}/fork`;

  const headers = { 'X-Access-Key': REACT_APP_TENDERLY_ACCESS_KEY };

  const bodyData = {
    network_id: chainId.toString(),
    block_number: latestBlock,
  };

  try {
    const response = await fetch(forkUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(bodyData),
    }).then(response => response.json());
    return response.simulation_fork.id;
  } catch (err) {
    return err;
  }
};

const deleteFork = async forkId => {
  const { REACT_APP_TENDERLY_PROJECT, REACT_APP_TENDERLY_ACCESS_KEY } =
    process.env;

  const forkUrl = `https://api.tenderly.co/api/v2/project/${REACT_APP_TENDERLY_PROJECT}/forks/${forkId}`;
  const headers = { 'X-Access-Key': REACT_APP_TENDERLY_ACCESS_KEY };

  await fetch(forkUrl, {
    method: 'DELETE',
    headers,
  });
};
