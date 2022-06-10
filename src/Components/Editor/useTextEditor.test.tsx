import { useTextEditor } from './useTextEditor';
import { renderHook } from '@testing-library/react-hooks';
import { render } from 'utils/tests';

jest.mock('contexts/index', () => jest.fn());

describe('Editor', () => {
  it('Should match snapshot', () => {
    console.error = jest.fn();
    const { result } = renderHook(() =>
      useTextEditor(`42/create-proposal`, 345600000, 'Enter proposal body')
    );
    const { Editor, EditorConfig } = result.current;
    const { container } = render(<Editor EditorConfig={EditorConfig} />, {
      container: document.body,
    });
    expect(container).toMatchSnapshot();
  });
});
