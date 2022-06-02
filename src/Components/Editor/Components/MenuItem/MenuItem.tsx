import { Item } from './MenuItem.styled';

interface Props {
  icon?: any;
  title: any;
  action?: any;
  isActive?: any;
}

const MenuItem = ({ icon, title, action, isActive = null }: Props) => {
  return (
    <Item active={isActive && isActive()} onClick={action} title={title}>
      {icon}
    </Item>
  );
};

export default MenuItem;
