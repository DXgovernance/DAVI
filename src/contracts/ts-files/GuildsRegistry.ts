export const GuildRegistry = {
  _format: 'hh-sol-artifact-1',
  contractName: 'GuildRegistry',
  sourceName: 'contracts/erc20guild/utils/GuildRegistry.sol',
  abi: [
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'address',
          name: 'guildAddress',
          type: 'address',
        },
      ],
      name: 'AddGuild',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'previousOwner',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'newOwner',
          type: 'address',
        },
      ],
      name: 'OwnershipTransferred',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'address',
          name: 'guildAddress',
          type: 'address',
        },
      ],
      name: 'RemoveGuild',
      type: 'event',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'guildAddress',
          type: 'address',
        },
      ],
      name: 'addGuild',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'getGuildsAddresses',
      outputs: [
        {
          internalType: 'address[]',
          name: '',
          type: 'address[]',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      name: 'guilds',
      outputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'index',
      outputs: [
        {
          internalType: 'uint256',
          name: '_value',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'owner',
      outputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'guildAddress',
          type: 'address',
        },
      ],
      name: 'removeGuild',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'renounceOwnership',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'newOwner',
          type: 'address',
        },
      ],
      name: 'transferOwnership',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
  ] as const,
  bytecode:
    '0x60a0604052739cdc16b5f95229b856cba5f38095fd8e00f8edef608090815261002b9060019081610097565b5034801561003857600080fd5b5061004233610047565b610111565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b8280548282559060005260206000209081019282156100ec579160200282015b828111156100ec57825182546001600160a01b0319166001600160a01b039091161782556020909201916001909101906100b7565b506100f89291506100fc565b5090565b5b808211156100f857600081556001016100fd565b6106ff806101206000396000f3fe608060405234801561001057600080fd5b50600436106100885760003560e01c80639e0fc53e1161005b5780639e0fc53e146100ec578063a03e02e1146100ff578063efe7b7af14610114578063f2fde38b1461012757600080fd5b80631041095d1461008d5780632986c0e5146100a2578063715018a6146100bf5780638da5cb5b146100c7575b600080fd5b6100a061009b3660046105ad565b61013a565b005b6002546100ac9081565b6040519081526020015b60405180910390f35b6100a06102d3565b6000546001600160a01b03165b6040516001600160a01b0390911681526020016100b6565b6100a06100fa3660046105ad565b610309565b6101076103df565b6040516100b691906105dd565b6100d461012236600461062a565b610441565b6100a06101353660046105ad565b61046b565b6000546001600160a01b0316331461016d5760405162461bcd60e51b815260040161016490610643565b60405180910390fd5b6001546101b25760405162461bcd60e51b81526020600482015260136024820152724e6f206775696c647320746f2064656c65746560681b6044820152606401610164565b6001600160a01b038116600090815260036020526040812054600180549192916101dd908290610678565b815481106101ed576101ed61069d565b600091825260209091200154600180546001600160a01b03909216925082918490811061021c5761021c61069d565b600091825260208083209190910180546001600160a01b0319166001600160a01b0394851617905591851681526003909152604090208290556001805480610266576102666106b3565b600082815260209020810160001990810180546001600160a01b03191690550190556102926002610506565b6040516001600160a01b03841681527fe185661ed055a359209cb92bd25b6cbca32081cc7317811b3d740e9ad4fb81039060200160405180910390a1505050565b6000546001600160a01b031633146102fd5760405162461bcd60e51b815260040161016490610643565b610307600061055d565b565b6000546001600160a01b031633146103335760405162461bcd60e51b815260040161016490610643565b6002546001600160a01b03821660008181526003602052604081209290925560018054808201825592527fb10e2d527612073b26eecdfd717e6a320cf44b4afac2b0732d9fcbe2b7fa0cf690910180546001600160a01b03191690911790556103a0600280546001019055565b6040516001600160a01b03821681527fd4260d38a77bf719d5646b9536b018d7362d076dcc59540876e948b6787406c39060200160405180910390a150565b6060600180548060200260200160405190810160405280929190818152602001828054801561043757602002820191906000526020600020905b81546001600160a01b03168152600190910190602001808311610419575b5050505050905090565b6001818154811061045157600080fd5b6000918252602090912001546001600160a01b0316905081565b6000546001600160a01b031633146104955760405162461bcd60e51b815260040161016490610643565b6001600160a01b0381166104fa5760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608401610164565b6105038161055d565b50565b8054806105555760405162461bcd60e51b815260206004820152601b60248201527f436f756e7465723a2064656372656d656e74206f766572666c6f7700000000006044820152606401610164565b600019019055565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6000602082840312156105bf57600080fd5b81356001600160a01b03811681146105d657600080fd5b9392505050565b6020808252825182820181905260009190848201906040850190845b8181101561061e5783516001600160a01b0316835292840192918401916001016105f9565b50909695505050505050565b60006020828403121561063c57600080fd5b5035919050565b6020808252818101527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604082015260600190565b60008282101561069857634e487b7160e01b600052601160045260246000fd5b500390565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052603160045260246000fdfea26469706673582212209b65e28c02a26c5f66512154c44dfad530e584809b7c6b087930e7c54c0ff0f364736f6c63430008080033',
  deployedBytecode:
    '0x608060405234801561001057600080fd5b50600436106100885760003560e01c80639e0fc53e1161005b5780639e0fc53e146100ec578063a03e02e1146100ff578063efe7b7af14610114578063f2fde38b1461012757600080fd5b80631041095d1461008d5780632986c0e5146100a2578063715018a6146100bf5780638da5cb5b146100c7575b600080fd5b6100a061009b3660046105ad565b61013a565b005b6002546100ac9081565b6040519081526020015b60405180910390f35b6100a06102d3565b6000546001600160a01b03165b6040516001600160a01b0390911681526020016100b6565b6100a06100fa3660046105ad565b610309565b6101076103df565b6040516100b691906105dd565b6100d461012236600461062a565b610441565b6100a06101353660046105ad565b61046b565b6000546001600160a01b0316331461016d5760405162461bcd60e51b815260040161016490610643565b60405180910390fd5b6001546101b25760405162461bcd60e51b81526020600482015260136024820152724e6f206775696c647320746f2064656c65746560681b6044820152606401610164565b6001600160a01b038116600090815260036020526040812054600180549192916101dd908290610678565b815481106101ed576101ed61069d565b600091825260209091200154600180546001600160a01b03909216925082918490811061021c5761021c61069d565b600091825260208083209190910180546001600160a01b0319166001600160a01b0394851617905591851681526003909152604090208290556001805480610266576102666106b3565b600082815260209020810160001990810180546001600160a01b03191690550190556102926002610506565b6040516001600160a01b03841681527fe185661ed055a359209cb92bd25b6cbca32081cc7317811b3d740e9ad4fb81039060200160405180910390a1505050565b6000546001600160a01b031633146102fd5760405162461bcd60e51b815260040161016490610643565b610307600061055d565b565b6000546001600160a01b031633146103335760405162461bcd60e51b815260040161016490610643565b6002546001600160a01b03821660008181526003602052604081209290925560018054808201825592527fb10e2d527612073b26eecdfd717e6a320cf44b4afac2b0732d9fcbe2b7fa0cf690910180546001600160a01b03191690911790556103a0600280546001019055565b6040516001600160a01b03821681527fd4260d38a77bf719d5646b9536b018d7362d076dcc59540876e948b6787406c39060200160405180910390a150565b6060600180548060200260200160405190810160405280929190818152602001828054801561043757602002820191906000526020600020905b81546001600160a01b03168152600190910190602001808311610419575b5050505050905090565b6001818154811061045157600080fd5b6000918252602090912001546001600160a01b0316905081565b6000546001600160a01b031633146104955760405162461bcd60e51b815260040161016490610643565b6001600160a01b0381166104fa5760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608401610164565b6105038161055d565b50565b8054806105555760405162461bcd60e51b815260206004820152601b60248201527f436f756e7465723a2064656372656d656e74206f766572666c6f7700000000006044820152606401610164565b600019019055565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6000602082840312156105bf57600080fd5b81356001600160a01b03811681146105d657600080fd5b9392505050565b6020808252825182820181905260009190848201906040850190845b8181101561061e5783516001600160a01b0316835292840192918401916001016105f9565b50909695505050505050565b60006020828403121561063c57600080fd5b5035919050565b6020808252818101527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604082015260600190565b60008282101561069857634e487b7160e01b600052601160045260246000fd5b500390565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052603160045260246000fdfea26469706673582212209b65e28c02a26c5f66512154c44dfad530e584809b7c6b087930e7c54c0ff0f364736f6c63430008080033',
  linkReferences: {},
  deployedLinkReferences: {},
};
