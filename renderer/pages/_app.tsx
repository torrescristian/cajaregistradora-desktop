import GlobalLayout from '@/components/GlobalLayout';
import { AuthProvider } from '@/contexts/AuthContext';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <GlobalLayout>
          <Component {...pageProps} />
        </GlobalLayout>
      </QueryClientProvider>
    </AuthProvider>
  );
}
