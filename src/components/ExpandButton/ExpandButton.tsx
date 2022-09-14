import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import styled from 'styled-components';

const ButtonWrapper = styled.span<{
  height: string;
  width: string;
}>`
  cursor: pointer;
  height: ${({ height }) => height};
  width: ${({ width }) => width};
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.colors.border1};
  display: inline-flex;
  justify-content: center;
  align-items: center;
  &:hover {
    border-color: ${({ theme }) => theme.colors.border3};
  }
`;

interface ExpandButtonProps {
  expanded: boolean;
  size?: number;
  height?: string;
  width?: string;
  [propName: string]: {};
}

export const ExpandButton: React.FC<ExpandButtonProps> = ({
  expanded,
  size = 16,
  height = '1.25rem',
  width = '1.25rem',
  ...rest
}) => {
  return (
    <ButtonWrapper height={height} width={width} {...rest}>
      {expanded ? (
        <FiChevronUp height={size} />
      ) : (
        <FiChevronDown height={size} />
      )}
    </ButtonWrapper>
  );
};
