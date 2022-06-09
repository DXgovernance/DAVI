import { OptionListItemProps } from '../types';
import {
  OptionDetail,
  OptionIcon,
  OptionItem,
  OptionSubtitle,
  OptionTitle,
} from './OptionListItem.styled';

const OptionListItem: React.FC<OptionListItemProps> = ({ item, onSelect }) => {
  return (
    <OptionItem onClick={onSelect}>
      <OptionDetail>
        <OptionIcon>ICON</OptionIcon>
        <div>
          <OptionTitle>{item.title}</OptionTitle>
          <OptionSubtitle>{item.subtitle}</OptionSubtitle>
        </div>
      </OptionDetail>
      <div>{item.balance}</div>
    </OptionItem>
  );
};

export default OptionListItem;
