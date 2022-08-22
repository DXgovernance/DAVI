import { fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ExecuteButton from '.';
import { render } from 'utils/tests';

let mockedIsExecutable = true;
let mockedExecuteProposal = jest.fn();
jest.mock('hooks/Guilds/useExecutable', () => ({
  __esModule: true,
  default: () => ({
    data: {
      isExecutable: mockedIsExecutable,
      executeProposal: mockedExecuteProposal,
    },
    loading: false,
    error: null,
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
