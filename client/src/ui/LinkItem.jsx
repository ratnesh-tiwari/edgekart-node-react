import { NavLink } from 'react-router-dom';
import { styled } from 'styled-components';
import { motion } from 'framer-motion';
import { fadeIn } from '../utils/animate';

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    color: var(--color-grey-600);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
  }

  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-600);
  }
`;

function LinkItem({ toPage, icon, name, index }) {
  return (
    <motion.li
      variants={fadeIn('up', 'spring', index * 0.2, 1)}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <StyledNavLink to={toPage}>
        {icon} <span>{name}</span>
      </StyledNavLink>
    </motion.li>
  );
}

export default LinkItem;
