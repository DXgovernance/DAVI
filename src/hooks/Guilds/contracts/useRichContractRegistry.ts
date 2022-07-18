import { useWeb3React } from '@web3-react/core';
import { utils } from 'ethers';
import { useMemo } from 'react';
import useIPFSFile from '../ipfs/useIPFSFile';

// TODO: Get the actual token registry hash
const RICH_CONTRACT_DATA_REGISTRY =
  'QmXzDJU14QbYREbaNaornE4QUJA5ANxmTg3zh9fCghmJFQ';

export interface RichContractFunctionParam {
  type: string;
  component: string;
  name: string;
  defaultValue: string;
  description: string;
}

export interface RichContractFunction {
  title: string;
  functionName: string;
  params: RichContractFunctionParam[];
  shortDescription: string;
  longDescription: string;
  templateLiteral: string;
  spendsTokens: boolean;
}

export interface RichContractData {
  title: string;
  tags: string[];
  networks: { [chainId: number]: string };
  functions: RichContractFunction[];
  contractAddress: string;
  contractInterface: utils.Interface;
}

export type IPFSRichContractData = Omit<
  RichContractData,
  'contractAddress' | 'contractInterface'
>;

export const useRichContractRegistry = (chainId?: number) => {
  const { chainId: activeChainId } = useWeb3React();

  const { data, error } = useIPFSFile<IPFSRichContractData[]>(
    RICH_CONTRACT_DATA_REGISTRY
  );

  const registryContracts: RichContractData[] = useMemo(() => {
    if (error || !data) return null;
    if (activeChainId === 1337) {
      // Add runtime determined localhost addresses
      const localhost = require('../../../configs/localhost/config.json');
      // Update vesting factory address
      data.find(
        contract => contract.title === 'Vesting contract for DXD token'
      ).networks[1337] = localhost.contracts.utils.dxdVestingFactory;
      // Add NFT factory
      data[data.length - 1] = {
        title: 'NFT Factory',
        tags: ['NFT', 'DXdao', 'factory'],
        networks: {
          '1337': localhost.contracts.utils.dxDaoNFT,
        },
        functions: [
          {
            title: 'Mint NFT',
            functionName: 'mint',
            params: [
              {
                type: 'address',
                component: 'address',
                name: 'recipient',
                defaultValue: '',
                description: 'Address of the recipient',
              },
              {
                type: 'string',
                component: 'string',
                name: 'tokenURI',
                defaultValue: '',
                description: 'IPFS hash of metadata',
              },
            ],
            templateLiteral:
              'Mint NFT to ${recipient} with tokenURI ${tokenURI}',
            shortDescription: 'Creates NFTs minted by DXdao',
            longDescription:
              'Creates NFTs minted by DXdao and transfers them to the recipient',
            spendsTokens: false,
          },
        ],
      };
    }

    return data
      .filter(contract => !!contract.networks[chainId || activeChainId])
      .map(contract => {
        // Construct the Ethers Contract interface from registry data
        const contractInterface = new utils.Interface(
          contract.functions.map(f => {
            const name = f.functionName;
            const params = f.params.reduce(
              (acc, cur, i) =>
                acc.concat(
                  `${cur.type} ${cur.name}`,
                  i === f.params.length - 1 ? '' : ', '
                ),
              ''
            );
            return `function ${name}(${params})`;
          })
        );

        return {
          ...contract,
          contractAddress: contract.networks[chainId || activeChainId],
          contractInterface,
        };
      });
  }, [chainId, activeChainId, data, error]);

  return {
    contracts: registryContracts,
  };
};
