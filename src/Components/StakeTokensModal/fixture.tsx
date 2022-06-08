import { BigNumber } from 'ethers';
import { GuildConfig } from 'hooks/Guilds/ether-swr/guild/useGuildConfig';
import { ERC20 } from 'types/contracts/ERC20';
import { ERC20Guild } from 'types/contracts/ERC20Guild';

export const mockStakeTokensFormProps = {
  token: {
    name: "Mock Token",
    allowance: BigNumber.from(0),
    balance: BigNumber.from(0),
    info: {
      decimals: 18,
      symbol: 'REP',
      name: 'mockName',
      totalSupply: BigNumber.from(0),
    },
    contract: {} as ERC20,
  },
  userVotingPower: BigNumber.from(0),
  guild: {
    contract: {} as ERC20Guild,
    config: {} as GuildConfig,
  },
  createTransaction: () => {},
  isRepGuild: false,
};

export const mockStakeTokensModalProps = {
    isOpen: true,
    onDismiss: () => {},
    StakeTokensForm: () => <div />,
    StakeTokensFormProps: mockStakeTokensFormProps,
}