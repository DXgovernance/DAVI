import { useNavigate } from 'react-router-dom';
import { useNetwork } from 'wagmi';
import { NetworkButton } from '../NetworkButton';
import { WalletButton } from '../WalletButton';
import {
  HeaderWrapper,
  HeaderContainer,
  MenuItems,
  ClickableHeading,
  TextLogo,
} from './Header.styled';

const Header = () => {
  const navigate = useNavigate();
  const { chain } = useNetwork();

  return (
    <HeaderWrapper as="header">
      <HeaderContainer>
        <ClickableHeading
          onClick={() => navigate(`/${chain?.network}`)}
          size={2}
        >
          <TextLogo />
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
