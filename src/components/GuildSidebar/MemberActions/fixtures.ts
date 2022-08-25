import { BigNumber } from 'ethers';
import moment from 'moment';
import { MemberActionsProps } from './MemberActions';

export const propsWithData: MemberActionsProps = {
  guildToken: {
    decimals: 18,
    name: 'Guild Token',
    symbol: 'GT',
    totalSupply: BigNumber.from('1000000000'),
  },
  userWalletAddress: '0x1234567890123456789012345678901234567890',
  userEnsAvatar: {
    imageUrl: '/assets/favicon-32x32.png',
    ensName: 'test.eth',
  },
  isRepGuild: false,
  unlockedAt: moment().add(1, 'day'),
  userVotingPower: BigNumber.from('250000000'),
  userVotingPowerPercent: 50,
};
