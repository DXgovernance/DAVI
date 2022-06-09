import { Modal } from 'old-components/Guilds/common/Modal';
import styled from 'styled-components';
import { PickerProps } from './types';

const MainWrapper = styled.div`
  margin: 2rem;
`;

const OptionList = styled.div`
  display: flex;
  flex-direction: column;
`;

const Picker: React.FC<PickerProps> = ({ data, isOpen, onSelect, onClose }) => {
  console.log(data);
  return (
    <Modal
      header={'Some header'}
      isOpen={isOpen}
      onDismiss={onClose}
      maxWidth={390}
    >
      <MainWrapper>
        <OptionList>{data.map(option => option.title)}</OptionList>
      </MainWrapper>
    </Modal>
  );
};

export default Picker;
