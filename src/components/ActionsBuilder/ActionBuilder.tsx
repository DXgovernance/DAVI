import { Header as CardHeader } from 'components/Card';
import { OptionsList } from './OptionsList';
import { EditButton } from './common';
import { Option } from './types';
import { bulkEncodeCallsFromOptions } from 'hooks/Guilds/contracts/useEncodedCall';
import { AddEditOptionModal } from './AddEditOptionModal';
import { SidebarCard, SidebarCardHeaderSpaced } from 'components/SidebarCard';
import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { SupportedAction } from './types';
import Web3 from 'web3';

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
  const web3 = new Web3();
  const { t } = useTranslation();
  const [isEditable, setIsEditable] = useState(editable);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editableOption, setEditableOption] = useState(null);
  const [permissions, setPermissions] = useState([]);
  const [optionsWithPermissions, setOptionsWithPermissions] = useState([]);
  console.log({ permissions })
  console.log({ optionsWithPermissions })
  const onEdit = () => setIsEditable(true);

  const onSave = useCallback(() => {
    const decodedActions = options?.flatMap(option => option?.decodedActions);
    const permissionParameters = decodedActions.map(decodedAction => {
      const functionInputs = decodedAction?.decodedCall?.function?.inputs?.map(
        input => input.type
      );
      const functionName = decodedAction?.decodedCall?.function?.name;
      const functionSignature = web3.eth.abi.encodeFunctionSignature(
        `${functionName}(${functionInputs.join(',')})`
      );
      console.log({ functionSignature })
      switch (decodedAction.decodedCall.callType) {
        case SupportedAction.ERC20_TRANSFER:
          return {
            from: decodedAction.decodedCall.from,
            to: decodedAction.decodedCall.to,
            funcSign: functionSignature,
          };
        case SupportedAction.ENS_UPDATE_CONTENT:
          return {
            from: decodedAction.decodedCall.from,
            to: decodedAction.decodedCall.to,
            funcSign: functionSignature,
          };
        case SupportedAction.GENERIC_CALL:
          return {
            from: decodedAction.decodedCall.from,
            to: decodedAction.decodedCall.to,
            funcSign: functionSignature,
          };
        case SupportedAction.SET_PERMISSIONS:
          return {
            from: decodedAction.decodedCall.from,
            to: decodedAction.decodedCall.to,
            funcSign: functionSignature,
          };
        case SupportedAction.REP_MINT:
          return {
            from: decodedAction.decodedCall.from,
            to: decodedAction.decodedCall.to,
            funcSign: functionSignature,
          };
        case SupportedAction.NATIVE_TRANSFER:
          return true;
        default:
          throw new Error('Unsupported action type');
      }
    });

    Promise.all(permissionParameters)
      .then(() => setPermissions(permissionParameters))
      .then(() => {
        const newOptions = options.map(option => ({
          ...option, permissions: permissionParameters
        }));
        setOptionsWithPermissions(newOptions)
      })

    const encodedOptions = bulkEncodeCallsFromOptions(options);
    onChange(encodedOptions);
    setIsEditable(false);
  }, [options, onChange, web3.eth.abi]);
  console.log({ permissions})

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
