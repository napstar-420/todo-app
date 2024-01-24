import config from '@/config';
import axios from '../api/axios';
import useAuth from './use-auth';

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.get(config.API.AUTH.REFRESH_URL);
    setAuth((prev) => {
      return {
        ...prev,
        user: response.data.user,
        accessToken: response.data.accessToken,
      };
    });
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
