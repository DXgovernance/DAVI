import { render } from 'utils/tests';
import { IntegerInput } from './IntegerInput';
import { fireEvent, screen } from '@testing-library/react';

describe('IntegerInput', () => {
  it('should prevent users from inputting a dot (.)', async () => {
    let value = '';
    const mockOnChange = jest.fn();
    render(
      <IntegerInput
        value={value}
        onChange={mockOnChange}
        name={'integer input'}
      />
    );

    const integerField: HTMLInputElement = screen.getByRole('textbox');
    fireEvent.change(integerField, { target: { value: '1.05' } });

    expect(mockOnChange).toHaveBeenCalledWith('105');
  });

  it('should prevent users from inputting a comma (,)', async () => {
    let value = '';
    const mockOnChange = jest.fn();
    render(
      <IntegerInput
        value={value}
        onChange={mockOnChange}
        name={'integer input'}
      />
    );

    const integerField: HTMLInputElement = screen.getByRole('textbox');
    fireEvent.change(integerField, { target: { value: '1,05' } });

    expect(mockOnChange).toHaveBeenCalledWith('105');
  });

  it('should parse a value passed to it correctly', async () => {
    let value = '105';
    const mockOnChange = jest.fn();
    render(
      <IntegerInput
        value={value}
        onChange={mockOnChange}
        name={'integer input'}
      />
    );

    const integerField: HTMLInputElement = screen.getByRole('textbox');

    expect(integerField.value).toBe('105');
  });

  it('should sanitize a value with a dot', async () => {
    let value = '1.05';
    const mockOnChange = jest.fn();
    render(
      <IntegerInput
        value={value}
        onChange={mockOnChange}
        name={'integer input'}
      />
    );

    const integerField: HTMLInputElement = screen.getByRole('textbox');

    expect(integerField.value).toBe('105');
  });
});
