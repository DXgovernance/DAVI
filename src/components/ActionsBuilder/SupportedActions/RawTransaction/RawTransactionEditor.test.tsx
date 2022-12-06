import { fireEvent, waitFor } from '@testing-library/react';
import { BigNumber } from 'ethers';
import { MOCK_ADDRESS, MOCK_ENS_NAME } from 'hooks/Guilds/ens/fixtures';
import { act } from 'react-dom/test-utils';
import { render } from 'utils/tests';
import { rawDataCallMock } from './fixtures';
import RawTransactionEditor from './RawTransactionEditor';

jest.mock('wagmi', () => ({
  __esModule: true,
  useEnsResolver: ({ name, chainId }) => {
    if (!name || name === '.eth') {
      return {
        data: {
          name: null,
          address: null,
        },
      };
    } else {
      return {
        data: {
          name: MOCK_ENS_NAME,
          address: MOCK_ADDRESS,
        },
      };
    }
  },
  useNetwork: () => ({
    chain: {
      id: 1,
      blockExplorers: {
        default: {
          url: 'https://etherscan.io',
        },
      },
    },
  }),
  useEnsName: ({ address, chainId }) => {
    if (!address) {
      return {
        data: null,
      };
    } else {
      return {
        data: MOCK_ENS_NAME,
      };
    }
  },
  useEnsAddress: ({ name, chainId }) => {
    if (!name || name === '.eth' || name === 'invalidAddress.eth') {
      return {
        data: null,
      };
    } else {
      return {
        data: MOCK_ADDRESS,
      };
    }
  },
  useContractRead: () => ({
    data: 'e30101701220e09973e8c9e391cb063bd6654356e64e0ceced7858a29a8c01b165e30a5eb5be',
  }),
  useProvider: () => ({
    getNetwork: jest.fn(),
  }),
  chain: {
    mainnet: {},
  },
  useContractReads: () => ({
    data: [{}],
  }),
  chainId: {
    localhost: 1337,
  },
}));

describe('RawTransactionEditor', () => {
  describe('valid inputs', () => {
    it('should match snapshot', () => {
      const { container } = render(
        <RawTransactionEditor
          decodedCall={rawDataCallMock}
          onSubmit={jest.fn()}
        />
      );

      expect(container).toMatchSnapshot();
    });

    it('should submit if all fields are present', async () => {
      const mockOnSubmit = jest.fn();

      const data = { ...rawDataCallMock };
      const { findByTestId } = render(
        <RawTransactionEditor decodedCall={data} onSubmit={mockOnSubmit} />
      );

      await act(async () => {
        const submitButton = await findByTestId('submit-rawtransaction');
        fireEvent.submit(submitButton);
      });

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalled();
      });
    });

    it('should submit if there is data and value is zero', async () => {
      const mockOnSubmit = jest.fn();

      const data = { ...rawDataCallMock, value: BigNumber.from(0) };
      const { findByTestId } = render(
        <RawTransactionEditor decodedCall={data} onSubmit={mockOnSubmit} />
      );

      const submitButton = await findByTestId('submit-rawtransaction');
      fireEvent.submit(submitButton);

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalled();
      });
    });

    it('should submit if there is value and no data', async () => {
      const mockOnSubmit = jest.fn();
      const data = {
        ...rawDataCallMock,
        value: BigNumber.from(111),
        optionalProps: { data: '' },
      };
      const { findByTestId } = render(
        <RawTransactionEditor decodedCall={data} onSubmit={mockOnSubmit} />
      );
      const submitButton = await findByTestId('submit-rawtransaction');
      fireEvent.submit(submitButton);
      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalled();
      });
    });

    it('should submit if there is value and data is zero', async () => {
      const mockOnSubmit = jest.fn();
      const data = {
        ...rawDataCallMock,
        value: BigNumber.from(111),
        optionalProps: { data: '0x00' },
      };
      const { findByTestId } = render(
        <RawTransactionEditor decodedCall={data} onSubmit={mockOnSubmit} />
      );
      const submitButton = await findByTestId('submit-rawtransaction');
      fireEvent.submit(submitButton);
      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalled();
      });
    });
  });

  describe('fail test', () => {
    it('should fail if to address is empty', async () => {
      const mockOnSubmit = jest.fn();

      const data = { ...rawDataCallMock, to: '' };
      const { findByTestId } = render(
        <RawTransactionEditor decodedCall={data} onSubmit={mockOnSubmit} />
      );

      await act(async () => {
        const submitButton = await findByTestId('submit-rawtransaction');
        fireEvent.submit(submitButton);
      });

      await waitFor(() => {
        expect(mockOnSubmit).not.toHaveBeenCalled();
      });
    });

    it('should fail if to address is invalid', async () => {
      const mockOnSubmit = jest.fn();

      const data = { ...rawDataCallMock, to: 'invalidAddress' };
      const { findByTestId } = render(
        <RawTransactionEditor decodedCall={data} onSubmit={mockOnSubmit} />
      );

      await act(async () => {
        const submitButton = await findByTestId('submit-rawtransaction');
        fireEvent.submit(submitButton);
      });

      await waitFor(() => {
        expect(mockOnSubmit).not.toHaveBeenCalled();
      });
    });

    it('should fail if to address is empty', async () => {
      const mockOnSubmit = jest.fn();

      const data = { ...rawDataCallMock, to: 'invalidAddress' };
      const { findByTestId } = render(
        <RawTransactionEditor decodedCall={data} onSubmit={mockOnSubmit} />
      );

      await act(async () => {
        const submitButton = await findByTestId('submit-rawtransaction');
        fireEvent.submit(submitButton);
      });

      await waitFor(() => {
        expect(mockOnSubmit).not.toHaveBeenCalled();
      });
    });

    it('should fail if value is zero and data is null', async () => {
      const mockOnSubmit = jest.fn();

      const data = {
        ...rawDataCallMock,
        value: BigNumber.from(0),
        optionalProps: { data: '' },
      };
      const { findByTestId } = render(
        <RawTransactionEditor decodedCall={data} onSubmit={mockOnSubmit} />
      );

      await act(async () => {
        const submitButton = await findByTestId('submit-rawtransaction');
        fireEvent.submit(submitButton);
      });

      await waitFor(() => {
        expect(mockOnSubmit).not.toHaveBeenCalled();
      });
    });

    it('should fail if value and data is zero', async () => {
      const mockOnSubmit = jest.fn();

      const data = {
        ...rawDataCallMock,
        value: BigNumber.from(0),
        optionalProps: { data: '0x0' },
      };
      const { findByTestId } = render(
        <RawTransactionEditor decodedCall={data} onSubmit={mockOnSubmit} />
      );

      await act(async () => {
        const submitButton = await findByTestId('submit-rawtransaction');
        fireEvent.submit(submitButton);
      });

      await waitFor(() => {
        expect(mockOnSubmit).not.toHaveBeenCalled();
      });
    });

    it('should fail if data is invalid', async () => {
      const mockOnSubmit = jest.fn();

      const data = {
        ...rawDataCallMock,
        value: BigNumber.from(0),
        optionalProps: { data: '0xNotValidHex' },
      };
      const { findByTestId } = render(
        <RawTransactionEditor decodedCall={data} onSubmit={mockOnSubmit} />
      );

      await act(async () => {
        const submitButton = await findByTestId('submit-rawtransaction');
        fireEvent.submit(submitButton);
      });

      await waitFor(() => {
        expect(mockOnSubmit).not.toHaveBeenCalled();
      });
    });

    it('should fail if data is of odd length', async () => {
      const mockOnSubmit = jest.fn();

      const data = {
        ...rawDataCallMock,
        value: BigNumber.from(0),
        optionalProps: { data: '0x0' },
      };
      const { findByTestId } = render(
        <RawTransactionEditor decodedCall={data} onSubmit={mockOnSubmit} />
      );

      await act(async () => {
        const submitButton = await findByTestId('submit-rawtransaction');
        fireEvent.submit(submitButton);
      });

      await waitFor(() => {
        expect(mockOnSubmit).not.toHaveBeenCalled();
      });
    });
  });
});
