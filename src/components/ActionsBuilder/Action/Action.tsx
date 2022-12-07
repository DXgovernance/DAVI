import { useTranslation } from 'react-i18next';
import { CallDetails } from '../CallDetails';
import { getInfoLineView } from '../SupportedActions';
import UndecodableCallDetails from '../UndecodableCalls/UndecodableCallDetails';
import UndecodableCallInfoLine from '../UndecodableCalls/UndecodableCallInfoLine';
import { Call, DecodedAction } from '../types';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useDecodedCall } from 'hooks/Guilds/contracts/useDecodedCall';
import { useMemo, useState, useEffect } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import {
  CardActions,
  CardHeader,
  CardLabel,
  CardWrapperWithMargin,
  ChevronIcon,
  DetailWrapper,
  EditButtonWithMargin,
  GripWithMargin,
  SectionBody,
  SectionHeader,
  Separator,
} from './Action.styled';
import { ConfirmRemoveActionModal } from '../ConfirmRemoveActionModal';
import { ActionModal } from 'components/ActionsModal';
import { Permission } from 'components/ActionsBuilder/types';
import { useGetETHPermission } from 'Modules/Guilds/Hooks/useETHPermissions';
import { preventEmptyString } from 'utils';
import { useGuildConfig } from 'Modules/Guilds/Hooks/useGuildConfig';
interface ActionViewProps {
  call?: Call;
  decodedAction?: DecodedAction;
  isEditable?: boolean;
  permissionArgs?: Permission;
  onEdit?: (updatedCall: DecodedAction) => void;
  onRemove?: (updatedCall: DecodedAction) => void;
}

export enum CardStatus {
  dragging,
  normal,
  simulationFailed,
  warning,
  permissionDenied,
}

export const ActionRow: React.FC<ActionViewProps> = ({
  call,
  permissionArgs,
  decodedAction,
  isEditable,
  onEdit,
  onRemove,
}) => {
  const { t } = useTranslation();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: decodedAction?.id, disabled: !isEditable });
  const action = useDecodedCall(call);
  const permissionRegistryAddress = useGuildConfig(call?.from)?.data
    ?.permissionRegistry;
  const permission = useGetETHPermission({
    permissionRegistryAddress,
    from: permissionArgs?.from,
    to: permissionArgs?.to,
    callType: permissionArgs?.callType,
    functionSignature: permissionArgs?.functionSignature,
  })?.data;
  const permissionValues = permission?.split(',');
  const decodedCall = action.decodedCall || decodedAction?.decodedCall;
  const approval = action.approval || decodedAction?.approval;

  const [expanded, setExpanded] = useState(false);
  const [confirmRemoveActionModalIsOpen, setConfirmRemoveActionModalIsOpen] =
    useState(false);

  const [isEditActionModalOpen, setIsEditActionModalOpen] = useState(false);

  // Get renderable components for the action
  const InfoLine = getInfoLineView(decodedCall?.callType);

  const dndStyles = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  const cardStatus: CardStatus = useMemo(() => {
    if (isEditable && isDragging) return CardStatus.dragging;
    let hasValueTransferOnContractCall: boolean =
      decodedCall?.args && preventEmptyString(decodedCall?.value).gt(0);
    if (permissionValues?.includes('0')) {
      return CardStatus.permissionDenied;
    }
    if (!decodedCall || hasValueTransferOnContractCall)
      return CardStatus.warning;

    if (!decodedAction?.simulationResult) return CardStatus.normal;

    if (decodedAction?.simulationResult.simulation.status === false) {
      return CardStatus.simulationFailed;
    }
    return CardStatus.normal; // default return so ESLint doesn't complain
  }, [
    decodedCall,
    decodedAction?.simulationResult,
    isEditable,
    isDragging,
    permissionValues,
  ]);

  useEffect(() => {
    if (!onEdit || !decodedAction) return;
    if (
      cardStatus === CardStatus.permissionDenied &&
      decodedAction.actionDenied === true
    )
      return;
    if (
      cardStatus !== CardStatus.permissionDenied &&
      decodedAction.actionDenied === false
    )
      return;

    return onEdit({
      ...decodedAction,
      actionDenied: cardStatus === CardStatus.permissionDenied,
    });
  }, [cardStatus, onEdit, decodedAction]);
  return (
    <CardWrapperWithMargin
      cardStatus={cardStatus}
      ref={setNodeRef}
      style={dndStyles}
      {...attributes}
    >
      <CardHeader>
        <CardLabel>
          {isEditable && <GripWithMargin {...listeners} />}

          {InfoLine && (
            <InfoLine decodedCall={decodedCall} approveSpendTokens={approval} />
          )}
          {!decodedCall && <UndecodableCallInfoLine />}
        </CardLabel>
        <CardActions>
          {isEditable && (
            <EditButtonWithMargin
              onClick={() => setIsEditActionModalOpen(true)}
            >
              {t('edit')}
            </EditButtonWithMargin>
          )}
          {onRemove && (
            <EditButtonWithMargin
              onClick={() => setConfirmRemoveActionModalIsOpen(v => !v)}
            >
              {t('remove')}
            </EditButtonWithMargin>
          )}
          <ChevronIcon onClick={() => setExpanded(!expanded)}>
            {expanded ? (
              <FiChevronUp height={16} />
            ) : (
              <FiChevronDown height={16} />
            )}
          </ChevronIcon>
        </CardActions>
      </CardHeader>

      {expanded && (
        <>
          <Separator cardStatus={cardStatus} />
          {cardStatus === CardStatus.simulationFailed && (
            <>
              <DetailWrapper>
                <SectionHeader>
                  {t('simulations.simulationFailed')}
                </SectionHeader>
                <SectionBody>
                  {decodedAction.simulationResult.transaction.error_message}
                </SectionBody>
              </DetailWrapper>
              <Separator />
            </>
          )}
          {cardStatus === CardStatus.permissionDenied && (
            <>
              <DetailWrapper>
                <SectionHeader>
                  {t('permissions.permissionDenied')}
                </SectionHeader>
                <SectionBody>
                  {t('permissions.permissionDeniedMessage')}
                </SectionBody>
              </DetailWrapper>
              <Separator />
            </>
          )}
          <DetailWrapper>
            {decodedCall ? (
              <CallDetails
                decodedCall={decodedCall}
                approveSpendTokens={approval}
              />
            ) : (
              <UndecodableCallDetails call={call} />
            )}
          </DetailWrapper>
        </>
      )}
      <ConfirmRemoveActionModal
        isOpen={confirmRemoveActionModalIsOpen}
        onDismiss={() => {
          setConfirmRemoveActionModalIsOpen(false);
        }}
        onConfirm={() => {
          onRemove(decodedAction);
          setConfirmRemoveActionModalIsOpen(false);
        }}
      />

      {isEditActionModalOpen && (
        <ActionModal
          isOpen={isEditActionModalOpen}
          setIsOpen={setIsEditActionModalOpen}
          action={decodedAction}
          onAddActions={null}
          onEditAction={onEdit}
          isEditing={true}
        />
      )}
    </CardWrapperWithMargin>
  );
};
