import { axiosPrivate } from '../api/axios';
import { useEffect } from 'react';
import useRefreshToken from './use-refresh-token';
import useAuth from './use-auth';
import { useToast } from '@/components/ui/use-toast';
import { ErrorResponse } from '../types';

export const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const { auth } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return axiosPrivate(prevRequest);
        }

        if (error?.response?.data) {
          const { message } = error?.response?.data as ErrorResponse;

          if (Array.isArray(message)) {
            toast({
              title: 'Error',
              description: message[0],
            });
          } else {
            toast({
              title: 'Error',
              description: message,
            });
          }
        } else {
          toast({
            title: 'Error',
            description: 'Something went wrong',
          });
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth, refresh]);

  return axiosPrivate;
};
