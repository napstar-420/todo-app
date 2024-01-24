import { useEffect, useState } from 'react';
import useAxiosPrivate from '@/hooks/use-axios-private';
import config from '@/config';

export default function HomePage() {
  const axios = useAxiosPrivate();
  const [lists, setLists] = useState([]);

  useEffect(() => {
    const controller = new AbortController();

    const findAllLists = async () => {
      try {
        const response = await axios.get(config.API.LISTS.FIND_ALL, {
          signal: controller.signal,
        });
        setLists(response.data);
        console.log(lists);
      } catch (error) {
        console.log(error);
      }
    };

    findAllLists();

    return () => controller.abort();
  }, []);

  return <div>Homepage</div>;
}
