import {
  ReactElement,
  SetStateAction,
  createContext,
  useState,
  Dispatch,
} from 'react';
import { AuthDto } from '@/dto/auth.dto';

interface AuthProviderProps {
  children: ReactElement;
}

interface AuthProviderState {
  auth: AuthDto;
  setAuth: Dispatch<SetStateAction<AuthDto>>;
  persist: boolean;
  setPersist: Dispatch<SetStateAction<boolean>>;
}

const initialState: AuthProviderState = {
  auth: {},
  setAuth: (auth) => auth,
  persist: true,
  setPersist: (persist) => persist,
};

const AuthContext = createContext<AuthProviderState>(initialState);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [auth, setAuth] = useState<AuthDto>({});
  const [persist, setPersist] = useState(true);
  const value = { auth, setAuth, persist, setPersist };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
