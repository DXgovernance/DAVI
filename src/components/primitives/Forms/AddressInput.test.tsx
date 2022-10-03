import { fireEvent } from '@testing-library/react';
import { MOCK_ADDRESS, MOCK_ENS_NAME } from 'hooks/Guilds/ens/fixtures';
import { render } from 'utils/tests';
import { AddressInput } from './AddressInput';

let mockUseENSAddressValue = MOCK_ADDRESS;

jest.mock('wagmi', () => ({
  useEnsAddress: () => ({ data: mockUseENSAddressValue }),
  useEnsName: () => ({ data: MOCK_ENS_NAME }),
  useEnsResolver: () => ({
    data: {
      name: MOCK_ENS_NAME,
      address: MOCK_ADDRESS,
    },
  }),
  useContractReads: () => ({ data: [] }),
  useContractRead: () => ({
    data: 'e30101701220e09973e8c9e391cb063bd6654356e64e0ceced7858a29a8c01b165e30a5eb5be',
  }),
}));

jest.mock('hooks/Guilds/ens/useENSAvatar', () => ({
  __esModule: true,
  default: () => ({
    avatarUri: 'test',
    imageUrl: 'test',
    ensName: 'test.eth',
  }),
}));

describe(`AddressInput`, () => {
  describe(`ENS behaviour`, () => {
    it(`should return an address value if ENSName is ENABLED and inputs an ENS name`, async () => {
      const mockOnChange = jest.fn();

      const { findByTestId } = render(
        <AddressInput value={''} onChange={mockOnChange} />
      );

      const addressField = await findByTestId('address input');
      fireEvent.change(addressField, { target: { value: MOCK_ENS_NAME } });

      expect(mockOnChange).toHaveBeenCalledWith(MOCK_ADDRESS);
    });

    it(`should return null if ENSName is ENABLED and the ENS name doesn't exist`, async () => {
      const mockOnChange = jest.fn();
      mockUseENSAddressValue = null;

      const { findByTestId } = render(
        <AddressInput value={''} onChange={mockOnChange} />
      );

      const addressField = await findByTestId('address input');
      fireEvent.change(addressField, { target: { value: 'wrongENS.eth' } });

      expect(mockOnChange).toHaveBeenCalledWith('wrongENS.eth');
    });

    it(`should return an address if ENSName is DISABLED and it inputs an address`, async () => {
      const mockOnChange = jest.fn();

      const { findByTestId } = render(
        <AddressInput
          value={''}
          onChange={mockOnChange}
          enableENSName={false}
        />
      );

      const addressField = await findByTestId('address input');
      fireEvent.change(addressField, { target: { value: MOCK_ADDRESS } });

      expect(mockOnChange).toHaveBeenCalledWith(MOCK_ADDRESS);
    });

    it(`should return the ENS name if ENSName is DISABLED and it inputs an ENS name`, async () => {
      const mockOnChange = jest.fn();

      const { findByTestId } = render(
        <AddressInput
          value={''}
          onChange={mockOnChange}
          enableENSName={false}
        />
      );

      const addressField = await findByTestId('address input');
      fireEvent.change(addressField, { target: { value: MOCK_ENS_NAME } });

      expect(mockOnChange).toHaveBeenCalledWith(MOCK_ENS_NAME);
    });

    it(`should populate the input with the ENS name if the value is an address`, async () => {});
    it(`should populate the input with the address if the value is an address and ENSName is DISABLED`, async () => {});
  });

  it(`should clear the input if the X is clicked`, async () => {
    const { findByTestId } = render(
      <AddressInput value={MOCK_ADDRESS} onChange={jest.fn()} />
    );

    const addressField = await findByTestId('address input');
    const clearAddressButton = await findByTestId('clear address');
    fireEvent.click(clearAddressButton);

    expect(addressField).toHaveDisplayValue('');
  });

  it(`should be disabled`, async () => {
    const { findByTestId } = render(
      <AddressInput value={MOCK_ADDRESS} onChange={jest.fn()} disabled={true} />
    );

    const addressField = await findByTestId('address input');

    expect(addressField).toBeDisabled();
  });

  it(`should show the avatar if the address is valid`, async () => {
    const { findByTestId } = render(
      <AddressInput
        value={MOCK_ADDRESS}
        onChange={jest.fn()}
        enableENSName={false}
      />
    );

    const addressAvatar = await findByTestId('avatar');

    expect(addressAvatar).toBeInTheDocument();
  });

  it(`should show the avatar if the ENS name is valid`, async () => {
    const { findByTestId } = render(
      <AddressInput value={MOCK_ADDRESS} onChange={jest.fn()} />
    );

    const addressAvatar = await findByTestId('avatar');

    expect(addressAvatar).toBeInTheDocument();
  });

  it(`shouldn't show the avatar if the address is invalid`, async () => {
    const { queryByTestId } = render(
      <AddressInput
        value={'0xinvalidAddress'}
        onChange={jest.fn()}
        enableENSName={false}
      />
    );

    const addressAvatar = queryByTestId('avatar');

    expect(addressAvatar).not.toBeInTheDocument();
  });

  it(`shouldn't show the avatar if the ENS name is invalid`, async () => {});
});
