import { AddressInput } from '../AddressInput';
import { render } from 'utils/tests';
import { fireEvent } from '@testing-library/react';
import { MOCK_ADDRESS } from './fixtures';
import { NumericalInput } from '../NumericalInput';

jest.mock('wagmi', () => ({
  useEnsAddress: () => ({
    data: MOCK_ADDRESS,
    isError: false,
    isLoading: false,
  }),
  useEnsName: () => ({
    data: 'name.eth',
  }),
  useEnsResolver: () => ({
    data: {
      name: 'name.eth',
      address: '0x0000000000000000000000000000000000000000',
    },
  }),
  useContractRead: () => ({
    data: 'e30101701220e09973e8c9e391cb063bd6654356e64e0ceced7858a29a8c01b165e30a5eb5be',
  }),
  useContractReads: () => ({
    data: [{}],
  }),
}));

const AddressInputWithDefaultValue = () => {
  return (
    <AddressInput
      value={MOCK_ADDRESS}
      defaultValue={MOCK_ADDRESS}
      onChange={jest.fn()}
    />
  );
};

const AddressInputWithoutDefaultValue = () => {
  return <AddressInput value={MOCK_ADDRESS} onChange={jest.fn()} />;
};

const NumericalInputWithDefaultValue = () => {
  return <NumericalInput value={MOCK_ADDRESS} defaultValue={MOCK_ADDRESS} />;
};

const NumericalInputWithoutDefaultValue = () => {
  return <NumericalInput value={MOCK_ADDRESS} />;
};

describe('Icon Right on Address Input', () => {
  let getByLabelText;

  describe('Address Input with default value', () => {
    beforeEach(() => {
      let result = render(<AddressInputWithDefaultValue />);
      getByLabelText = result.getByLabelText;
    });

    it('should show unlock icon', () => {
      const unlockIconButton = getByLabelText('enable');
      expect(unlockIconButton).toBeDefined();
    });

    it('should be disabled', () => {
      const addressInput = getByLabelText('address input');
      expect(addressInput).toBeDisabled();
    });

    it('should remove unlock icon when clicked', () => {
      const unlockIconButton = getByLabelText('enable');
      fireEvent.click(unlockIconButton);
      const clearInputIcon = getByLabelText('clear address');
      expect(clearInputIcon).toBeDefined();
    });

    it('should be enabled when clicked', () => {
      const unlockIconButton = getByLabelText('enable');
      const addressInput = getByLabelText('address input');
      fireEvent.click(unlockIconButton);
      expect(addressInput).toBeEnabled();
    });
  });

  describe('Address Input without default value', () => {
    beforeEach(() => {
      let result = render(<AddressInputWithoutDefaultValue />);
      getByLabelText = result.getByLabelText;
    });

    it('should show the clear input icon when it has a value', () => {
      const clearInputIcon = getByLabelText('clear address');
      expect(clearInputIcon).toBeDefined();
    });
  });
});

describe('Icon Right on Numerical Input', () => {
  let getByLabelText;

  describe('Numerical Input with default value', () => {
    beforeEach(() => {
      let result = render(<NumericalInputWithDefaultValue />);
      getByLabelText = result.getByLabelText;
    });

    it('should show unlock icon', () => {
      const unlockIconButton = getByLabelText('enable');
      expect(unlockIconButton).toBeDefined();
    });

    it('should be disabled', () => {
      const addressInput = getByLabelText('numerical input');
      expect(addressInput).toBeDisabled();
    });

    it('should remove unlock icon when clicked', () => {
      const unlockIconButton = getByLabelText('enable');
      fireEvent.click(unlockIconButton);
      const clearInputIcon = getByLabelText('clear number');
      expect(clearInputIcon).toBeDefined();
    });

    it('should be enabled when clicked', () => {
      const unlockIconButton = getByLabelText('enable');
      const addressInput = getByLabelText('numerical input');
      fireEvent.click(unlockIconButton);
      expect(addressInput).toBeEnabled();
    });
  });

  describe('Numerical Input without default value', () => {
    beforeEach(() => {
      let result = render(<NumericalInputWithoutDefaultValue />);
      getByLabelText = result.getByLabelText;
    });

    it('should show the clear input icon when it has a value', () => {
      const clearInputIcon = getByLabelText('clear number');
      expect(clearInputIcon).toBeDefined();
    });
  });
});
