import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useDarkMode } from '../context/DarkModeContext';

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
        src={isDark ? './svg/White_logo.svg' : './svg/Color_logo.svg'}
        alt="Edgekar logo"
      />
    </StyleLogo>
  );
}

export default Logo;
