import { Modal } from 'old-components/Guilds/common/Modal';
import { PickerProps } from './types';
import { MainWrapper, OptionList } from './Picker.styled';
import { OptionListItem } from './OptionListItem';

const Picker: React.FC<PickerProps> = ({ data, isOpen, onSelect, onClose }) => {
  return (
    <Modal
      header={'Some header'}
      isOpen={isOpen}
      onDismiss={onClose}
      maxWidth={390}
    >
      <MainWrapper>
        <OptionList>
          {data.map((option, index) => (
            <OptionListItem
              key={index}
              item={option}
              onSelect={() => onSelect(option.title)}
            />
          ))}
        </OptionList>
      </MainWrapper>
    </Modal>
  );
};

export default Picker;
