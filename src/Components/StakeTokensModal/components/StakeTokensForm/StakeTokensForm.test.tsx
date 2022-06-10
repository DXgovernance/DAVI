import StakeTokensForm from './StakeTokensForm';
import { render } from 'utils/tests';
import { mockStakeTokensFormProps } from '../../fixture';

describe('StakeTokensForm', () => {
  it('StakeTokensForm renders properly', () => {
    const { container } = render(
      <StakeTokensForm {...mockStakeTokensFormProps} />
    );
    expect(container).toMatchSnapshot();
  });
});
