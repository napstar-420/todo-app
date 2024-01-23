const SERVER_URL = import.meta.env.VITE_SERVER;

export default {
  AUTH: {
    GOOGLE_LOGIN: `${SERVER_URL}/auth/google/login`,
  },
};
