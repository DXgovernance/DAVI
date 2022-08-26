import { IconButton } from 'components/primitives/Button';
import { Result, ResultState } from 'components/Result';
import { UnstyledLink } from 'components/primitives/Links';
import { FiArrowLeft } from 'react-icons/fi';
import { useTypedParams } from '../Hooks/useTypedParams';
import { useTranslation } from 'react-i18next';

const NotFound: React.FC = () => {
  const { chainName } = useTypedParams();
  const { t } = useTranslation();

  return (
    <Result
      state={ResultState.ERROR}
      title={t('pageNotExist')}
      subtitle={t('makeSureCorrectAddress')}
      extra={
        <UnstyledLink to={`/${chainName}`}>
          <IconButton iconLeft>
            <FiArrowLeft /> {t('takeMeHome')}
          </IconButton>
        </UnstyledLink>
      }
    />
  );
};

export default NotFound;
