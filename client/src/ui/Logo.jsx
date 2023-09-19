import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useDarkMode } from '../context/DarkModeContext';
import whiteLogo from '../../public/svg/White_logo.svg';
import darkLogo from '../../public/svg/Color_logo.svg';

const StyleLogo = styled(motion.div)`
  display: grid;
  place-content: center;
`;
function Logo({ width }) {
  const { isDark } = useDarkMode();

  return (
    <StyleLogo initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <img
        width={width}
        src={isDark ? whiteLogo : darkLogo}
        alt="Edgekar logo"
      />
    </StyleLogo>
  );
}

export default Logo;
