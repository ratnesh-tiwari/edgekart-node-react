import { styled } from 'styled-components';
import { HiOutlineHome } from 'react-icons/hi';
import { FaRegAddressBook } from 'react-icons/fa';
import { AiOutlineHeart } from 'react-icons/ai';
import { BsCartCheck } from 'react-icons/bs';
import LinkItem from './LinkItem';
import { motion } from 'framer-motion';
import { staggerContainer } from '../utils/animate';

const LinkContainer = styled(motion.ul)`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin-top: 1.4rem;
`;

function MainNav() {
  return (
    <LinkContainer
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
    >
      <LinkItem name="Home" toPage="/" icon={<HiOutlineHome />} index={1} />
      <LinkItem
        name="Orders"
        toPage="/orders"
        icon={<BsCartCheck />}
        index={2}
      />
      <LinkItem
        name="Wishlish"
        toPage="/wishlist"
        icon={<AiOutlineHeart />}
        index={3}
      />
      <LinkItem
        name="Address"
        toPage="/address"
        icon={<FaRegAddressBook />}
        index={4}
      />
    </LinkContainer>
  );
}

export default MainNav;
