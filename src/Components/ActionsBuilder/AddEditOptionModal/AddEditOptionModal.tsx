import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'styled-components';
import { Box } from 'Components/Primitives/Layout/Box';
import { Modal } from 'Components';
import { Button } from 'old-components/Guilds/common/Button';
import { Option } from '../types';
import Input from 'old-components/Guilds/common/Form/Input';
import { DeleteButton, Dot } from './AddEditOptionModal.styled';

interface AddEditOptionModalProps {
  onDismiss: () => void;
  editableOption?: Option;
  onChange: (options: Option[]) => void;
  options: Option[];
}

export const AddEditOptionModal: React.FC<AddEditOptionModalProps> = ({
  editableOption,
  options,
  onDismiss,
  onChange,
}) => {
  const defaultLabel = editableOption?.label ?? '';
  const isEditable = !!editableOption;
  const [label, setLabel] = React.useState<string>(defaultLabel);
  const theme = useTheme();
  const { t } = useTranslation();

  const handleConfirmSave = () => {
    isEditable
      ? editOption({ ...editableOption, label })
      : saveNewOption(label);
  };

  const saveNewOption = (label: string) => {
    const newOptions = [
      ...options,
      {
        id: `option-${options.length}-${label}`,
        label,
        color: theme?.colors?.votes?.[options.length + 1],
        decodedActions: [],
      },
    ];
    onChange(newOptions);
    onDismiss();
  };

  const editOption = (option: Option) => {
    const newOptions = options.map(opt => {
      if (opt.id === option.id) {
        return {
          ...opt,
          label: option.label,
        };
      }
      return opt;
    });
    onChange(newOptions);
    onDismiss();
  };

  const deleteOption = () => {
    if (!isEditable) return;
    const newOptions = options.filter(opt => opt.id !== editableOption.id);
    onChange(newOptions);
    onDismiss();
  };
  return (
    <Modal
      isOpen
      onDismiss={onDismiss}
      header={!!editableOption ? t('editOption') : t('addOption')}
      maxWidth={300}
    >
      <Box padding="1rem 2rem">
        <Box padding="0 0 1rem 0">
          <Input
            value={label}
            placeholder={t('optionLabel')}
            icon={<Dot color={theme?.colors?.votes?.[options.length + 1]} />}
            onChange={e => setLabel(e.target.value)}
          />
        </Box>

        {!!editableOption && (
          <Box padding="0 0 1rem 0">
            <DeleteButton onClick={deleteOption} fullWidth variant="secondary">
              {t('deleteOption')}
            </DeleteButton>
          </Box>
        )}

        <Box>
          <Button
            disabled={defaultLabel === label}
            fullWidth
            onClick={handleConfirmSave}
          >
            {t('save')}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
