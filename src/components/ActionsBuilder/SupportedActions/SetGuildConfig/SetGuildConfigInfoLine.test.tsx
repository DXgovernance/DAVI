import { render } from 'utils/tests';
import SetGuildConfigInfoLine from './SetGuildConfigInfoLine';
import { emptyDecodedCall, mockBigNumber } from './fixtures';

jest.mock('Modules/Guilds/Hooks/useGuildConfig', () => ({
  useGuildConfig: () => ({
    data: {
      permissionRegistry: '0x23120390909dq0w9adsj832921293989',
      name: 'TEST GUILD',
      proposalTime: mockBigNumber,
      timeForExecution: mockBigNumber,
      maxActiveProposals: mockBigNumber,
      votingPowerForProposalCreation: mockBigNumber,
      tokenVault: '0X9628SD7128DAS78SHDF8HF832H283FH283RH98ASHD',
      lockTime: mockBigNumber,
      voteGas: mockBigNumber,
      maxGasPrice: mockBigNumber,
      votingPowerPercentageForProposalExecution: mockBigNumber,
      votingPowerPercentageForProposalCreation: mockBigNumber,
      minimumMembersForProposalCreation: mockBigNumber,
      minimumTokensLockedForProposalCreation: mockBigNumber,
      votingPowerForProposalExecution: mockBigNumber,
      token: '0x30ii2jnn32ru8238r293ru2389ru2938ru239r23r23',
    },
  }),
}));

describe('SetGuildConfigInfoLine', () => {
  it('Should match snapshot', () => {
    const { container } = render(
      <SetGuildConfigInfoLine decodedCall={emptyDecodedCall} />
    );
    expect(container).toMatchSnapshot();
  });
});
