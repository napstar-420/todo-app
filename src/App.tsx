import { RouterProvider } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { router } from './router';
import { AuthProvider } from './context/auth-provider';
import { ThemeProvider } from './context/theme-provider';
import { ListProvider } from './context/list-provider';
import { TagProvider } from './context/tag-provider';

function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
        <AuthProvider>
          <ListProvider>
            <TagProvider>
              <RouterProvider router={router} />
            </TagProvider>
          </ListProvider>
        </AuthProvider>
      </ThemeProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
