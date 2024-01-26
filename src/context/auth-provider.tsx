import {
  ReactElement,
  SetStateAction,
  createContext,
  useState,
  Dispatch,
} from 'react';
import { AuthDto } from '@/dto/auth.dto';

interface AuthContextType {
  auth: AuthDto;
  setAuth: Dispatch<SetStateAction<AuthDto>>;
  persist: boolean;
  setPersist: Dispatch<SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextType>({
  auth: {},
  setAuth: (auth) => auth,
  persist: true,
  setPersist: (persist) => persist,
});

interface AuthProviderProps {
  children: ReactElement;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [auth, setAuth] = useState<AuthDto>({});
  const [persist, setPersist] = useState(true);

  return (
    <AuthContext.Provider value={{ auth, setAuth, persist, setPersist }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
