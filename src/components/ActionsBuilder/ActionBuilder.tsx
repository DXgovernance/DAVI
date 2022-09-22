import { Header as CardHeader } from 'components/Card';
import { OptionsList } from './OptionsList';
import { EditButton } from './common';
import { Option } from './types';
import { bulkEncodeCallsFromOptions } from 'hooks/Guilds/contracts/useEncodedCall';
import { AddEditOptionModal } from './AddEditOptionModal';
import { SidebarCard, SidebarCardHeaderSpaced } from 'components/SidebarCard';
import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetETHPermission } from 'Modules/Guilds/Hooks/useETHPermissions';

interface ActionsBuilderProps {
  options: Option[];
  editable?: boolean;
  onChange?: (options: Option[]) => void;
}

export const ActionsBuilder: React.FC<ActionsBuilderProps> = ({
  editable,
  options,
  onChange,
}) => {
  const { t } = useTranslation();

  // Checks permission after we save the actions
  const checkPermission = useGetETHPermission({
    guildAddress: '',
    from: '',
    to: '',
    funcSign: '',
  });

  const [isEditable, setIsEditable] = useState(editable);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editableOption, setEditableOption] = useState(null);

  const onEdit = () => setIsEditable(true);

  const onSave = useCallback(() => {
    const encodedOptions = bulkEncodeCallsFromOptions(options);
    console.log({ checkPermission });
    onChange(encodedOptions);
    setIsEditable(false);
  }, [onChange, options, checkPermission]);

  return (
    <SidebarCard
      header={
        <SidebarCardHeaderSpaced>
          <CardHeader>{t('actions_other')}</CardHeader>
          {editable && (
            <EditButton
              variant="secondary"
              onClick={() => (isEditable ? onSave() : onEdit())}
            >
              {isEditable ? t('save') : t('edit')}
            </EditButton>
          )}
        </SidebarCardHeaderSpaced>
      }
    >
      <OptionsList
        isEditable={isEditable}
        options={options}
        onChange={onChange}
        addOption={() => setShowAddModal(true)}
        editOption={option => {
          setEditableOption(option);
          setShowAddModal(true);
        }}
      />
      {showAddModal && (
        <AddEditOptionModal
          editableOption={editableOption}
          options={options}
          onDismiss={() => {
            setEditableOption(null);
            setShowAddModal(false);
          }}
          onChange={onChange}
        />
      )}
    </SidebarCard>
  );
};
