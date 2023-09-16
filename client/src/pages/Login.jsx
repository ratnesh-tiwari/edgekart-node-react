import { useState } from 'react';
import Logo from '../ui/Logo';
import LogIn from '../features/authentication/Login';
import SignUp from '../features/authentication/SignUp';
import Heading from '../ui/Heading';
import styled from 'styled-components';
import { devices } from '../styles/GlobalStyle';

const StledLoginContainer = styled.div`
  height: 100dvh;
  width: 100%;
  display: grid;
  place-content: center;
  background-color: var(--color-grey-50);
`;

const Container = styled.div`
  background-color: var(--color-grey-100);
  padding: 1.6rem;
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  width: 42rem;

  @media ${devices.mobile} {
    width: auto;
  }
`;

const StyledToggleLogin = styled.div`
  display: flex;
  justify-content: space-around;
  background-color: var(--color-brand-100);
  transition: all 1s;
  margin-bottom: 1.2rem;
`;

const StyledSpan = styled.span`
  padding: 1.2rem;
  display: grid;
  place-content: center;
  width: 100%;
  &:hover {
    background-color: var(--color-brand-200);
  }
`;

function Login() {
  const [isLogin, setIsLogin] = useState(true);

  function toggleLoginForm(value) {
    setIsLogin(value);
  }

  return (
    <StledLoginContainer>
      <Logo width={280} />
      <Heading as="h1" style={{ textAlign: 'center', marginBottom: '1rem' }}>
        {isLogin ? 'Login to your' : 'Create a new'} account
      </Heading>

      <Container>
        <StyledToggleLogin>
          <StyledSpan
            style={
              isLogin
                ? { borderBottom: `3px solid var(--color-secondary-300)` }
                : { borderBottom: `3px solid transparent` }
            }
            onClick={() => toggleLoginForm(true)}
          >
            Login
          </StyledSpan>
          <StyledSpan
            style={
              isLogin
                ? { borderBottom: `3px solid transparent` }
                : { borderBottom: `3px solid var(--color-secondary-300)` }
            }
            onClick={() => toggleLoginForm(false)}
          >
            Signup
          </StyledSpan>
        </StyledToggleLogin>
        {isLogin ? <LogIn /> : <SignUp />}
      </Container>
    </StledLoginContainer>
  );
}

export default Login;
