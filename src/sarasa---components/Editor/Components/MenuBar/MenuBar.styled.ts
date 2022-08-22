import styled from 'styled-components';
import { transparentize } from 'polished';

export const Header = styled.div`
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.initial};
  display: flex;
  flex: 0 0 auto;
  flex-wrap: wrap;
  padding: 1rem;
`;

export const Divider = styled.div`
  background-color: ${({ theme }) => transparentize(0.9, theme.colors.primary)};
  height: 1.25rem;
  margin-left: 0.5rem;
  margin-right: 0.75rem;
  width: 2px;
`;
