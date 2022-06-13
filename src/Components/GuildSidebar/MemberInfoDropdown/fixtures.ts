import { BigNumber } from 'ethers';
import moment from 'moment';
import { MemberInfoDropdownProps } from './MemberInfoDropdown';

export const closedWithoutData: MemberInfoDropdownProps = {
  isOpen: false,
  onClose: jest.fn(),
};

export const openWithoutData: MemberInfoDropdownProps = {
  isOpen: true,
  onClose: jest.fn(),
};

export const closedWithData: MemberInfoDropdownProps = {
  isOpen: false,
  onClose: jest.fn(),
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
  onShowStakeModal: jest.fn(),
  onWithdraw: jest.fn(),
};

export const openWithData: MemberInfoDropdownProps = {
  ...closedWithData,
  isOpen: true,
};
