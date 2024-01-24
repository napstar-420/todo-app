import { ReactElement, createContext, useState } from 'react';

const AuthContext = createContext({});

interface AuthProviderProps {
  children: ReactElement;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [auth, setAuth] = useState({});
  const [persist, setPersist] = useState(true);

  return (
    <AuthContext.Provider value={{ auth, setAuth, persist, setPersist }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
