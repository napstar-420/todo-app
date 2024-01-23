import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { AuthProvider } from './context/auth';

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
