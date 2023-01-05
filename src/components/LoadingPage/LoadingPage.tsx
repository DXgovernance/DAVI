import { useTranslation } from 'react-i18next';
import GlobalStyle from 'theme/GlobalTheme';
import { Header } from 'components/Header';
import { Container } from 'components/primitives/Layout';
import { Loading } from 'components/primitives/Loading';
import { LoadingText, MainDiv } from './LoadingPage.styled';

const LoadingPage = () => {
  const { t } = useTranslation();
  return (
    <>
      <GlobalStyle />
      <Header />
      <Container>
        <MainDiv>
          <Loading loading={true} iconProps={{ size: 80 }} />
          <LoadingText>{t('loadingDao')}</LoadingText>
        </MainDiv>
      </Container>
    </>
  );
};

export default LoadingPage;
