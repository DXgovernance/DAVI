import styled from 'styled-components';
import { Flex } from 'components/primitives/Layout';

export const StatusWrapper = styled(Flex)`
  margin: 3rem 0px;
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
  color: ${({ theme }) => theme.colors.grey};
`;

export const TenderlyLogo = styled.img`
  margin-left: 0.5rem;
  height: 20px;
`;
