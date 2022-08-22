import { Item } from './MenuItem.styled';
import { MenuItemProps } from './types';

const MenuItem = ({ icon, title, action, isActive = null }: MenuItemProps) => {
  return (
    <Item active={isActive && isActive()} onClick={action} title={title}>
      {icon}
    </Item>
  );
};

export default MenuItem;
