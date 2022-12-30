import { fireEvent, screen } from '@testing-library/react';
import { render } from 'utils/tests';
import { Box } from '../Layout';
import { Modal } from './Modal';

const Content = () => {
  return (
    <Box padding={'3rem'} data-testid={'content'}>
      Content of the modal
    </Box>
  );
};

const mockOnDismiss = jest.fn();

describe('Modal', () => {
  let modal;
  let content;

  beforeEach(() => {
    render(
      <Modal isOpen onDismiss={mockOnDismiss} dataTestId={'modal'}>
        <Content />
      </Modal>
    );

    modal = screen.getByTestId('modal').firstElementChild;
    content = screen.getByTestId('content');
  });

  it('should trigger onDismiss when a full click (onMouseDown and onMouseUp) is made in the backdrop', async () => {
    fireEvent.mouseDown(modal);
    fireEvent.mouseUp(modal);
    expect(mockOnDismiss).toHaveBeenCalled();
  });

  it("shouldn't trigger onDismiss if a click is made inside the component", async () => {
    fireEvent.mouseDown(content);
    fireEvent.mouseUp(content);
    expect(mockOnDismiss).not.toHaveBeenCalled();
  });

  it("shouldn't trigger onDismiss if a click started on the backdrop but ends inside the component", async () => {
    fireEvent.mouseDown(modal);
    fireEvent.mouseUp(content);
    expect(mockOnDismiss).not.toHaveBeenCalled();
  });

  it("shouldn't trigger onDismiss if a click on the component and ends in the backdrop", async () => {
    fireEvent.mouseDown(content);
    fireEvent.mouseUp(modal);
    expect(mockOnDismiss).not.toHaveBeenCalled();
  });
});
