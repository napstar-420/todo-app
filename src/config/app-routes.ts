export default {
  ROOT: '/',
  LOGIN: '/login',
  LOGOUT: '/logout',
  UP_COMING: '/upcoming',
  CALENDAR: '/calendar',
  STICKY_WALL: '/sticky-wall',
  TAG: (id: string) => `/tag/${id}`,
  LIST: (id: string) => `/${id}`,
  LIST_TASK: (listID: string, taskID: string) => `/${listID}/${taskID}`,
  TODAY_TASK: (id: string) => `/today/${id}`,
  UPCOMING_TASK: (id: string) => `/upcoming/${id}`,
};
