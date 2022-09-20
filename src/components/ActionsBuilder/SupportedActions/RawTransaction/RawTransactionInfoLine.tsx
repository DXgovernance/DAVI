import UndecodableCallInfoLine from 'components/ActionsBuilder/UndecodableCalls/UndecodableCallInfoLine';
import { useMemo } from 'react';
import { ActionViewProps } from '..';

const RawTransactionInfoLine: React.FC<ActionViewProps> = ({ decodedCall }) => {
  const parsedData = useMemo(() => {
    return {
      to: decodedCall?.to,
      value: decodedCall?.value,
    };
  }, [decodedCall]);

  return <UndecodableCallInfoLine call={parsedData} />;
};

export default RawTransactionInfoLine;
