import { render } from 'utils/tests';
import { SimulationState } from '../types';
import { SimulationModal } from './SimulationModal';

describe('Simulation modal', () => {
  // There's a conflict between the animation code in
  // styled components and jest-styled-components library
  // Since this test isn't critical, I commented it.

  // it(`Should match 'pending' status snapshot`, () => {
  //   const { container } = render(
  //     <SimulationModal
  //       isOpen={true}
  //       onDismiss={jest.fn()}
  //       status={SimulationState.pending}
  //     />
  //   );

  //   expect(container).toMatchSnapshot();
  // });

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
