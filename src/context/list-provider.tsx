import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from 'react';
import { IconType } from 'react-icons';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { FaListCheck, FaNoteSticky } from 'react-icons/fa6';
import { MdDoubleArrow } from 'react-icons/md';
import appRoutes from '../config/app-routes';
import { useAxiosPrivate } from '@/hooks/use-axios-private';
import routes from '@/api/routes';
import { List } from '@/dto';

enum DefaultListID {
  CALENDER = 'calender',
  TODAY = 'today',
  UPCOMING = 'upcoming',
  STICKY_WALL = 'sticky-wall',
}

interface DefaultList {
  readonly id: DefaultListID;
  readonly Icon: IconType;
  readonly name: string;
  tasksCount?: number;
  readonly href: string;
}

interface ListProviderProps {
  children: ReactNode;
}

interface ListProviderState {
  lists: List[];
  setLists: Dispatch<SetStateAction<List[]>>;
  defaultLists: DefaultList[];
  updateLists: (controller?: AbortController) => Promise<void>;
}

const initialState: ListProviderState = {
  lists: [],
  setLists: (lists) => lists,
  defaultLists: [],
  updateLists: async () => {},
};

const initialDefaultLists: DefaultList[] = [
  {
    id: DefaultListID.UPCOMING,
    Icon: MdDoubleArrow,
    name: 'Upcoming',
    tasksCount: 0,
    href: appRoutes.UP_COMING,
  },
  {
    id: DefaultListID.TODAY,
    Icon: FaListCheck,
    name: 'Today',
    tasksCount: 0,
    href: appRoutes.ROOT,
  },
  {
    id: DefaultListID.CALENDER,
    Icon: FaRegCalendarAlt,
    name: 'Calendar',
    href: appRoutes.CALENDAR,
  },
  {
    id: DefaultListID.STICKY_WALL,
    Icon: FaNoteSticky,
    name: 'Sticky wall',
    href: appRoutes.STICKY_WALL,
  },
];

export const ListProviderContext =
  createContext<ListProviderState>(initialState);

export const ListProvider = ({ children }: ListProviderProps) => {
  const axios = useAxiosPrivate();
  const [lists, setLists] = useState<List[]>([]);
  const [defaultLists, setDefaultLists] =
    useState<DefaultList[]>(initialDefaultLists);

  const updateDefaultListsCount = (
    listID: DefaultListID,
    newCount: number
  ): void => {
    setDefaultLists(
      defaultLists.map((list) =>
        list.id === listID ? { ...list, tasksCount: newCount } : list
      )
    );
  };

  const updateLists = async (controller?: AbortController) => {
    const response = await axios.get(routes.LISTS, {
      signal: controller?.signal,
    });

    const data = response.data;
    const { lists, todayTasksCount, upcomingTasksCount } = data;
    setLists(lists);
    updateDefaultListsCount(DefaultListID.TODAY, todayTasksCount);
    updateDefaultListsCount(DefaultListID.UPCOMING, upcomingTasksCount);
  };

  return (
    <ListProviderContext.Provider
      value={{ lists, setLists, defaultLists, updateLists }}
    >
      {children}
    </ListProviderContext.Provider>
  );
};
