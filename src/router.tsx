import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
} from 'react-router-dom';
import Root from './pages/Root';
import ErrorPage from './pages/ErrorPage';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Root />} errorElement={<ErrorPage />}>
      <Route index path='login' />
    </Route>
  )
);
