import styled from 'styled-components';
import { Circle, Flex } from 'components/Primitives/Layout';

export const StatusWrapper = styled(Flex)`
  margin: 3rem 0px;
`;

export const SuccessCircle = styled(Circle)`
  color: ${({ theme }) => theme.colors.params['2']};
  border-color: ${({ theme }) => theme.colors.params['2']};
  background-color: transparent;
`;
export const WarningCircle = styled(Circle)`
  color: ${({ theme }) => theme.colors.red};
  border-color: ${({ theme }) => theme.colors.red};
  background-color: transparent;
`;

export const Message = styled.h3`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
  padding: 1.5rem 0 1rem 0;
`;

export const Muted = styled.p`
  font-family: Inter;
  font-size: 12px;
  font-weight: 600;
  line-height: 16px;
  letter-spacing: 0em;
  text-align: left;
  color: ${({ theme }) => theme.colors.proposalText.grey};
`;

export const TenderlyLogo = styled.img`
  margin-left: 0.5rem;
  height: 20px;
`;
