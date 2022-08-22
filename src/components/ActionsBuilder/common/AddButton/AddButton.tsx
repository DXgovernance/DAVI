import { IconButton } from 'components/Primitives/Button';
import { AiOutlinePlus } from 'react-icons/ai';
import styled from 'styled-components';

interface ActionButtonProps {
  label: string;
  onClick?: () => void;
  [propName: string]: {};
}

const StyledIconButton = styled(IconButton)`
  padding: 0.6rem 1.25rem;
  margin: 0.5rem 0;
`;

export const AddButton: React.FC<ActionButtonProps> = ({
  label,
  onClick,
  ...rest
}) => {
  return (
    <StyledIconButton iconLeft onClick={onClick} {...rest}>
      <AiOutlinePlus /> {label}
    </StyledIconButton>
  );
};
