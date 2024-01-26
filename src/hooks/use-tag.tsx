import { TagProviderContext } from '@/context/tag-provider';
import { useContext } from 'react';

export const useTag = () => {
  return useContext(TagProviderContext);
};
