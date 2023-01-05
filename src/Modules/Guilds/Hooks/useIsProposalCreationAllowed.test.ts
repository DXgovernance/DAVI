import * as useGuildConfig from 'Modules/Guilds/Hooks/useGuildConfig';
import * as useVotingPowerOf from 'Modules/Guilds/Hooks/useVotingPowerOf';
import useIsProposalCreationAllowed from './useIsProposalCreationAllowed';
import { renderHook } from '@testing-library/react-hooks';
import { BigNumber } from 'ethers';
import { ZERO_ADDRESS } from 'utils';
const mockBigNumber = (value: number) => BigNumber.from(value);

const mockAddress = ZERO_ADDRESS;
jest.mock('wagmi', () => ({
  chain: {},
  useAccount: () => ({ address: mockAddress }),
}));

jest.mock('provider/ReadOnlyConnector', () => ({
  READ_ONLY_CONNECTOR_ID: 'readOnly',
}));

jest.mock('contexts/Guilds/orbis', () => ({}));

describe('useIsProposalCreationAllowed', () => {
  it('should return true if it has more voting power than required', async () => {
    jest.spyOn(useGuildConfig, 'useGuildConfig').mockImplementation(
      () =>
        ({
          data: {
            name: 'REPGuild',
            token: '0x0000000000000000000000000000000000000000',
            permissionRegistry: '0x0000000000000000000000000000000000000000',
            proposalTime: mockBigNumber(10000),
            timeForExecution: mockBigNumber(100002),
            maxActiveProposals: mockBigNumber(1000330),
            votingPowerForProposalCreation: mockBigNumber(1000022),
            votingPowerForProposalExecution: mockBigNumber(10044400),
            tokenVault: '0x0000000000000000000000000000000000000000',
            lockTime: mockBigNumber(1004440022),
            totalLocked: mockBigNumber(200),
          },
          isValidating: false,
          mutate: null,
        } as ReturnType<any>)
    );

    jest.spyOn(useVotingPowerOf, 'useVotingPowerOf').mockImplementation(
      () =>
        ({
          data: mockBigNumber(2000022),
          isValidating: false,
          mutate: null,
        } as ReturnType<any>)
    );
    const { result } = renderHook(() => useIsProposalCreationAllowed());
    expect(result.current).toBeTruthy();
  });

  it('should return false if it has less voting power than required', async () => {
    jest.spyOn(useGuildConfig, 'useGuildConfig').mockImplementation(
      () =>
        ({
          data: {
            name: 'REPGuild',
            token: '0x0000000000000000000000000000000000000000',
            permissionRegistry: '0x0000000000000000000000000000000000000000',
            proposalTime: mockBigNumber(10000),
            timeForExecution: mockBigNumber(100002),
            maxActiveProposals: mockBigNumber(1000330),
            votingPowerForProposalCreation: mockBigNumber(1000022),
            votingPowerForProposalExecution: mockBigNumber(10044400),
            tokenVault: '0x0000000000000000000000000000000000000000',
            lockTime: mockBigNumber(1004440022),
            totalLocked: mockBigNumber(200),
          },
          isValidating: false,
          mutate: null,
        } as ReturnType<any>)
    );

    jest.spyOn(useVotingPowerOf, 'useVotingPowerOf').mockImplementation(
      () =>
        ({
          data: mockBigNumber(1000000),
          isValidating: false,
          mutate: null,
        } as ReturnType<any>)
    );
    const { result } = renderHook(() => useIsProposalCreationAllowed());
    expect(result.current).toBeFalsy();
  });

  it('should return false if there is no guildConfig', async () => {
    jest.spyOn(useGuildConfig, 'useGuildConfig').mockImplementation(
      () =>
        ({
          data: null,
          isValidating: false,
          mutate: null,
        } as ReturnType<any>)
    );

    jest.spyOn(useVotingPowerOf, 'useVotingPowerOf').mockImplementation(
      () =>
        ({
          data: mockBigNumber(1000000),
          isValidating: false,
          mutate: null,
        } as ReturnType<any>)
    );

    const { result } = renderHook(() => useIsProposalCreationAllowed());
    expect(result.current).toBeFalsy();
  });

  it('should return false if there is no votingPower', async () => {
    jest.spyOn(useGuildConfig, 'useGuildConfig').mockImplementation(
      () =>
        ({
          data: {
            name: 'REPGuild',
            token: '0x0000000000000000000000000000000000000000',
            permissionRegistry: '0x0000000000000000000000000000000000000000',
            proposalTime: mockBigNumber(10000),
            timeForExecution: mockBigNumber(100002),
            maxActiveProposals: mockBigNumber(1000330),
            votingPowerForProposalCreation: mockBigNumber(1000022),
            votingPowerForProposalExecution: mockBigNumber(10044400),
            tokenVault: '0x0000000000000000000000000000000000000000',
            lockTime: mockBigNumber(1004440022),
            totalLocked: mockBigNumber(200),
          },
          isValidating: false,
          mutate: null,
        } as ReturnType<any>)
    );

    jest.spyOn(useVotingPowerOf, 'useVotingPowerOf').mockImplementation(
      () =>
        ({
          data: null,
          isValidating: false,
          mutate: null,
        } as ReturnType<any>)
    );

    const { result } = renderHook(() => useIsProposalCreationAllowed());
    expect(result.current).toBeFalsy();
  });
});
