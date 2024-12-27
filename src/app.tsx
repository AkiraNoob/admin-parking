import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import 'src/global.css';

import { Router } from 'src/routes/sections';

import { ThemeProvider } from 'src/theme/theme-provider';
import PATH_NAME from './configs/path-name';
import { clearCookiesAndLocalStorage } from './utils/auth-helpers';

// ----------------------------------------------------------------------

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry(failureCount, error) {
        if ((error as AxiosError).response?.status === 401) {
          clearCookiesAndLocalStorage();
          window.location.href = PATH_NAME.SignIn;
        }

        return false;
      },
    },
  },
});

export default function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <Router />
        {/* <ReactQueryDevtools /> */}
      </QueryClientProvider>
    </ThemeProvider>
  );
}
