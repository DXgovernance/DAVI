import { mkdirSync, writeFileSync } from 'fs';
import path from 'path';
import {
  ZERO_ADDRESS,
  MAX_UINT,
  NULL_SIGNATURE,
  ERC20_TRANSFER_SIGNATURE,
} from '../src/utils/constants';

require('dotenv').config();
const hre = require('hardhat');
const moment = require('moment');
const utils = require('./utils');

async function main() {
  const web3 = hre.web3;
  const PermissionRegistry = await hre.artifacts.require('PermissionRegistry');
  const GuildRegistry = await hre.artifacts.require('GuildRegistry');
  const ERC20SnapshotRep = await hre.artifacts.require('ERC20SnapshotRep');

  const accounts = await web3.eth.getAccounts();
  utils.init(accounts);

  const deployconfig = {
    dao: {
      reputation: [
        {
          address: accounts[0],
          amount: 6000,
        },
        {
          address: accounts[1],
          amount: 4000,
        },
        {
          address: accounts[2],
          amount: 1000,
        },
      ],
      contributionReward: {
        queuedVoteRequiredPercentage: 50,
        queuedVotePeriodLimit: moment.duration(10, 'minutes').asSeconds(),
        boostedVotePeriodLimit: moment.duration(3, 'minutes').asSeconds(),
        preBoostedVotePeriodLimit: moment.duration(1, 'minutes').asSeconds(),
        thresholdConst: 2000,
        quietEndingPeriod: moment.duration(0.5, 'minutes').asSeconds(),
        proposingRepReward: 10,
        votersReputationLossRatio: 100,
        minimumDaoBounty: web3.utils.toWei('1'),
        daoBountyConst: 100,
      },

      walletSchemes: [
        {
          name: 'RegistrarWalletScheme',
          doAvatarGenericCalls: true,
          maxSecondsForExecution: moment.duration(31, 'days').asSeconds(),
          maxRepPercentageChange: 0,
          controllerPermissions: {
            canGenericCall: true,
            canUpgrade: true,
            canRegisterSchemes: true,
          },
          permissions: [],
          queuedVoteRequiredPercentage: 75,
          boostedVoteRequiredPercentage: 5 * 100,
          queuedVotePeriodLimit: moment.duration(15, 'minutes').asSeconds(),
          boostedVotePeriodLimit: moment.duration(5, 'minutes').asSeconds(),
          preBoostedVotePeriodLimit: moment.duration(2, 'minutes').asSeconds(),
          thresholdConst: 2000,
          quietEndingPeriod: moment.duration(1, 'minutes').asSeconds(),
          proposingRepReward: 0,
          votersReputationLossRatio: 100,
          minimumDaoBounty: web3.utils.toWei('10'),
          daoBountyConst: 100,
        },
        {
          name: 'MasterWalletScheme',
          doAvatarGenericCalls: true,
          maxSecondsForExecution: moment.duration(31, 'days').asSeconds(),
          maxRepPercentageChange: 40,
          controllerPermissions: {
            canGenericCall: true,
            canUpgrade: false,
            canChangeConstraints: false,
            canRegisterSchemes: false,
          },
          permissions: [
            {
              asset: '0x0000000000000000000000000000000000000000',
              to: 'DXDVotingMachine',
              functionSignature: '0xaaaaaaaa',
              value:
                '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
              allowed: true,
            },
            {
              asset: '0x0000000000000000000000000000000000000000',
              to: 'RegistrarWalletScheme',
              functionSignature: '0xaaaaaaaa',
              value:
                '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
              allowed: true,
            },
            {
              asset: '0x0000000000000000000000000000000000000000',
              to: 'ITSELF',
              functionSignature: '0xaaaaaaaa',
              value:
                '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
              allowed: true,
            },
          ],
          queuedVoteRequiredPercentage: 50,
          boostedVoteRequiredPercentage: 2 * 100,
          queuedVotePeriodLimit: moment.duration(10, 'minutes').asSeconds(),
          boostedVotePeriodLimit: moment.duration(3, 'minutes').asSeconds(),
          preBoostedVotePeriodLimit: moment.duration(1, 'minutes').asSeconds(),
          thresholdConst: 1500,
          quietEndingPeriod: moment.duration(0.5, 'minutes').asSeconds(),
          proposingRepReward: 0,
          votersReputationLossRatio: 5,
          minimumDaoBounty: web3.utils.toWei('1'),
          daoBountyConst: 10,
        },
        {
          name: 'QuickWalletScheme',
          doAvatarGenericCalls: false,
          maxSecondsForExecution: moment.duration(31, 'days').asSeconds(),
          maxRepPercentageChange: 1,
          controllerPermissions: {
            canGenericCall: false,
            canUpgrade: false,
            canChangeConstraints: false,
            canRegisterSchemes: false,
          },
          permissions: [
            {
              asset: '0x0000000000000000000000000000000000000000',
              to: '0xaAaAaAaaAaAaAaaAaAAAAAAAAaaaAaAaAaaAaaAa',
              functionSignature: '0xaaaaaaaa',
              value:
                '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
              allowed: true,
            },
            {
              asset: 'DXD',
              to: '0xaAaAaAaaAaAaAaaAaAAAAAAAAaaaAaAaAaaAaaAa',
              functionSignature: '0xaaaaaaaa',
              value:
                '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
              allowed: true,
            },
          ],
          queuedVoteRequiredPercentage: 50,
          boostedVoteRequiredPercentage: 10 * 100,
          queuedVotePeriodLimit: moment.duration(5, 'minutes').asSeconds(),
          boostedVotePeriodLimit: moment.duration(1, 'minutes').asSeconds(),
          preBoostedVotePeriodLimit: moment
            .duration(0.5, 'minutes')
            .asSeconds(),
          thresholdConst: 1300,
          quietEndingPeriod: moment.duration(0.5, 'minutes').asSeconds(),
          proposingRepReward: 0,
          votersReputationLossRatio: 10,
          minimumDaoBounty: web3.utils.toWei('0.1'),
          daoBountyConst: 10,
        },
      ],
    },

    tokens: [
      {
        name: 'DXDao on localhost',
        symbol: 'DXD',
        type: 'ERC20',
        decimals: 18,
        distribution: [
          {
            address: accounts[0],
            amount: web3.utils.toWei('3200000'),
          },
          {
            address: accounts[1],
            amount: web3.utils.toWei('500000'),
          },
          {
            address: accounts[2],
            amount: web3.utils.toWei('100000'),
          },
        ],
      },
      {
        name: 'REPGuildToken',
        symbol: 'RGT',
        type: 'ERC20SnapshotRep',
        decimals: 18,
        distribution: [
          {
            address: accounts[0],
            amount: web3.utils.toWei('100000'),
          },
          {
            address: accounts[1],
            amount: web3.utils.toWei('50000'),
          },
          {
            address: accounts[2],
            amount: web3.utils.toWei('10000'),
          },
        ],
      },
      {
        name: 'SWAPR Token',
        symbol: 'SWPR',
        type: 'ERC20',
        decimals: 18,
        distribution: [
          {
            address: accounts[0],
            amount: web3.utils.toWei('200000'),
          },
          {
            address: accounts[1],
            amount: web3.utils.toWei('40000'),
          },
          {
            address: accounts[2],
            amount: web3.utils.toWei('100000'),
          },
        ],
      },
    ],

    guildRegistry: {
      address: ZERO_ADDRESS,
      owner: 'Avatar',
    },

    guilds: [
      {
        token: 'DXD',
        contractName: 'DXDGuild',
        name: 'DXDGuild',
        proposalTime: moment.duration(10, 'minutes').asSeconds(),
        timeForExecution: moment.duration(50, 'minutes').asSeconds(),
        votingPowerPercentageForProposalExecution: '3000',
        votingPowerPercentageForProposalCreation: '100',
        voteGas: '0',
        maxGasPrice: '0',
        maxActiveProposals: '9999',
        lockTime: moment.duration(10, 'minutes').asSeconds(),
      },
      {
        token: 'RGT',
        contractName: 'SnapshotRepERC20Guild',
        name: 'REPGuild',
        proposalTime: moment.duration(5, 'minutes').asSeconds(),
        timeForExecution: moment.duration(2, 'minutes').asSeconds(),
        votingPowerPercentageForProposalExecution: '5000',
        votingPowerPercentageForProposalCreation: '500',
        voteGas: '0',
        maxGasPrice: '0',
        maxActiveProposals: '5',
        lockTime: moment.duration(5, 'minutes').asSeconds(),
      },
      {
        token: 'SWPR',
        contractName: 'SnapshotERC20Guild',
        name: 'SWPRGuild',
        proposalTime: moment.duration(5, 'minutes').asSeconds(),
        timeForExecution: moment.duration(60, 'minutes').asSeconds(),
        votingPowerPercentageForProposalExecution: '3000',
        votingPowerPercentageForProposalCreation: '500',
        voteGas: '0',
        maxGasPrice: '0',
        maxActiveProposals: '999',
        lockTime: moment.duration(20, 'minutes').asSeconds(),
      },
    ],
  };

  const networkContracts = await hre.run('deploy-dxdao-contracts', {
    deployconfig: JSON.stringify(deployconfig),
  });

  const actions = [
    {
      type: 'transfer',
      // We use this to reset to local time, in future we should ensure the automatic process works
      timestamp: moment().subtract(46, 'minutes').unix(),
      from: accounts[0],
      data: {
        asset: ZERO_ADDRESS,
        address: 'Avatar',
        amount: web3.utils.toWei('50'),
      },
    },
    {
      type: 'transfer',
      from: accounts[0],
      data: {
        asset: 'DXD',
        address: accounts[3],
        amount: web3.utils.toWei('50'),
      },
    },
    {
      type: 'transfer',
      from: accounts[0],
      data: {
        asset: 'DXD',
        address: 'Avatar',
        amount: web3.utils.toWei('20'),
      },
    },
    {
      type: 'transfer',
      from: accounts[0],
      data: {
        asset: 'DXD',
        address: 'Avatar',
        amount: web3.utils.toWei('20'),
      },
    },

    {
      type: 'transfer',
      from: accounts[0],
      data: {
        asset: ZERO_ADDRESS,
        address: 'DXDGuild',
        amount: web3.utils.toWei('10'),
      },
    },
    {
      type: 'transfer',
      from: accounts[0],
      data: {
        asset: 'DXD',
        address: 'DXDGuild',
        amount: web3.utils.toWei('100'),
      },
    },

    {
      type: 'transfer',
      from: accounts[1],
      data: {
        asset: ZERO_ADDRESS,
        address: 'SWPRGuild',
        amount: web3.utils.toWei('10'),
      },
    },
    {
      type: 'transfer',
      from: accounts[1],
      data: {
        asset: 'SWPR',
        address: 'SWPRGuild',
        amount: web3.utils.toWei('10'),
      },
    },

    {
      type: 'transfer',
      from: accounts[0],
      data: {
        asset: ZERO_ADDRESS,
        address: 'REPGuild',
        amount: web3.utils.toWei('12'),
      },
    },

    {
      type: 'proposal',
      from: accounts[2],
      data: {
        to: ['PermissionRegistry', 'PermissionRegistry', 'PermissionRegistry'],
        callData: [
          new web3.eth.Contract(PermissionRegistry.abi).methods
            .setETHPermission(
              networkContracts.addresses['Avatar'],
              networkContracts.addresses['QuickWalletScheme'],

              NULL_SIGNATURE,
              web3.utils.toWei('10'),
              true
            )
            .encodeABI(),
          new web3.eth.Contract(PermissionRegistry.abi).methods
            .setETHPermission(
              networkContracts.addresses['Avatar'],
              '0xEb579C2E9bd3AC6Fd17de7bB55ab344f83735356',
              NULL_SIGNATURE,
              web3.utils.toWei('10'),
              true
            )
            .encodeABI(),
          new web3.eth.Contract(PermissionRegistry.abi).methods
            .setETHPermission(
              networkContracts.addresses['Avatar'],
              networkContracts.addresses['GuildRegistry'],
              web3.eth.abi.encodeFunctionSignature('addGuild(address)'),
              web3.utils.toWei('0'),
              true
            )
            .encodeABI(),
        ],
        value: ['0', '0', '0'],
        title: '#0 Set Permissions Proposal',
        description: 'Allow sending up to 10 ETH to QuickWalletScheme',
        tags: ['dxvote'],
        scheme: 'MasterWalletScheme',
      },
    },
    {
      type: 'approve',
      from: accounts[2],
      data: {
        asset: 'DXD',
        address: 'DXDVotingMachine',
        amount: MAX_UINT,
      },
    },
    {
      type: 'stake',
      from: accounts[2],
      data: {
        proposal: '0',
        decision: '1',
        amount: web3.utils.toWei('1.01'),
      },
    },
    {
      type: 'vote',
      increaseTime: moment.duration(1, 'minutes').asSeconds(),
      from: accounts[2],
      data: {
        proposal: '0',
        decision: '1',
        amount: '0',
      },
    },
    {
      type: 'execute',
      increaseTime: moment.duration(3, 'minutes').asSeconds(),
      from: accounts[2],
      data: {
        proposal: '0',
      },
    },
    {
      type: 'redeem',
      from: accounts[2],
      data: {
        proposal: '0',
      },
    },

    {
      type: 'proposal',
      from: accounts[2],
      data: {
        to: ['GuildRegistry', 'GuildRegistry', 'GuildRegistry'],
        callData: [
          new web3.eth.Contract(GuildRegistry.abi).methods
            .addGuild(networkContracts.addresses.REPGuild)
            .encodeABI(),
          new web3.eth.Contract(GuildRegistry.abi).methods
            .addGuild(networkContracts.addresses.DXDGuild)
            .encodeABI(),
          new web3.eth.Contract(GuildRegistry.abi).methods
            .addGuild(networkContracts.addresses.SWPRGuild)
            .encodeABI(),
        ],
        value: ['0', '0', '0'],
        title: '#1 Add Guilds Proposal',
        description: 'Add guilds',
        tags: ['dxvote'],
        scheme: 'MasterWalletScheme',
      },
    },
    {
      type: 'stake',
      from: accounts[2],
      data: {
        proposal: '1',
        decision: '1',
        amount: web3.utils.toWei('1.01'),
      },
    },
    {
      type: 'vote',
      increaseTime: moment.duration(1, 'minutes').asSeconds(),
      from: accounts[2],
      data: {
        proposal: '1',
        decision: '1',
        amount: '0',
      },
    },
    {
      type: 'execute',
      increaseTime: moment.duration(3, 'minutes').asSeconds(),
      from: accounts[2],
      data: {
        proposal: '1',
      },
    },
    {
      type: 'redeem',
      from: accounts[2],
      data: {
        proposal: '1',
      },
    },

    {
      type: 'proposal',
      from: accounts[2],
      data: {
        to: ['QuickWalletScheme'],
        callData: ['0x0'],
        value: [web3.utils.toWei('10')],
        title: '#2 Proposal Test',
        description: 'Send 10 ETH to QuickWalletScheme',
        tags: ['dxvote'],
        scheme: 'MasterWalletScheme',
      },
    },
    {
      type: 'approve',
      from: accounts[2],
      data: {
        asset: 'DXD',
        address: 'DXDVotingMachine',
        amount: MAX_UINT,
      },
    },
    {
      type: 'stake',
      from: accounts[2],
      data: {
        proposal: '2',
        decision: '1',
        amount: web3.utils.toWei('1.01'),
      },
    },
    {
      type: 'vote',
      increaseTime: moment.duration(1, 'minutes').asSeconds(),
      from: accounts[2],
      data: {
        proposal: '2',
        decision: '1',
        amount: '0',
      },
    },
    {
      type: 'vote',
      from: accounts[1],
      data: {
        proposal: '2',
        decision: '2',
        amount: '0',
      },
    },

    {
      type: 'proposal',
      from: accounts[2],
      data: {
        to: [accounts[2]],
        callData: ['0x0'],
        value: [web3.utils.toWei('1.5')],
        title: '#3 Proposal Test',
        description:
          'Send 1.5 ETH to 0x3f943f38b2fbe1ee5daf0516cecfe4e0f8734351',
        tags: ['dxvote'],
        scheme: 'QuickWalletScheme',
      },
    },

    {
      type: 'guild-createProposal',
      from: accounts[0],
      data: {
        guildName: 'REPGuild',
        to: ['PermissionRegistry'],
        callData: [
          new web3.eth.Contract(PermissionRegistry.abi).methods
            .setETHPermission(
              networkContracts.addresses.REPGuild,
              ZERO_ADDRESS,
              NULL_SIGNATURE,
              web3.utils.toWei('5').toString(),
              true
            )
            .encodeABI(),
        ],
        value: ['0'],
        totalOptions: '1',
        title: '#0 Set Permissions',
        description: 'Allow call any address',
      },
    },
    {
      type: 'guild-voteProposal',
      from: accounts[0],
      data: {
        guildName: 'REPGuild',
        proposal: 0,
        action: '1',
        votingPower: web3.utils.toWei('100').toString(),
      },
    },
    {
      type: 'guild-endProposal',
      increaseTime: moment.duration(5, 'minutes').asSeconds(),
      from: accounts[1],
      data: {
        guildName: 'REPGuild',
        proposal: 0,
      },
    },

    {
      type: 'guild-createProposal',
      from: accounts[0],
      data: {
        guildName: 'REPGuild',
        to: ['RGT', 'RGT'],
        callData: [
          new web3.eth.Contract(ERC20SnapshotRep.abi).methods
            .burn(accounts[0], web3.utils.toWei('50'))
            .encodeABI(),
          new web3.eth.Contract(ERC20SnapshotRep.abi).methods
            .mint(accounts[2], web3.utils.toWei('40'))
            .encodeABI(),
        ],
        value: ['0', '0'],
        totalOptions: '1',
        title: '#1 Mint to equal all address REP',
        description: `Mint and burn REP to address ${accounts[0]} and ${accounts[2]} so all rep holders have 50 REP`,
      },
    },
    {
      type: 'guild-voteProposal',
      from: accounts[0],
      data: {
        guildName: 'REPGuild',
        proposal: 1,
        action: '1',
        votingPower: web3.utils.toWei('100').toString(),
      },
    },
    {
      type: 'guild-endProposal',
      increaseTime: moment.duration(5, 'minutes').asSeconds(),
      from: accounts[1],
      data: {
        guildName: 'REPGuild',
        proposal: 1,
      },
    },

    {
      type: 'guild-createProposal',
      from: accounts[0],
      data: {
        guildName: 'REPGuild',
        to: ['RGT'],
        callData: [
          new web3.eth.Contract(ERC20SnapshotRep.abi).methods
            .mint(accounts[0], web3.utils.toWei('1000'))
            .encodeABI(),
        ],
        value: ['0'],
        totalOptions: '1',
        title: '#1 Mint to me and take control',
        description: ``,
      },
    },
    {
      type: 'guild-voteProposal',
      from: accounts[0],
      data: {
        guildName: 'REPGuild',
        proposal: 2,
        action: '1',
        votingPower: web3.utils.toWei('50').toString(),
      },
    },
    {
      type: 'guild-endProposal',
      increaseTime: moment.duration(5, 'minutes').asSeconds(),
      from: accounts[1],
      data: {
        guildName: 'REPGuild',
        proposal: 2,
      },
    },

    {
      type: 'approve',
      from: accounts[0],
      data: {
        asset: 'DXD',
        address: 'DXDGuild-vault',
        amount: MAX_UINT,
      },
    },
    {
      type: 'guild-lockTokens',
      from: accounts[0],
      data: {
        guildName: 'DXDGuild',
        amount: web3.utils.toWei('100'),
      },
    },

    {
      type: 'approve',
      from: accounts[1],
      data: {
        asset: 'DXD',
        address: 'DXDGuild-vault',
        amount: MAX_UINT,
      },
    },
    {
      type: 'guild-lockTokens',
      from: accounts[1],
      data: {
        guildName: 'DXDGuild',
        amount: web3.utils.toWei('50'),
      },
    },

    {
      type: 'approve',
      from: accounts[2],
      data: {
        asset: 'DXD',
        address: 'DXDGuild-vault',
        amount: MAX_UINT,
      },
    },
    {
      type: 'guild-lockTokens',
      from: accounts[2],
      data: {
        guildName: 'DXDGuild',
        amount: web3.utils.toWei('5'),
      },
    },

    {
      type: 'guild-withdrawTokens',
      increaseTime: moment.duration(10, 'minutes').asSeconds() + 1,
      from: accounts[0],
      data: {
        guildName: 'DXDGuild',
        amount: web3.utils.toWei('10'),
      },
    },
    {
      type: 'guild-createProposal',
      from: accounts[0],
      data: {
        guildName: 'DXDGuild',
        to: ['PermissionRegistry'],
        callData: [
          new web3.eth.Contract(PermissionRegistry.abi).methods
            .setETHPermission(
              networkContracts.addresses.DXDGuild,
              ZERO_ADDRESS,
              NULL_SIGNATURE,
              web3.utils.toWei('5').toString(),
              true
            )
            .encodeABI(),
        ],
        value: ['0'],
        totalOptions: '1',
        title: 'Proposal Test #0',
        description:
          'Allow call any address and function and send a max of 5 ETH per proposal',
      },
    },
    {
      type: 'guild-voteProposal',
      from: accounts[1],
      data: {
        guildName: 'DXDGuild',
        proposal: 0,
        action: '1',
        votingPower: web3.utils.toWei('90').toString(),
      },
    },
    {
      type: 'guild-endProposal',
      increaseTime: moment.duration(10, 'minutes').asSeconds(),
      from: accounts[1],
      data: {
        guildName: 'DXDGuild',
        proposal: 0,
      },
    },
    {
      type: 'guild-createProposal',
      from: accounts[0],
      data: {
        guildName: 'DXDGuild',
        to: ['PermissionRegistry'],
        callData: [
          new web3.eth.Contract(PermissionRegistry.abi).methods
            .setETHPermission(
              networkContracts.addresses.DXDGuild,
              ZERO_ADDRESS,
              NULL_SIGNATURE,
              web3.utils.toWei('5').toString(),
              true
            )
            .encodeABI(),
        ],
        value: ['0x6A94D74F430000'],
        totalOptions: '1',
        title: 'Proposal with value',
        description: 'Proposal with value > 1',
      },
    },

    {
      type: 'approve',
      from: accounts[0],
      data: {
        asset: 'SWPR',
        address: 'SWPRGuild-vault',
        amount: MAX_UINT,
      },
    },

    {
      type: 'guild-lockTokens',
      from: accounts[0],
      data: {
        guildName: 'SWPRGuild',
        amount: web3.utils.toWei('30'),
      },
    },

    {
      type: 'guild-createProposal',
      from: accounts[0],
      data: {
        guildName: 'SWPRGuild',
        to: ['PermissionRegistry'],
        callData: [
          new web3.eth.Contract(PermissionRegistry.abi).methods
            .setETHPermission(
              networkContracts.addresses.SWPRGuild,
              networkContracts.addresses.SWPR,
              ERC20_TRANSFER_SIGNATURE,
              web3.utils.toWei('5'),
              true
            )
            .encodeABI(),
        ],
        value: ['0'],
        totalOptions: '1',
        title: 'Allow Swapr guild to transfer SWPR tokens',
        description: 'Allow the guild to transfer swpr tokens',
        voteOptions: ['For'],
      },
    },

    {
      type: 'guild-voteProposal',
      from: accounts[0],
      data: {
        guildName: 'SWPRGuild',
        proposal: 0,
        action: '1',
        votingPower: web3.utils.toWei('15').toString(),
      },
    },

    {
      type: 'guild-endProposal',
      increaseTime: moment.duration(5, 'minutes').asSeconds(),
      from: accounts[1],
      data: {
        guildName: 'SWPRGuild',
        proposal: 0,
      },
    },

    {
      type: 'proposal',
      from: accounts[2],
      data: {
        to: [accounts[2]],
        callData: ['0x0'],
        value: [web3.utils.toWei('1.5')],
        title: 'Proposal Test #3',
        description:
          'Send 1.5 ETH to 0x3f943f38b2fbe1ee5daf0516cecfe4e0f8734351',
        tags: ['dxvote'],
        scheme: 'QuickWalletScheme',
      },
    },

    ...utils.createMultipleRandomProposals(2, {
      data: { guildName: 'DXDGuild' },
    }),
  ];

  const developConfig = {
    cache: {
      fromBlock: 0,
      toBlock: 1,
      ipfsHash:
        '0x0000000000000000000000000000000000000000000000000000000000000000',
    },
    contracts: networkContracts,
    recommendedCalls: [],
    proposalTemplates: [],
    proposalTypes: [
      {
        id: 'contributor',
        title: 'Contributor',
        scheme: 'QuickWalletScheme',
      },
      {
        id: 'custom',
        title: 'Custom',
      },
    ],
    contributionLevels: [
      {
        id: '1',
        dxd: 2000,
        stable: 4000,
        rep: 0.1667,
      },
      {
        id: '2',
        dxd: 3000,
        stable: 5000,
        rep: 0.1667,
      },
      {
        id: '3',
        dxd: 4000,
        stable: 6000,
        rep: 0.1667,
      },
      {
        id: '4',
        dxd: 5000,
        stable: 7000,
        rep: 0.1667,
      },
      {
        id: '5',
        dxd: 6000,
        stable: 8000,
        rep: 0.1667,
      },
    ],
    tokens: [
      {
        address: networkContracts.addresses.DXD,
        name: 'DXdao on Localhost',
        decimals: 18,
        symbol: 'DXD',
        fetchPrice: true,
        logoURI:
          'https://s2.coinmarketcap.com/static/img/coins/200x200/5589.png',
      },
      {
        address: networkContracts.addresses.RGT,
        name: 'REP Guild Token on Localhost',
        decimals: 18,
        symbol: 'RGT',
        fetchPrice: true,
        logoURI:
          'https://s2.coinmarketcap.com/static/img/coins/200x200/5589.png',
      },
      {
        address: networkContracts.addresses.SWPR,
        name: 'SWAPR Guild',
        decimals: 18,
        symbol: 'SWPR',
        fetchPrice: true,
        logoURI:
          'https://s2.coinmarketcap.com/static/img/coins/200x200/5589.png',
      },
    ],
    guilds: [
      networkContracts.addresses.DXDGuild,
      networkContracts.addresses.REPGuild,
      networkContracts.addresses.SWPRGuild,
    ],
    networkOptions: [
      'Ethereum',
      'Goerli',
      'Arbitrum One',
      'Arbitrum Goerli',
      'Gnosis',
      'Localhost',
    ],
    walletOptions: ['MetaMask', 'WalletConnect', 'Coinbase Wallet'],
  };

  await hre.run('actions-dxdao-contracts', {
    actions: JSON.stringify(actions),
    networkContracts: JSON.stringify(networkContracts),
  });

  if (process.env.ETHERNAL_CONTRACTS === 'true') {
    await hre.ethernal.push({
      name: 'Avatar',
      address: networkContracts.addresses.Avatar,
    });
    await hre.ethernal.push({
      name: 'Reputation',
      address: networkContracts.addresses.Reputation,
    });
    await hre.ethernal.push({
      name: 'Controller',
      address: networkContracts.addresses.Controller,
    });
    await hre.ethernal.push({
      name: 'DXDVotingMachine',
      address: networkContracts.addresses.DXDVotingMachine,
    });
    await hre.ethernal.push({
      name: 'PermissionRegistry',
      address: networkContracts.addresses.PermissionRegistry,
    });
    await hre.ethernal.push({
      name: 'GuildRegistry',
      address: networkContracts.addresses.GuildRegistry,
    });
    await hre.ethernal.push({
      name: 'ERC20',
      address: networkContracts.addresses.DXD,
    });
    await hre.ethernal.push({
      name: 'ERC20',
      address: networkContracts.addresses.SWPR,
    });
    await hre.ethernal.push({
      name: 'ERC20SnapshotRep',
      address: networkContracts.addresses.RGT,
    });
    await hre.ethernal.push({
      name: 'DXDGuild',
      address: networkContracts.addresses.DXDGuild,
    });
    await hre.ethernal.push({
      name: 'ERC20',
      address: networkContracts.addresses.SWPRGuild,
    });
    await hre.ethernal.push({
      name: 'SnapshotRepERC20Guild',
      address: networkContracts.addresses.REPGuild,
    });
    await hre.ethernal.push({
      name: 'WalletScheme',
      address: networkContracts.addresses.RegistrarWalletScheme,
    });
    await hre.ethernal.push({
      name: 'WalletScheme',
      address: networkContracts.addresses.MasterWalletScheme,
    });
    await hre.ethernal.push({
      name: 'WalletScheme',
      address: networkContracts.addresses.QuickWalletScheme,
    });
  }

  networkContracts.utils.guildRegistry =
    networkContracts.addresses.GuildRegistry;

  mkdirSync(path.resolve(__dirname, '../src/configs/localhost'), {
    recursive: true,
  });
  writeFileSync(
    path.resolve(__dirname, '../src/configs/localhost/config.json'),
    JSON.stringify(developConfig, null, 2)
  );
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
