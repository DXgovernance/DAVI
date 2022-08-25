import styled from 'styled-components';
import { Button } from 'components/primitives/Button';

export const Wrapper = styled.div`
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.muted};
  border-radius: ${({ theme }) => theme.radii.curved};
  margin: 1.5rem;
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
`;

export const ConnectionStatusText = styled(Row)`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.proposalText.grey};
`;

export const ConnectionStatusRow = styled(Row)`
  justify-content: space-between;
  align-items: center;
`;

export const WalletAddressRow = styled(Row)`
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0.5rem 0 1rem 0;
`;

export const ExternalLink = styled.a`
  text-decoration: none;
`;

export const ConnectionActionButton = styled.a`
  color: ${({ theme }) => theme.colors.proposalText.grey};
  background-color: ${({ theme }) => theme.colors.modalBackground};
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 0;
  padding-right: 1rem;
  gap: 0.25rem;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const AddressText = styled.span`
  margin-left: 0.2rem;
  margin-right: 0.3rem;
`;

export const IconHolder = styled.span`
  display: flex;
  justify-content: center;

  @media only screen and (min-width: 768px) {
    margin-right: 0.3rem;
  }

  img {
    border-radius: 50%;
    margin-right: 0;
  }
`;

export const CenteredButton = styled(Button)`
  margin: auto;
  display: flex;
  margin-top: 20px;
`;
