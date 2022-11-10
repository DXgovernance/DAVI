import '@testing-library/jest-dom';
import Permissions from './SetPermissionsEditor';
import { render } from 'utils/tests.js';
import { DecodedCall } from '../../types';
import { SupportedAction } from '../../types';
import PermissionRegistry from 'contracts/PermissionRegistry.json';
import { BigNumber, utils } from 'ethers';
import { ANY_FUNC_SIGNATURE, ANY_ADDRESS } from 'utils';
import { fireEvent, screen } from '@testing-library/react';
import { mockChain } from 'components/Web3Modals/fixtures';
import { MOCK_ADDRESS, MOCK_ENS_NAME } from 'hooks/Guilds/ens/fixtures';

// Mocked hooks

jest.mock('hooks/Guilds/ens/useENSAvatar', () => ({
  __esModule: true,
  default: () => ({
    imageUrl: 'wagmi',
  }),
}));

jest.mock('hooks/Guilds/ens/useENS', () => ({
  __esModule: true,
  default: (value: string) => {
    if (value === MOCK_ENS_NAME || value === MOCK_ADDRESS) {
      return { name: MOCK_ENS_NAME, address: MOCK_ADDRESS };
    } else {
      return { name: null, address: value };
    }
  },
}));

jest.mock('wagmi', () => ({
  useContractRead: () => ({ data: '' }),
  useEnsResolver: () => ({
    data: {
      name: 'name.eth',
      address: '0x0000000000000000000000000000000000000000',
      contentHash: '0x0',
    },
  }),
  useAccount: () => ({ isConnected: false }),
  useNetwork: () => ({ chain: mockChain, chains: [mockChain] }),
  useContractReads: () => ({ data: [] }),
  useBalance: () => ({ data: 0 }),
}));

// Mocked variables

const PermissionRegistryContract = new utils.Interface(PermissionRegistry.abi);

const functionNameMock = 'test';
const functionSignatureMock = '0x9c22ff5f';
const toAddressMock = MOCK_ADDRESS;
const customAmountMock = 111;
const tokenAddresMock = '0xD899Be87df2076e0Be28486b60dA406Be6757AfC';

const emptyDecodedCallMock: DecodedCall = {
  from: '',
  callType: SupportedAction.REP_MINT,
  function: PermissionRegistryContract.getFunction('setETHPermission'),
  to: tokenAddresMock,
  value: BigNumber.from(0),
  args: {
    to: ANY_ADDRESS,
    functionSignature: ANY_FUNC_SIGNATURE,
    valueAllowed: BigNumber.from(0),
    allowance: 'true',
  },
  optionalProps: {
    asset: '',
    functionName: '',
    tab: 0,
  },
};

const completeDecodedCallMock: DecodedCall = {
  from: '',
  callType: SupportedAction.REP_MINT,
  function: PermissionRegistryContract.getFunction('setETHPermission'),
  to: tokenAddresMock,
  value: BigNumber.from(0),
  args: {
    to: toAddressMock,
    functionSignature: functionSignatureMock,
    valueAllowed: BigNumber.from('111000000000000000000'),
    allowance: 'true',
  },
  optionalProps: {
    asset: tokenAddresMock,
    functionName: functionNameMock,
    tab: 1,
  },
};

const decodedCallMockWithoutENSName: DecodedCall = {
  from: '',
  callType: SupportedAction.REP_MINT,
  function: PermissionRegistryContract.getFunction('setETHPermission'),
  to: tokenAddresMock,
  value: BigNumber.from(0),
  args: {
    to: '0x0100000000000000000000000000000000000001',
    functionSignature: functionSignatureMock,
    valueAllowed: BigNumber.from('111000000000000000000'),
    allowance: 'true',
  },
  optionalProps: {
    asset: tokenAddresMock,
    functionName: functionNameMock,
    tab: 1,
  },
};

describe(`Set Permissions editor`, () => {
  describe(`Asset transfer tests`, () => {
    beforeAll(() => {});
    it(`Default view renders asset transfer`, () => {
      render(
        <Permissions decodedCall={emptyDecodedCallMock} onSubmit={jest.fn()} />
      );

      expect(
        screen.getByRole('textbox', { name: /asset picker/i })
      ).toBeInTheDocument();

      expect(
        screen.getByRole('textbox', { name: /amount input/i })
      ).toBeInTheDocument();

      expect(
        screen.getByRole('switch', { name: /toggle max value/i })
      ).toBeInTheDocument();
    });

    it(`Can fill 'To address' and 'custom amount'`, () => {
      render(
        <Permissions
          decodedCall={completeDecodedCallMock}
          onSubmit={jest.fn()}
        />
      );
      const toAddressElement: HTMLInputElement = screen.getByRole('textbox', {
        name: /to address input/i,
      });
      fireEvent.change(toAddressElement, { target: { value: toAddressMock } });

      const customAmountElement: HTMLInputElement = screen.getByRole(
        'textbox',
        {
          name: /amount input/i,
        }
      );
      fireEvent.change(customAmountElement, {
        target: { value: customAmountMock },
      });

      expect(toAddressElement.value).toBe(toAddressMock);
      expect(customAmountElement.value).toBe(String(customAmountMock));
    });

    it(`Clicking the X clears the to address`, () => {
      render(
        <Permissions
          decodedCall={completeDecodedCallMock}
          onSubmit={jest.fn()}
        />
      );
      const toAddressElement: HTMLInputElement = screen.getByRole('textbox', {
        name: /to address input/i,
      });
      fireEvent.change(toAddressElement, { target: { value: toAddressMock } });

      const clearInputIcon = screen.getByLabelText('clear address');

      fireEvent.click(clearInputIcon);

      expect(toAddressElement.value).toBe('');
    });

    it(`Displays decodedCall information properly`, () => {
      render(
        <Permissions
          decodedCall={completeDecodedCallMock}
          onSubmit={jest.fn()}
        />
      );

      const toAddressElement: HTMLInputElement = screen.getByRole('textbox', {
        name: /to address input/i,
      });

      const amountInputElement: HTMLInputElement = screen.getByRole('textbox', {
        name: /amount input/i,
      });

      expect(toAddressElement.value).toBe(MOCK_ENS_NAME);
      expect(amountInputElement.value).toBe('111.0');
    });

    it(`Displays decodedCall information properly from an address without ENS name`, () => {
      const newAddressValue = '0xD899Be87df2076e0Be28486b60dA406Be6750000';
      const otherValues = {
        ...completeDecodedCallMock,
        args: {
          ...completeDecodedCallMock.args,
          to: newAddressValue,
        },
      };
      render(<Permissions decodedCall={otherValues} onSubmit={jest.fn()} />);

      const toAddressElement: HTMLInputElement = screen.getByRole('textbox', {
        name: /to address input/i,
      });

      const amountInputElement: HTMLInputElement = screen.getByRole('textbox', {
        name: /amount input/i,
      });

      expect(toAddressElement.value).toBe(newAddressValue);
      expect(amountInputElement.value).toBe('111.0');
    });
  });

  describe(`Function calls tests`, () => {
    it(`Can fill the 'to address', 'function signature' and amount`, () => {
      render(
        <Permissions decodedCall={emptyDecodedCallMock} onSubmit={jest.fn()} />
      );
      const functionsCallTab = screen.getByTestId(`functions-call-tab`);
      fireEvent.click(functionsCallTab);

      const toAddressElement: HTMLInputElement = screen.getByRole('textbox', {
        name: /to address input/i,
      });
      fireEvent.change(toAddressElement, {
        target: { value: toAddressMock },
      });

      const functionSignatureElement: HTMLInputElement = screen.getByRole(
        'textbox',
        { name: /function signature input/i }
      );
      fireEvent.change(functionSignatureElement, {
        target: { value: functionNameMock },
      });

      const amountElement: HTMLInputElement = screen.getByRole('textbox', {
        name: /amount input/i,
      });
      fireEvent.change(amountElement, {
        target: { value: customAmountMock },
      });

      expect(toAddressElement.value).toBe(toAddressMock);
      expect(functionSignatureElement.value).toBe(functionNameMock);
      expect(amountElement.value).toBe('111');
    });

    it(`Displays decodedCall information properly`, () => {
      render(
        <Permissions
          decodedCall={completeDecodedCallMock}
          onSubmit={jest.fn()}
        />
      );
      const functionsCallTab = screen.getByTestId(`functions-call-tab`);
      fireEvent.click(functionsCallTab);

      const toAddressElement: HTMLInputElement = screen.getByRole('textbox', {
        name: /to address input/i,
      });

      const functionNameElement: HTMLInputElement = screen.getByRole(
        'textbox',
        { name: /function signature input/i }
      );

      expect(toAddressElement.value).toBe(MOCK_ENS_NAME);
      expect(functionNameElement.value).toBe(functionNameMock);
    });

    it(`Displays decodedCall information properly with an address without ENS name`, () => {
      render(
        <Permissions
          decodedCall={decodedCallMockWithoutENSName}
          onSubmit={jest.fn()}
        />
      );
      const functionsCallTab = screen.getByTestId(`functions-call-tab`);
      fireEvent.click(functionsCallTab);

      const toAddressElement: HTMLInputElement = screen.getByRole('textbox', {
        name: /to address input/i,
      });

      const functionNameElement: HTMLInputElement = screen.getByRole(
        'textbox',
        { name: /function signature input/i }
      );

      expect(toAddressElement.value).toBe(
        decodedCallMockWithoutENSName.args.to
      );
      expect(functionNameElement.value).toBe(functionNameMock);
    });
  });

  describe(`Tab interaction`, () => {
    it(`Changing tabs to function calls shows its elements`, () => {
      render(
        <Permissions decodedCall={emptyDecodedCallMock} onSubmit={jest.fn()} />
      );

      const functionsCallTab = screen.getByTestId(`functions-call-tab`);
      fireEvent.click(functionsCallTab);

      expect(
        screen.getByRole('textbox', { name: /to address input/i })
      ).toBeInTheDocument();

      expect(
        screen.getByRole('textbox', { name: /function signature input/i })
      ).toBeInTheDocument();

      expect(
        screen.getByRole('textbox', { name: /amount input/i })
      ).toBeInTheDocument();
    });

    it(`Can switch back an forth a couple of times with data`, () => {
      render(
        <Permissions
          decodedCall={completeDecodedCallMock}
          onSubmit={jest.fn()}
        />
      );

      const functionsCallTab = screen.getByTestId(`functions-call-tab`);
      const assetTransferTab = screen.getByTestId(`asset-transfer-tab`);

      fireEvent.click(functionsCallTab);
      fireEvent.click(assetTransferTab);
      fireEvent.click(functionsCallTab);

      const toAddressElement: HTMLInputElement = screen.getByRole('textbox', {
        name: /to address input/i,
      });

      const functionNameElement: HTMLInputElement = screen.getByRole(
        'textbox',
        { name: /function signature input/i }
      );

      const customAmountElement: HTMLInputElement = screen.getByRole(
        'textbox',
        {
          name: /amount input/i,
        }
      );

      expect(toAddressElement.value).toBe(MOCK_ENS_NAME);
      expect(functionNameElement.value).toBe(functionNameMock);
      expect(customAmountElement.value).toBe('111.0');

      expect(
        screen.getByRole('textbox', { name: /to address input/i })
      ).toBeInTheDocument();

      expect(
        screen.getByRole('textbox', { name: /function signature input/i })
      ).toBeInTheDocument();

      expect(
        screen.getByRole('textbox', { name: /amount input/i })
      ).toBeInTheDocument();
    });

    it(`Can switch back an forth a couple of times without data`, () => {
      render(
        <Permissions decodedCall={emptyDecodedCallMock} onSubmit={jest.fn()} />
      );

      const functionsCallTab = screen.getByTestId(`functions-call-tab`);
      const assetTransferTab = screen.getByTestId(`asset-transfer-tab`);

      fireEvent.click(functionsCallTab);
      fireEvent.click(assetTransferTab);

      expect(
        screen.getByRole('textbox', { name: /asset picker/i })
      ).toBeInTheDocument();

      fireEvent.click(functionsCallTab);

      expect(
        screen.getByRole('textbox', { name: /to address input/i })
      ).toBeInTheDocument();

      expect(
        screen.getByRole('textbox', { name: /function signature input/i })
      ).toBeInTheDocument();

      expect(
        screen.getByRole('textbox', { name: /amount input/i })
      ).toBeInTheDocument();
    });
  });
});
