import StakeTokensModal from "./StakeTokensModal";
import { render } from '../../utils/tests';
import { mockStakeTokensModalProps } from './fixture';

describe('StakeTokensModal', () => {
    it('StakeTokensModal renders properly', () => {
        const { container } = render(<StakeTokensModal {...mockStakeTokensModalProps} />);
        expect(container).toMatchSnapshot();
    });
    });
