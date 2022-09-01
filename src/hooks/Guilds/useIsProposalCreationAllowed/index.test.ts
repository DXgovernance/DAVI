import * as useGuildConfig from 'hooks/Guilds/ether-swr/guild/useGuildConfig';
import * as useVotingPowerOf from 'hooks/Guilds/ether-swr/guild/useVotingPowerOf';
import useIsProposalCreationAllowed from './index';
import { renderHook } from '@testing-library/react-hooks';
import { BigNumber } from 'ethers';
import { ZERO_ADDRESS } from 'utils';
const bn = (value: number) => BigNumber.from(value);

const mockAddress = ZERO_ADDRESS;

jest.mock('wagmi', () => ({
  __esModule: true,
  useAccount: () => ({ address: mockAddress }),
}));

describe('useIsProposalCreationAllowed', () => {
  it('should return true if it has more voting power than required', async () => {
    jest.spyOn(useGuildConfig, 'useGuildConfig').mockImplementation(() => ({
      data: {
        name: 'REPGuild',
        token: '0x0000000000000000000000000000000000000000',
        permissionRegistry: '0x0000000000000000000000000000000000000000',
        proposalTime: bn(10000),
        timeForExecution: bn(100002),
        maxActiveProposals: bn(1000330),
        votingPowerForProposalCreation: bn(1000022),
        votingPowerForProposalExecution: bn(10044400),
        tokenVault: '0x0000000000000000000000000000000000000000',
        lockTime: bn(1004440022),
        totalLocked: bn(200),
      },
      isValidating: false,
      mutate: null,
    }));

    jest.spyOn(useVotingPowerOf, 'useVotingPowerOf').mockImplementation(() => ({
      data: bn(2000022),
      isValidating: false,
      mutate: null,
    }));

    const { result } = renderHook(() => useIsProposalCreationAllowed());
    expect(result.current).toBeTruthy();
  });
  it('should return false if it has less voting power than required', async () => {
    jest.spyOn(useGuildConfig, 'useGuildConfig').mockImplementation(() => ({
      data: {
        name: 'REPGuild',
        token: '0x0000000000000000000000000000000000000000',
        permissionRegistry: '0x0000000000000000000000000000000000000000',
        proposalTime: bn(10000),
        timeForExecution: bn(100002),
        maxActiveProposals: bn(1000330),
        votingPowerForProposalCreation: bn(1000022),
        votingPowerForProposalExecution: bn(10044400),
        tokenVault: '0x0000000000000000000000000000000000000000',
        lockTime: bn(1004440022),
        totalLocked: bn(200),
      },
      isValidating: false,
      mutate: null,
    }));

    jest.spyOn(useVotingPowerOf, 'useVotingPowerOf').mockImplementation(() => ({
      data: bn(1000000),
      isValidating: false,
      mutate: null,
    }));

    const { result } = renderHook(() => useIsProposalCreationAllowed());
    expect(result.current).toBeFalsy();
  });
  it('should return false if there is no guildConfig', async () => {
    jest.spyOn(useGuildConfig, 'useGuildConfig').mockImplementation(() => ({
      data: null,
      isValidating: false,
      mutate: null,
    }));

    jest.spyOn(useVotingPowerOf, 'useVotingPowerOf').mockImplementation(() => ({
      data: bn(1000000),
      isValidating: false,
      mutate: null,
    }));

    const { result } = renderHook(() => useIsProposalCreationAllowed());
    expect(result.current).toBeFalsy();
  });
  it('should return false if there is no votingPower', async () => {
    jest.spyOn(useGuildConfig, 'useGuildConfig').mockImplementation(() => ({
      data: {
        name: 'REPGuild',
        token: '0x0000000000000000000000000000000000000000',
        permissionRegistry: '0x0000000000000000000000000000000000000000',
        proposalTime: bn(10000),
        timeForExecution: bn(100002),
        maxActiveProposals: bn(1000330),
        votingPowerForProposalCreation: bn(1000022),
        votingPowerForProposalExecution: bn(10044400),
        tokenVault: '0x0000000000000000000000000000000000000000',
        lockTime: bn(1004440022),
        totalLocked: bn(200),
      },
      isValidating: false,
      mutate: null,
    }));

    jest.spyOn(useVotingPowerOf, 'useVotingPowerOf').mockImplementation(() => ({
      data: null,
      isValidating: false,
      mutate: null,
    }));

    const { result } = renderHook(() => useIsProposalCreationAllowed());
    expect(result.current).toBeFalsy();
  });
});
