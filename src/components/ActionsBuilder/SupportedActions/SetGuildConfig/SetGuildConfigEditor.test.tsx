import { render } from 'utils/tests';
import { BigNumber } from 'ethers';
import SetGuildConfigEditor from './SetGuildConfigEditor';
import { emptyDecodedCall } from './fixtures';
import { FIELDS } from './constants';

const mockBigNumber = BigNumber.from(100000000);

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

jest.mock('Modules/Guilds/Hooks/useTypedParams', () => ({
  useTypedParams: () => ({
    guildId: '0xE9bDaB08f2FBb370d2a6F6661a92d9B6157E9fd2',
  }),
}));

describe('SetGuildConfigEditor', () => {
  it('Should match snapshot', () => {
    const { container } = render(
      <SetGuildConfigEditor
        decodedCall={emptyDecodedCall}
        onSubmit={jest.fn()}
      />
    );
    expect(container).toMatchSnapshot();
  });

  it('Should render all fields', () => {
    const { getByText } = render(
      <SetGuildConfigEditor
        decodedCall={emptyDecodedCall}
        onSubmit={jest.fn()}
      />
    );
    FIELDS.forEach(field => {
      expect(getByText(field.label)).toBeInTheDocument();
    });
  });
});
