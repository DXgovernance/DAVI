import { render } from 'utils/tests';
import SetGuildConfigInfoLine from './SetGuildConfigInfoLine';
import { emptyDecodedCall } from './fixtures';

jest.mock(
  'components/ActionsBuilder/SupportedActions/SetGuildConfig/useUpdatedGuildConfigValues',
  () => ({
    useUpdatedGuildConfigValues: () => ({
      proposalTime: {
        newValue: {
          type: 'BigNumber',
          hex: '0x3840',
        },
        currentValue: {
          type: 'BigNumber',
          hex: '0x1c20',
        },
      },
      votingPowerPercentageForProposalCreation: {
        newValue: {
          type: 'BigNumber',
          hex: '0x1388',
        },
        currentValue: {
          type: 'BigNumber',
          hex: '0x01f4',
        },
      },
      minimumMembersForProposalCreation: {
        newValue: {
          type: 'BigNumber',
          hex: '0x03',
        },
        currentValue: {
          type: 'BigNumber',
          hex: '0x00',
        },
      },
    }),
  })
);

describe('SetGuildConfigInfoLine', () => {
  it('Should match snapshot', () => {
    const { container } = render(
      <SetGuildConfigInfoLine decodedCall={emptyDecodedCall} />
    );
    expect(container).toMatchSnapshot();
  });
});
