import { QueryClient, QueryClientProvider } from 'react-query';
import 'src/global.css';

import { Router } from 'src/routes/sections';

import { ThemeProvider } from 'src/theme/theme-provider';

// ----------------------------------------------------------------------

const queryClient = new QueryClient();

export default function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <Router />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
