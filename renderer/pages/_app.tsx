import GlobalLayout from '@/modules/common/components/GlobalLayout';
import { AuthProvider } from '@/modules/common/contexts/AuthContext';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <GlobalLayout>
          {/* @ts-ignore */}
          <Component {...pageProps} />
        </GlobalLayout>
      </QueryClientProvider>
    </AuthProvider>
  );
}
