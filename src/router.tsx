import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
} from 'react-router-dom';
import AppLayout from './layout/AppLayout';
import RootLayout from './layout/RootLayout';
import ErrorPage from './pages/ErrorPage';
import LoginPage from './pages/LoginPage';
import RequireAuth from './components/requireAuth';
import PersistLogin from './components/persistant-login';
import TodayPage from './pages/TodayPage';
import UpcomingPage from './pages/UpcomingPage';
import CalendarPage from './pages/CalendarPage';
import StickWallPage from './pages/StickWallPage';
import ListPage from './pages/ListPage';
import TaskPage from './pages/TaskPage';
import Logout from './pages/Logout';
import PageNotFound from './pages/404';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout />} errorElement={<ErrorPage />}>
      <Route path='login' element={<LoginPage />} />
      <Route path='Logout' element={<Logout />} />

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
              <Route path=':listID' element={<ListPage />} />
              <Route path=':taskID' element={<TaskPage />} />
              <Route path='*' element={<PageNotFound />} />
            </Route>
          </Route>
        </Route>
      </Route>
    </Route>
  )
);
