import { CallDetails } from '../CallDetails';
import { getInfoLineView, getSummaryView } from '../SupportedActions';
import UndecodableCallDetails from '../UndecodableCalls/UndecodableCallDetails';
import UndecodableCallInfoLine from '../UndecodableCalls/UndecodableCallInfoLine';
import { Call, DecodedAction } from '../types';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useDecodedCall } from 'hooks/Guilds/contracts/useDecodedCall';
import { useState } from 'react';
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
  TabButton,
} from './Action.styled';
import { useTranslation } from 'react-i18next';

interface ActionViewProps {
  call?: Call;
  decodedAction?: DecodedAction;
  isEditable?: boolean;
  onEdit?: (updatedCall: DecodedAction) => void;
}

export const ActionRow: React.FC<ActionViewProps> = ({
  call,
  decodedAction,
  isEditable,
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

  const decodedCall = action.decodedCall || decodedAction?.decodedCall;
  const approval = action.approval || decodedAction?.approval;

  const [expanded, setExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  // Get renderable components for the action
  const InfoLine = getInfoLineView(decodedCall?.callType);
  const ActionSummary = getSummaryView(decodedCall?.callType);

  const dndStyles = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  return (
    <CardWrapperWithMargin
      dragging={isEditable && isDragging}
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
            <EditButtonWithMargin>{t('edit')}</EditButtonWithMargin>
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
          {ActionSummary && (
            <DetailWrapper>
              <TabButton
                variant="secondary"
                active={activeTab === 0}
                onClick={() => setActiveTab(0)}
              >
                {t('default')}
              </TabButton>
              <TabButton
                active={activeTab === 1}
                onClick={() => setActiveTab(1)}
              >
                {t('functionCalls')}
              </TabButton>
            </DetailWrapper>
          )}

          {ActionSummary && activeTab === 0 && (
            <DetailWrapper>
              <ActionSummary decodedCall={decodedCall} />
            </DetailWrapper>
          )}

          {(!ActionSummary || activeTab === 1) && (
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
          )}
        </>
      )}
    </CardWrapperWithMargin>
  );
};