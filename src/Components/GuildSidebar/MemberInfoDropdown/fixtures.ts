import { BigNumber } from 'ethers';
import moment from 'moment';
import { MemberInfoDropdownProps } from './MemberInfoDropdown';

export const closedWithoutData: Omit<MemberInfoDropdownProps, 'onClose'> = {
  isOpen: false,
};

export const openWithoutData: Omit<MemberInfoDropdownProps, 'onClose'> = {
  isOpen: true,
};

export const closedWithData: Omit<MemberInfoDropdownProps, 'onClose'> = {
  isOpen: false,
  guildToken: {
    decimals: 18,
    name: 'Guild Token',
    symbol: 'GT',
    totalSupply: BigNumber.from('1000000000'),
  },
  isRepGuild: false,
  unlockedAt: moment().add(1, 'day'),
  userVotingPower: BigNumber.from('250000000'),
  userVotingPowerPercent: 50,
};

export const openWithData: Omit<MemberInfoDropdownProps, 'onClose'> = {
  ...closedWithData,
  isOpen: true,
};
