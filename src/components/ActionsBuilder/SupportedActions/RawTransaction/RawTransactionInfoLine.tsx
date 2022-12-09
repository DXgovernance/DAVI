import UndecodableCallInfoLine from 'components/ActionsBuilder/UndecodableCalls/UndecodableCallInfoLine';
import { ActionViewProps } from 'components/ActionsBuilder/SupportedActions';

const RawTransactionInfoLine: React.FC<ActionViewProps> = ({ decodedCall }) => {
  return (
    <UndecodableCallInfoLine
      call={{
        to: decodedCall?.to,
        value: decodedCall?.value,
        data: decodedCall?.optionalProps?.data,
      }}
    />
  );
};

export default RawTransactionInfoLine;
