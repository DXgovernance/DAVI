import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useNetwork } from 'wagmi';
import { NetworkButton } from '../NetworkButton';
import { WalletButton } from '../WalletButton';
import {
  HeaderWrapper,
  HeaderContainer,
  MenuItems,
  ClickableHeading,
} from './Header.styled';

const Header = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { chain } = useNetwork();

  return (
    <HeaderWrapper as="header">
      <HeaderContainer>
        <ClickableHeading
          data-testid="projectName"
          onClick={() => navigate(`/${chain.network}`)}
          size={2}
        >
          <strong>{t('projectDavi.projectDavi')}</strong>
        </ClickableHeading>
        <MenuItems>
          <NetworkButton />
          <WalletButton />
        </MenuItems>
      </HeaderContainer>
    </HeaderWrapper>
  );
};

export default Header;
