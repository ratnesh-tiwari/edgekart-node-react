import { motion } from 'framer-motion';
import styled from 'styled-components';

const StyleLogo = styled(motion.div)`
  display: grid;
  place-content: center;
`;
function Logo({ width }) {
  return (
    <StyleLogo initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <img width={width} src="./svg/Color_logo.svg" alt="Edgekar logo" />
    </StyleLogo>
  );
}

export default Logo;
