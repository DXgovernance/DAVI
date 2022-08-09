import { Header as CardHeader } from 'old-components/Guilds/common/Card';
import { OptionsList } from './OptionsList';
import { EditButton } from './common';
import { Option } from './types';
import { bulkEncodeCallsFromOptions } from 'hooks/Guilds/contracts/useEncodedCall';
import { AddEditOptionModal } from './AddEditOptionModal';
import SidebarCard, {
  SidebarCardHeaderSpaced,
} from 'old-components/Guilds/SidebarCard';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

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

  const [isEditable, setIsEditable] = useState(editable);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editableOption, setEditableOption] = useState(null);

  const onEdit = () => setIsEditable(true);

  const onSave = () => {
    const encodedOptions = bulkEncodeCallsFromOptions(options);
    onChange(encodedOptions);
    setIsEditable(false);
  };
  // console.log({ options, bulked: bulkEncodeCallsFromOptions(options) });

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
