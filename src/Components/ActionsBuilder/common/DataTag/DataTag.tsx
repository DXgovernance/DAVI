import React from 'react';
import styled from 'styled-components';

interface DataTagProps {
  children: React.ReactNode;
}

export const DataTag = styled.span<DataTagProps>`
  border-radius: 0.5rem;
  padding: 0.25rem 0.5rem;
  background: ${({ theme }) => theme.colors.muted};
  border: 1px solid ${({ theme }) => theme.colors.muted};
  color: ${({ color }) => color};
  border-color: ${({ color }) => color};
`;
