import { useContext } from 'react';
import { ListProviderContext } from '@/context/list-provider';

export const useList = () => {
  return useContext(ListProviderContext);
};
