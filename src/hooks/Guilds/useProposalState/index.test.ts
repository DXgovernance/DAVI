import useProposalState from '.';
import { Proposal, ContractState } from 'types/types.guilds.d';
import { BigNumber } from 'ethers';
import { renderHook } from '@testing-library/react-hooks';

jest.mock('moment', () => {
  return () =>
    jest.requireActual('moment')('01.01.2022 11:10', 'DD.MM.YYYY HH:mm');
});

const proposal: Proposal = {
  id: '0x0',
  creator: '0x0',
  startTime: jest.requireActual('moment')(
    '01.01.2022 10:10',
    'DD.MM.YYYY HH:mm'
  ),
  endTime: jest.requireActual('moment')('01.01.2022 12:10', 'DD.MM.YYYY HH:mm'),
  timeDetail: '',
  to: ['0x0', '0x0'],
  data: ['0x0', '0x0'],
  value: [BigNumber.from(0), BigNumber.from(0)],
  totalActions: BigNumber.from(0),
  title: 'Proposal Title',
  contentHash: '0x0',
  contractState: ContractState.Active,
  totalVotes: [BigNumber.from(0)],
};

describe(`useProposalState`, () => {
  it(`Should return null if there's no endTime property`, () => {
    const tempProposal = { ...proposal };
    tempProposal.endTime = null;

    const { result } = renderHook(() => useProposalState(tempProposal));
    expect(result.current).toBeNull();
  });

  it(`Should return 'Active' if the state is 'Active' and the current time is before endTime`, () => {
    const tempProposal = { ...proposal };
    tempProposal.contractState = ContractState.Active;

    const { result } = renderHook(() => useProposalState(tempProposal));
    expect(result.current).toBe('Active');
  });

  it(`Should return 'Executable' if the state is 'Active' and the current time is after the endTime`, () => {
    const tempProposal = { ...proposal };
    tempProposal.contractState = ContractState.Active;
    tempProposal.endTime = jest.requireActual('moment')(
      '01.01.2022 11:00',
      'DD.MM.YYYY HH:mm'
    );

    const { result } = renderHook(() => useProposalState(tempProposal));
    expect(result.current).toBe('Executable');
  });

  it(`Should return 'Executed' if the state is 'Executed'`, () => {
    const tempProposal = { ...proposal };
    tempProposal.contractState = ContractState.Executed;

    const { result } = renderHook(() => useProposalState(tempProposal));
    expect(result.current).toBe('Executed');
  });

  it(`Should return 'Rejected' if the state is 'Rejected'`, () => {
    const tempProposal = { ...proposal };
    tempProposal.contractState = ContractState.Rejected;

    const { result } = renderHook(() => useProposalState(tempProposal));
    expect(result.current).toBe('Rejected');
  });

  it(`Should return 'Failed' if the state is 'Failed'`, () => {
    const tempProposal = { ...proposal };
    tempProposal.contractState = ContractState.Failed;

    const { result } = renderHook(() => useProposalState(tempProposal));
    expect(result.current).toBe('Failed');
  });
});
