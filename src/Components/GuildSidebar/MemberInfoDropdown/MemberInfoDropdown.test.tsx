import { MemberInfoDropdown } from './MemberInfoDropdown';
import { render } from 'utils/tests';
import {
  closedWithData,
  closedWithoutData,
  openWithData,
  openWithoutData,
} from './fixtures';

describe('MemberInfoDropdown', () => {
  it('Should match snapshot in closed without data', () => {
    const { container } = render(
      <MemberInfoDropdown {...closedWithoutData}>
        <button>Open</button>
      </MemberInfoDropdown>
    );
    expect(container).toMatchSnapshot();
  });

  it('Should match snapshot in closed with data', () => {
    const { container } = render(
      <MemberInfoDropdown {...closedWithData}>
        <button>Open</button>
      </MemberInfoDropdown>
    );
    expect(container).toMatchSnapshot();
  });

  it('Should match snapshot when open without data', () => {
    const { container } = render(
      <MemberInfoDropdown {...openWithoutData}>
        <button>Open</button>
      </MemberInfoDropdown>
    );
    expect(container).toMatchSnapshot();
  });

  it('Should match snapshot when open with data', () => {
    const { container } = render(
      <MemberInfoDropdown {...openWithData}>
        <button>Open</button>
      </MemberInfoDropdown>
    );
    expect(container).toMatchSnapshot();
  });
});
