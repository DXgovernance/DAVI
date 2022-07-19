import { render } from 'utils/tests';
import { SimulationState } from '../types';
import { SimulationModal } from './SimulationModal';

jest.mock('contexts/index', () => jest.fn());

describe('Simulation modal', () => {
  it(`Should match 'pending' status snapshot`, () => {
    const { container } = render(
      <SimulationModal
        isOpen={true}
        onDismiss={jest.fn()}
        status={SimulationState.pending}
      />
    );

    expect(container).toMatchSnapshot();
  });

  it(`Should match 'allPassed' status snapshot`, () => {
    const { container } = render(
      <SimulationModal
        isOpen={true}
        onDismiss={jest.fn()}
        status={SimulationState.allPassed}
      />
    );

    expect(container).toMatchSnapshot();
  });

  it(`Should match 'someFailed' status snapshot`, () => {
    const { container } = render(
      <SimulationModal
        isOpen={true}
        onDismiss={jest.fn()}
        status={SimulationState.someFailed}
      />
    );

    expect(container).toMatchSnapshot();
  });

  it(`Should match 'error' status snapshot`, () => {
    const { container } = render(
      <SimulationModal
        isOpen={true}
        onDismiss={jest.fn()}
        status={SimulationState.error}
      />
    );

    expect(container).toMatchSnapshot();
  });
});
