import styled from 'styled-components';
import { devices } from '../styles/GlobalStyle';

const StyledHeader = styled.header`
  height: 6.2rem;
  display: flex;
  align-items: center;
  grid-column: 2 / -1;
  padding-inline: 1.6rem;
  border-bottom: 1px solid var(--color-grey-100);

  @media ${devices.tab} {
    grid-column: 0 / -1;
  }
  @media ${devices.mobile} {
    height: 5.2rem;
  }
`;

function Header() {
  return <StyledHeader>Header</StyledHeader>;
}

export default Header;
