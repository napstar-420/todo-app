import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
} from 'react-router-dom';
import ErrorPage from './pages/ErrorPage';
import LoginPage from './pages/LoginPage';
import RequireAuth from './components/requireAuth';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' errorElement={<ErrorPage />}>
      <Route path='login' element={<LoginPage />} />

      {/* Below Routes require authentication */}
      <Route element={<RequireAuth />}>
        <Route index element={<div>Home Page</div>} />
      </Route>
    </Route>
  )
);
