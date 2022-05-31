import ActionRow from './Action';
import { AddButton } from './common/AddButton';
import { DataTag } from './common/DataTag';
import { EditButton } from './common/EditButton';
import { Grip } from './common/Grip';
import { ProposalOptionTag } from './common/ProposalOptionTag';
import { DecodedAction, Option } from './types';
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ActionModal } from 'Components/ActionsModal';
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

const OptionRow: React.FC<OptionRowProps> = ({
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

  function addAction(action: DecodedAction) {
    onChange({
      ...option,
      decodedActions: [...option.decodedActions, action],
    });
  }

  function updateAction(index: number, action: DecodedAction) {
    const updatedActions = option?.decodedActions.map((a, i) =>
      index === i ? action : a
    );
    onChange({ ...option, decodedActions: updatedActions });
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
          option?.actions?.map((action, index) => (
            <ActionRow key={index} call={action} isEditable={false} />
          ))}

        {isEditable && (
          <SortableContext
            items={option?.decodedActions?.map(action => action.id)}
            strategy={verticalListSortingStrategy}
          >
            {option?.decodedActions?.map((action, index) => {
              return (
                <ActionRow
                  key={index}
                  isEditable={true}
                  decodedAction={action}
                  onEdit={updatedAction => updateAction(index, updatedAction)}
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
        onAddAction={action => {
          addAction(action);
          setIsActionsModalOpen(false);
        }}
      />
    </OptionWrapper>
  );
};

export default OptionRow;
