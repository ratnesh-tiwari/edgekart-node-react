import { createContext, useContext, useState } from 'react';

const AuthenticationContext = createContext();

function AuthenticationContextProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});

  function updateUser(data) {
    if (data) {
      setIsAuthenticated(true);
      setUser(data);
    } else {
      setIsAuthenticated(false);
      setUser({});
    }
  }

  return (
    <AuthenticationContext.Provider
      value={{ updateUser, isAuthenticated, user }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
}

function useAuth() {
  const contextAuth = useContext(AuthenticationContext);
  if (contextAuth === undefined)
    throw new Error(
      'AuthenticationContext was used outside of AuthenticationContextProvider'
    );
  return contextAuth;
}

export { AuthenticationContextProvider, useAuth };
