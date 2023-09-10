import { styled } from 'styled-components';
import Logo from '../ui/Logo';
import MainNav from '../ui/MainNav';
import { devices } from '../styles/GlobalStyle';
import { FaXmark } from 'react-icons/fa6';
import { motion } from 'framer-motion';
import ButtonIcon from '../ui/ButtonIcon';
import { useMenuToggle } from '../context/MenuToggleContext';

const Aside = styled(motion.aside)`
  grid-row: 1 / -1;
  border-right: 1px solid var(--color-grey-100);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-top: 3.2rem;
  height: 100dvh;

  @media ${devices.tab} {
    display: none;
  }
`;

const styleOnOpen = {
  display: 'flex',
  position: 'absolute',
  backgroundColor: `var(--color-secondary-100)`,
  width: '26rem',
  marginTop: 0,
  paddingTop: '3.2rem',
  top: 0,
  left: 0,
};

function Sidebar() {
  const { isOpen, toggleMenu } = useMenuToggle();

  return (
    <Aside style={isOpen ? styleOnOpen : ''}>
      <ButtonIcon
        onClick={() => toggleMenu()}
        style={
          isOpen
            ? { position: 'absolute', top: '1%', right: '3%' }
            : { display: 'none' }
        }
      >
        <FaXmark />
      </ButtonIcon>
      <Logo width={220} />

      <MainNav />
    </Aside>
  );
}

export default Sidebar;
