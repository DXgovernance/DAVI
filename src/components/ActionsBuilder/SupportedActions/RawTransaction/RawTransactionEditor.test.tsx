import { fireEvent, waitFor } from '@testing-library/react';
import { BigNumber } from 'ethers';
import { act } from 'react-dom/test-utils';
import { render } from 'utils/tests';
import { rawDataCallMock } from './fixtures';
import RawTransactionEditor from './RawTransactionEditor';

jest.mock('wagmi', () => ({
  __esModule: true,
  useEnsResolver: () => ({
    data: {
      name: 'name.eth',
      address: '0x0000000000000000000000000000000000000000',
    },
  }),
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
  useEnsName: () => ({
    data: 'name.eth',
  }),
  useEnsAddress: () => ({
    data: '0x0000000000000000000000000000000000000000',
  }),
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
      // TODO: make tests for input value field
    });

    it('should submit if there is value and data is zero', async () => {
      // TODO: make tests for input value field
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
  });
});
