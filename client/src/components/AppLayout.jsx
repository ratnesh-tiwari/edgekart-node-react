import { MenuToggleContextProvider } from '../context/MenuToggleContext';
import { devices } from '../styles/GlobalStyle';
import Header from './Header';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

const StyledAppLayout = styled.div`
  display: grid;
  height: 100vh;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;

  @media ${devices.tab} {
    grid-template-columns: 1fr;
  }
`;

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
  overflow-y: scroll;

  @media ${devices.tab} {
    overflow: initial;
    padding: 3rem 3.8rem 5.4rem;
  }

  @media ${devices.mobile} {
    padding: 1rem 1.8rem 2.4rem;
  }
`;

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

function AppLayout() {
  return (
    <StyledAppLayout>
      <MenuToggleContextProvider>
        <Header />
        <Sidebar />
      </MenuToggleContextProvider>
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </StyledAppLayout>
  );
}

export default AppLayout;
