import styled, { css } from 'styled-components';
import { Box } from 'components/primitives/Layout/Box';
import { Loading } from 'components/primitives/Loading';
import { ProposalState } from 'types/types.guilds.d';
import { ProposalStatusProps } from './types';
import { TimeDetail } from './TimeDetail';

const ProposalStatusWrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
`;

const Status = styled.div<{ bordered?: boolean }>`
  font-size: 0.8rem;
  font-weight: 600;
  display: flex;
  flex-direction: row;
  align-items: center;
  ${({ bordered }) =>
    bordered &&
    css`
      border: 1px solid ${({ theme }) => theme.colors.text};
      border-radius: ${({ theme }) => theme.radii.pill};
      padding-left: 0.5rem;
    `}
`;

const ProposalStatusDetail = styled(Box)<{ statusDetail?: ProposalState }>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin: 0.5rem;
  border-radius: 15px;
  border: 1px solid
    ${({ theme, statusDetail }) =>
      statusDetail === ProposalState.Failed
        ? theme.colors.failed
        : theme.colors.active};
  background-color: ${({ theme }) => theme.colors.bg1};
  color: ${({ theme, statusDetail }) =>
    statusDetail === ProposalState.Failed
      ? theme.colors.failed
      : theme.colors.active};
  padding: 0.25rem 0.4rem;
`;

const DetailText = styled(Box)`
  padding: 0 0.2rem;

  @media only screen and (min-width: 768px) {
    padding-right: 0.5rem;
  }
`;
export const ProposalStatus: React.FC<ProposalStatusProps> = ({
  status,
  endTime,
  bordered,
  hideTime,
}) => {
  return (
    <ProposalStatusWrapper>
      <Status test-id="proposal-status" bordered={hideTime ? false : bordered}>
        {!hideTime && (
          <DetailText>
            {endTime ? (
              <TimeDetail endTime={endTime} />
            ) : (
              <Loading
                test-id="skeleton"
                loading
                text
                skeletonProps={{ width: '50px' }}
              />
            )}
          </DetailText>
        )}
        {status ? (
          <ProposalStatusDetail statusDetail={status}>
            {' '}
            {status}
          </ProposalStatusDetail>
        ) : (
          <Loading
            test-id="skeleton"
            loading
            text
            skeletonProps={{ width: '50px' }}
          />
        )}
      </Status>
    </ProposalStatusWrapper>
  );
};
