import routes from '@/api/routes';
import { useAxiosPrivate } from '@/hooks/use-axios-private';
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from 'react';

interface Tag {
  id: string;
  name: string;
}

interface TagProviderProps {
  children: ReactNode;
}

interface TagProviderState {
  tags: Tag[];
  setTags: Dispatch<SetStateAction<Tag[]>>;
  updateTags: (controller?: AbortController) => Promise<void>;
}

const initialState: TagProviderState = {
  tags: [],
  setTags: (tags) => tags,
  updateTags: async () => {},
};

export const TagProviderContext = createContext<TagProviderState>(initialState);

export const TagProvider = ({ children }: TagProviderProps) => {
  const axios = useAxiosPrivate();
  const [tags, setTags] = useState<Tag[]>([]);
  const updateTags = async (controller?: AbortController) => {
    const response = await axios.get(routes.TAGS, {
      signal: controller?.signal,
    });
    console.log(response.data);
  };

  return (
    <TagProviderContext.Provider value={{ tags, setTags, updateTags }}>
      {children}
    </TagProviderContext.Provider>
  );
};
