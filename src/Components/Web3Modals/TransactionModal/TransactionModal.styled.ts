import styled from 'styled-components';
// import { Button } from 'old-components/Guilds/common/Button';
import { Flex } from 'Components/Primitives/Layout';

// export const ModalButton = styled(Button)`
//   margin: 0 0 16px 0;
//   width: 90%;
//   background-color: ${({ theme }) => theme.colors.primary};
//   color: ${({ theme }) => theme.colors.background};
//   :hover:enabled {
//     background-color: ${({ theme }) => theme.colors.background};
//     color: ${({ theme }) => theme.colors.primary};
//   }
// `;

export const Container = styled.div`
  margin: 0.5rem 0 1rem 0;
`;

export const Header = styled(Flex)`
  margin-top: 2rem;
`;
