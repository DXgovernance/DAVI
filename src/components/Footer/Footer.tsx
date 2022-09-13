import { FaGithub } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { Wrapper, FooterContainer, Link, Dot, Label } from './Footer.styled';

const VERSION = process.env.REACT_APP_VERSION;
const ENV = process.env.NODE_ENV;
const isProd = ENV === 'production';

const Footer = () => {
  const { t } = useTranslation();
  return (
    <Wrapper>
      <FooterContainer>
        <Label>
          {VERSION && `v${VERSION}`}
          {VERSION ? ':' : null}
          {ENV && !isProd && `${ENV}`}
        </Label>
        <Dot />
        <Link
          href="https://github.com/DXgovernance/DAVI/issues/new?assignees=&labels=Bug&template=bug_report.md&title="
          target="_blank"
          rel="noopener"
        >
          <Label>{t('reportABug')}</Label>
        </Link>
        <Dot />
        <Link href="https://davi.canny.io/" target="_blank" rel="noopener">
          <Label>{t('suggestAFeature')}</Label>
        </Link>
        <Dot />
        <Link
          href="https://github.com/DXgovernance/DAVI"
          target="_blank"
          rel="noopener"
        >
          <FaGithub size={18} />
        </Link>
      </FooterContainer>
    </Wrapper>
  );
};

export default Footer;
