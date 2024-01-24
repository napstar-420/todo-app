import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
} from 'react-router-dom';
import ErrorPage from './pages/ErrorPage';
import LoginPage from './pages/LoginPage';
import RequireAuth from './components/requireAuth';
import PersistLogin from './components/persistant-login';
import HomePage from './pages/HomePage';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' errorElement={<ErrorPage />}>
      <Route path='login' element={<LoginPage />} />

      <Route element={<PersistLogin />}>
        {/* Below Routes require authentication */}
        <Route element={<RequireAuth />}>
          <Route index element={<HomePage />} />
        </Route>
      </Route>
    </Route>
  )
);
