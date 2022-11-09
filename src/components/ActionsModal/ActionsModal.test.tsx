import React from 'react';
import ActionsModal from './ActionsModal';
import { render } from 'utils/tests';

jest.mock('Modules/Guilds/Hooks/useGuildImplementationType', () => ({
  __esModule: true,
  default: () => ({
    type: 'SnapshotERC20Guild',
    bytecode_hash:
      '0x8f98f6ff8bd58d9c9d7750c4f78c9400cf6eecbf630b94f5e481b3c7ec10ccac',
    features: ['SNAPSHOT'],
    isRepGuild: true,
    isSnapshotGuild: false,
  }),
}));
jest.mock('Modules/Guilds/Hooks/useGuildConfig', () => ({
  useGuildConfig: () => ({
    data: {
      permissionRegistry: '0x0000000000000000000000000000000000000000',
    },
  }),
}));

const mockChainId = 123456;

jest.mock('wagmi', () => ({
  useContractRead: () => ({ data: '' }),
  useEnsResolver: () => ({
    data: {
      name: 'name.eth',
      address: '0x0000000000000000000000000000000000000000',
      contentHash: '0x0',
    },
  }),
  useNetwork: () => ({ chain: { id: mockChainId } }),
  useAccount: () => ({ isConnected: true }),
  chain: {
    mainnet: {},
  },
}));

describe('ActionsModal', () => {
  let props;
  beforeEach(() => {
    props = {
      isOpen: false,
      setIsOpen: jest.fn(),
      onAddAction: jest.fn(), // (action: DecodedAction) => void;
    };
  });

  it('Should match snapshot 1', () => {
    console.error = jest.fn();
    const { container } = render(<ActionsModal {...props} />, {
      container: document.body,
    });
    expect(container).toMatchSnapshot();
  });

  it('Should match snapshot 2', () => {
    console.error = jest.fn();
    props.isOpen = true;
    jest
      .spyOn(React, 'useState')
      .mockReturnValueOnce([
        'GENERIC_CALL',
        () => console.log('setSelectedAction'),
      ]);
    const { container } = render(<ActionsModal {...props} />, {
      container: document.body,
    });
    expect(container).toMatchSnapshot();
  });
});
