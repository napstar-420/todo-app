import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
} from 'react-router-dom';
import AppLayout from './layout/app-layout';
import RootLayout from './layout/root-layout';
import ErrorPage from './pages/error-page';
import LoginPage from './pages/login-page';
import RequireAuth from './components/require-auth';
import PersistLogin from './components/persistent-login';
import TodayPage from './pages/today-page';
import UpcomingPage from './pages/upcoming-page';
import CalendarPage from './pages/calendar-page';
import StickWallPage from './pages/stickywall-page';
import ListPage from './pages/list-page';
import TaskPage from './pages/task-page';
import Logout from './pages/logout-page';
import PageNotFound from './pages/404';
import CreateTask from './pages/create-task-page';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout />} errorElement={<ErrorPage />}>
      <Route path='login' element={<LoginPage />} />
      <Route path='logout' element={<Logout />} />

      <Route element={<PersistLogin />}>
        {/* Below Routes require authentication */}
        <Route element={<RequireAuth />}>
          <Route element={<AppLayout />}>
            <Route errorElement={<ErrorPage />}>
              <Route index element={<TodayPage />} />
              <Route path='upcoming' element={<UpcomingPage />} />
              <Route path='calendar' element={<CalendarPage />} />
              <Route path='sticky-wall' element={<StickWallPage />} />
              <Route path='tags' element={<div>Tags</div>} />
              <Route path=':listID' element={<ListPage />}>
                <Route path='new' element={<CreateTask />} />
                <Route path=':taskID' element={<TaskPage />} />
              </Route>
              <Route path='*' element={<PageNotFound />} />
            </Route>
          </Route>
        </Route>
      </Route>
    </Route>
  )
);
