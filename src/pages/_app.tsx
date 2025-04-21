import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import { motion } from 'framer-motion';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <motion.div
        key={router.route}
        initial="pageInitial"
        animate="pageAnimate"
        variants={{
          pageInitial: {
            opacity: 0
          },
          pageAnimate: {
            opacity: 1
          },
        }}
        transition={{ duration: 0.5 }}
      >
        <Component {...pageProps} />
      </motion.div>
    </QueryClientProvider>
  );
}

export default MyApp;