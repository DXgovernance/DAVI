import { fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ExecuteButton } from './ExecuteButton';
import { render } from 'utils/tests';

let mockedExecuteProposal = jest.fn();
jest.mock('stores', () => ({
  useHookStoreProvider: () => ({
    hooks: { writers: { useExecuteProposal: mockedExecuteProposal } },
  }),
}));

describe('Execute Button', () => {
  beforeAll(() => {
    render(<ExecuteButton executeProposal={mockedExecuteProposal} />);
  });

  it('User is able to click button to execute', async () => {
    const button = screen.queryByTestId('execute-btn');
    fireEvent.click(button);
    await waitFor(() => {
      expect(mockedExecuteProposal).toHaveBeenCalledTimes(1);
    });
  });
});
