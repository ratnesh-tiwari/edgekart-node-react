import styled from 'styled-components';
import { devices } from '../styles/GlobalStyle';
import Logo from '../ui/Logo';
import { HiOutlineLogout, HiOutlineMenu, HiOutlineUser } from 'react-icons/hi';
import ButtonIcon from '../ui/ButtonIcon';
import { useMenuToggle } from '../context/MenuToggleContext';
import ToggleDarkMode from '../ui/ToggleDarkMode';

const StyledHeader = styled.header`
  height: 6.2rem;
  display: flex;
  align-items: center;
  grid-column: 0 / -1;
  padding-inline: 1.6rem;
  border-bottom: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-100);
  justify-content: flex-end;

  @media ${devices.tab} {
    grid-column: 0 / -1;
    justify-content: space-between;
  }
  @media ${devices.mobile} {
    height: 5.2rem;
  }
`;

const StyledLogo = styled.div`
  display: none;
  @media ${devices.tab} {
    display: flex;
    align-items: center;
    gap: 0.6rem;
  }

  @media ${devices.mobile} {
    width: 14.8rem;
    gap: 0;
  }
`;

const HeaderIconGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  @media ${devices.mobile} {
    gap: 0;
  }
`;

function Header() {
  const { toggleMenu } = useMenuToggle();

  return (
    <StyledHeader>
      <StyledLogo>
        <ButtonIcon onClick={() => toggleMenu()}>
          <HiOutlineMenu />
        </ButtonIcon>
        <Logo width={148} />
      </StyledLogo>
      <HeaderIconGroup>
        <ToggleDarkMode />
        <ButtonIcon>
          <HiOutlineUser />
        </ButtonIcon>
        <ButtonIcon>
          <HiOutlineLogout />
        </ButtonIcon>
      </HeaderIconGroup>
    </StyledHeader>
  );
}

export default Header;
