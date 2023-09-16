import styled from 'styled-components';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { fadeIn } from '../utils/animate';
import Heading from '../ui/Heading';
import ButtonIcon from '../ui/ButtonIcon';
import { HiHeart } from 'react-icons/hi2';
import { formatCurrency } from '../utils/helper';
import Button from '../ui/Button';

const Card = styled(motion.div)`
  max-width: 30rem;
  height: 40rem;
  background-color: var(--color-grey-200);
  position: relative;
  padding: 1.2rem;
  border-radius: var(--border-radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-md);

  &::before {
    content: '';
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: var(--color-secondary-400);
    clip-path: inset(0 0 0 80%);
    z-index: -1;
  }
`;

const StyledImage = styled(motion.div)`
  position: absolute;
  transform: translateY(-2rem);
  top: 0%;
  left: 0%;

  width: 100%;
`;

const StyledRating = styled.div`
  margin-top: 19.8rem;
  color: var(--color-grey-600);
  display: flex;
  font-size: 1.4rem;

  align-items: center;
  gap: 0;
`;

const StyledP = styled.p`
  font-size: 2.4rem;
  font-weight: 600;
  color: var(--color-brand-500);
  margin-top: 1rem;
`;

function ProductCard() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [30, -30]);
  const rotateY = useTransform(y, [100, -100], [-30, 30]);

  return (
    <div style={{ perspective: 2000 }}>
      <Card
        style={{ x, y, rotateX, rotateY, z: 100 }}
        drag
        dragElastic={0.18}
        dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
        whileTap={{ cursor: 'grabbing', scale: 0.95 }}
        whileHover={{ scale: 1.05 }}
        variants={fadeIn('left', 'spring', 0.2, 1)}
      >
        <StyledImage style={{ x, y, rotateX, rotateY, z: 10000 }}>
          <img src="./f.webp" alt="logo" width={320} height={198} />
        </StyledImage>

        <StyledRating>
          <span>4.1</span>
          <ButtonIcon>
            <HiHeart />
          </ButtonIcon>
          <span style={{ fontSize: '1.2rem' }}>(120)</span>
        </StyledRating>

        <Heading as="h3">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Et, nulla.
        </Heading>

        <StyledP>{formatCurrency(12345)}</StyledP>

        <Button style={{ marginTop: '0.8rem' }} sizes="small">
          Add to cart
        </Button>
      </Card>
    </div>
  );
}

export default ProductCard;
