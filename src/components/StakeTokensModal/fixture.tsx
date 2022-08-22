import { BigNumber } from 'ethers';
import { GuildConfigProps } from 'hooks/Guilds/ether-swr/guild/useGuildConfig';
import { ERC20 } from 'types/contracts';
import { ERC20Guild } from 'types/contracts/ERC20Guild';
import StakeTokensForm from './components/StakeTokensForm/StakeTokensForm';

export const mockStakeTokensFormProps = {
  token: {
    name: 'Mock Token',
    allowance: BigNumber.from(1000000),
    balance: BigNumber.from(1000000),
    info: {
      decimals: 18,
      symbol: 'REP',
      name: 'mockName',
      totalSupply: BigNumber.from(0),
    },
    contract: {
      approve: () => {},
    } as unknown as ERC20,
  },
  userVotingPower: BigNumber.from(0),
  guild: {
    contract: {} as ERC20Guild,
    config: {
      name: 'mockGuildName',
      totalLocked: BigNumber.from(0),
      tokenVault: 'mockTokenVault',
      lockTime: BigNumber.from(0),
    } as unknown as GuildConfigProps,
    totalLocked: BigNumber.from(0),
  },
  createTransaction: () => {},
  isRepGuild: false,
};

export const mockStakeTokensModalProps = {
  isOpen: true,
  onDismiss: () => {},
  StakeTokensForm: StakeTokensForm,
  StakeTokensFormProps: mockStakeTokensFormProps,
};
