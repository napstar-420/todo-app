import axios from '../api/axios';
import useAuth from './use-auth';
import API_ROUTES from '../api/routes';

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.get(API_ROUTES.AUTH.REFRESH_URL);
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
