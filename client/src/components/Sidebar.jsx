import { styled } from 'styled-components';

const Aside = styled.aside`
  grid-row: 1 / -1;
  border-right: 1px solid var(--color-grey-100);
  display: flex;
  justify-content: center;
`;

function Sidebar() {
  return <Aside>Sidebar</Aside>;
}

export default Sidebar;
