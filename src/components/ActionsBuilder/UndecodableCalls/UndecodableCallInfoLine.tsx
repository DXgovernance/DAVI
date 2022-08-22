import styled, { useTheme } from 'styled-components';
import { FiAlertCircle } from 'react-icons/fi';
import { Segment } from '../SupportedActions/common/infoLine';
import { useTranslation } from 'react-i18next';

const SegmentRed = styled(Segment)`
  color: ${({ theme }) => theme.colors.red};
`;

const UndecodableCallInfoLine: React.FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  return (
    <>
      <Segment>
        <FiAlertCircle size={16} color={theme.colors.red} />
      </Segment>
      <SegmentRed>{t('unknownAction')}</SegmentRed>
    </>
  );
};

export default UndecodableCallInfoLine;
