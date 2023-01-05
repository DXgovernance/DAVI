import styled from 'styled-components';
import { Segment } from 'components/ActionsBuilder/SupportedActions/common/infoLine';

export const RedWrapper = styled(Segment)`
  color: ${({ theme }) => theme.colors.red};
`;
