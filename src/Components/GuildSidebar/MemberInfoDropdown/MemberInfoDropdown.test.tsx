import {
  MemberInfoDropdown,
  MemberInfoDropdownProps,
} from './MemberInfoDropdown';
import { render } from 'utils/tests';
import {
  closedWithData,
  closedWithoutData,
  openWithData,
  openWithoutData,
} from './fixtures';

const mockClosedWithoutData: MemberInfoDropdownProps = {
  ...closedWithoutData,
  onClose: jest.fn(),
};

const mockClosedWithData: MemberInfoDropdownProps = {
  ...closedWithData,
  onClose: jest.fn(),
  onShowStakeModal: jest.fn(),
  onWithdraw: jest.fn(),
};

const mockOpenWithoutData: MemberInfoDropdownProps = {
  ...openWithoutData,
  onClose: jest.fn(),
};

const mockOpenWithData: MemberInfoDropdownProps = {
  ...openWithData,
  onClose: jest.fn(),
  onShowStakeModal: jest.fn(),
  onWithdraw: jest.fn(),
};

describe('MemberInfoDropdown', () => {
  it('Should match snapshot in closed without data', () => {
    const { container } = render(
      <MemberInfoDropdown {...mockClosedWithoutData}>
        <button>Open</button>
      </MemberInfoDropdown>
    );
    expect(container).toMatchSnapshot();
  });

  it('Should match snapshot in closed with data', () => {
    const { container } = render(
      <MemberInfoDropdown {...mockClosedWithData}>
        <button>Open</button>
      </MemberInfoDropdown>
    );
    expect(container).toMatchSnapshot();
  });

  it('Should match snapshot when open without data', () => {
    const { container } = render(
      <MemberInfoDropdown {...mockOpenWithoutData}>
        <button>Open</button>
      </MemberInfoDropdown>
    );
    expect(container).toMatchSnapshot();
  });

  it('Should match snapshot when open with data', () => {
    const { container } = render(
      <MemberInfoDropdown {...mockOpenWithData}>
        <button>Open</button>
      </MemberInfoDropdown>
    );
    expect(container).toMatchSnapshot();
  });
});
