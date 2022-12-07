import { ActionRow } from '../Action';
import { AddButton, DataTag, EditButton, Grip } from '../common';
import { ProposalOptionTag } from '../common';
import { DecodedAction, Option } from '../types';
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ActionModal } from 'components/ActionsModal';
import { useState } from 'react';
import {
  ActionsWrapper,
  Detail,
  DetailWrapper,
  OptionWrapper,
} from './Option.styled';
import { useTranslation } from 'react-i18next';
interface OptionRowProps {
  option: Option;
  isEditable?: boolean;
  onChange?: (updatedOption: Option) => void;
  editOption: (option: Option) => void;
}

export const OptionRow: React.FC<OptionRowProps> = ({
  isEditable,
  option,
  onChange,
  editOption,
}) => {
  const { t } = useTranslation();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: option.id });
  const [isActionsModalOpen, setIsActionsModalOpen] = useState(false);

  function addActions(actions: DecodedAction[]) {
    onChange({
      ...option,
      decodedActions: [...option.decodedActions, ...actions],
    });
  }

  function updateAction(action: DecodedAction) {
    const updatedActions = option?.decodedActions.map(a =>
      a.id === action.id ? action : a
    );
    onChange({
      ...option,
      decodedActions: updatedActions,
    });
  }

  function removeAction(action: DecodedAction) {
    const updatedActions = option?.decodedActions.filter(
      a => a.id !== action.id
    );
    onChange({
      ...option,
      decodedActions: updatedActions,
    });
  }

  const dndStyles = {
    transform: CSS.Translate.toString(transform),
    transition,
  };
  return (
    <OptionWrapper
      dragging={isDragging}
      ref={setNodeRef}
      style={dndStyles}
      {...attributes}
    >
      <DetailWrapper>
        <div>
          {isEditable && (
            <Detail {...listeners}>
              <Grip />
            </Detail>
          )}
          <Detail>
            <ProposalOptionTag option={option} />
          </Detail>
          <Detail>
            <DataTag>
              {t('onChainActions', { count: option?.decodedActions?.length })}
            </DataTag>
          </Detail>
        </div>
        {isEditable && (
          <div>
            <EditButton onClick={() => editOption(option)}>
              {t('edit')}
            </EditButton>
          </div>
        )}
      </DetailWrapper>

      <ActionsWrapper indented={isEditable}>
        {!isEditable &&
          option?.actions?.map((action, index) => {
            const permissionArgs = option?.permissions?.[index];
            return (
              <ActionRow
                key={index}
                call={action}
                decodedAction={option?.decodedActions?.[index]}
                isEditable={false}
                permissionArgs={permissionArgs}
                onEdit={updatedAction => updateAction(updatedAction)}
              />
            );
          })}

        {isEditable && (
          <SortableContext
            items={option?.decodedActions?.map(action => action.id)}
            strategy={verticalListSortingStrategy}
          >
            {option?.actions?.map((action, index) => {
              const permissionArgs = option?.permissions?.[index];
              return (
                <ActionRow
                  key={index}
                  call={action}
                  isEditable={true}
                  decodedAction={option?.decodedActions?.[index]}
                  permissionArgs={permissionArgs}
                  onEdit={updatedAction => updateAction(updatedAction)}
                  onRemove={targetAction => removeAction(targetAction)}
                />
              );
            })}
          </SortableContext>
        )}

        {isEditable && (
          <AddButton
            label={t('addAction')}
            onClick={() => setIsActionsModalOpen(true)}
          />
        )}
      </ActionsWrapper>

      <ActionModal
        isOpen={isActionsModalOpen}
        setIsOpen={setIsActionsModalOpen}
        onAddActions={action => {
          addActions(action);
          setIsActionsModalOpen(false);
        }}
        onEditAction={updateAction}
        isEditing={false}
      />
    </OptionWrapper>
  );
};
