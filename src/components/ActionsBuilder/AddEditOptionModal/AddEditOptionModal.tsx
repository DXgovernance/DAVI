import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'styled-components';
import { Box } from 'components/primitives/Layout/Box';
import { Modal } from 'components/primitives/Modal';
import { Button } from 'components/primitives/Button';
import { Option } from '../types';
import { Input } from 'components/primitives/Forms/Input';
import { DeleteButton, Dot } from './AddEditOptionModal.styled';
import { normalizeString } from 'utils';
import { ErrorLabel } from 'components/primitives/Forms/ErrorLabel';

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
  const isEditing = !!editableOption;
  const [label, setLabel] = React.useState<string>(defaultLabel);
  const [error, setError] = React.useState<string>('');
  const theme = useTheme();
  const { t } = useTranslation();

  const validate = (): boolean => {
    if (
      options
        .filter(option => option.id !== editableOption?.id)
        .some(
          option =>
            normalizeString(option.label) === normalizeString(label) ||
            normalizeString(label) === 'against'
        )
    ) {
      setError(`Label "${label}" already exists`);
      return false;
    }
    return true;
  };
  const handleConfirmSave = () => {
    const isValid = validate();
    if (!isValid) return;
    isEditing ? editOption({ ...editableOption, label }) : saveNewOption(label);
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
    if (!isEditing) return;
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
            icon={
              <Dot
                color={
                  isEditing
                    ? editableOption.color
                    : theme?.colors?.votes?.[options.length + 1]
                }
              />
            }
            onChange={e => setLabel(e.target.value)}
          />
        </Box>

        {error && (
          <Box padding="0 0 1rem">
            <ErrorLabel>{error}</ErrorLabel>
          </Box>
        )}

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
