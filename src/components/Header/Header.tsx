import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
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

  return (
    <HeaderWrapper as="header">
      <HeaderContainer>
        <ClickableHeading onClick={() => navigate(`/`)} size={2}>
          <strong>{t('guilds.guilds')}</strong>
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
