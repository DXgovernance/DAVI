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
import { SupportedAction } from './types';
import { useTypedParams } from 'Modules/Guilds/Hooks/useTypedParams';
import Web3 from "web3";

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
  const web3 = new Web3()
  const { t } = useTranslation();
  const { guildId: guildAddress } = useTypedParams();
  const [isEditable, setIsEditable] = useState(editable);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editableOption, setEditableOption] = useState(null);
  const [permissions, setPermissions] = useState([]);

  const ethPermission = useGetETHPermission({
    guildAddress,
    from: permissions[0]?.from,
    to: permissions[0]?.to,
    funcSign: permissions[0]?.funcSign,
  })
  console.log({ ethPermission})
  const onEdit = () => setIsEditable(true);

  const onSave = useCallback(() => {
    const decodedActions = options[0]?.decodedActions;
    const permissionParameters = decodedActions.map(action => {
      const functionInputs = action?.decodedCall?.function?.inputs?.map(input => input.type)
      const functionName = action?.decodedCall?.function?.name
      const functionSignature = web3.eth.abi.encodeFunctionSignature(`${functionName}(${functionInputs.join(',')})`)
      switch (action.decodedCall.callType) {
        case SupportedAction.ERC20_TRANSFER:
          return {
            from: action.decodedCall.from,
            to: action.decodedCall.to,
            funcSign: functionSignature,
          };
        case SupportedAction.ENS_UPDATE_CONTENT:
          return {
            from: action.decodedCall.from,
            to: action.decodedCall.to,
            funcSign: functionSignature,
          };
        case SupportedAction.GENERIC_CALL:
          return {
            from: action.decodedCall.from,
            to: action.decodedCall.to,
            funcSign: functionSignature,
          };
        case SupportedAction.SET_PERMISSIONS:
          return {
            from: action.decodedCall.from,
            to: action.decodedCall.to,
            funcSign: functionSignature,
          };
        case SupportedAction.REP_MINT:
          return {
            from: action.decodedCall.from,
            to: action.decodedCall.to,
            funcSign: functionSignature,
          };
          case SupportedAction.NATIVE_TRANSFER:
            return {
            from: action.decodedCall.from,
            to: action.decodedCall.to,
            funcSign: "",
            };
        default:
          throw new Error('Unsupported action type');
      }
    
    });

    Promise.all(permissionParameters).then(() => setPermissions(permissions))
    
    const encodedOptions = bulkEncodeCallsFromOptions(options);
    onChange(encodedOptions);
    setIsEditable(false);
  }, [options, permissions, onChange, web3.eth.abi]);

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
