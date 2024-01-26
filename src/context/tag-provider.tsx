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
}

const initialState: TagProviderState = {
  tags: [],
  setTags: (tags) => tags,
};

export const TagProviderContext = createContext<TagProviderState>(initialState);

export const TagProvider = ({ children }: TagProviderProps) => {
  const [tags, setTags] = useState<Tag[]>([]);

  return (
    <TagProviderContext.Provider value={{ tags, setTags }}>
      {children}
    </TagProviderContext.Provider>
  );
};
