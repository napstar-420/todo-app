import { useContext } from 'react';
import { AuthContext, UseAuthContextType } from '../context/auth';

export const useAuth = (): UseAuthContextType => useContext(AuthContext);
