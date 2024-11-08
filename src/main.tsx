import React, {Suspense} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {RouterProvider} from 'react-router-dom';
import router from './Router.tsx';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';
import {CircularProgress} from '@mui/material';

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<CircularProgress />}>
        <RouterProvider router={router} />
      </Suspense>
      <ReactQueryDevtools />
    </QueryClientProvider>
  </React.StrictMode>
);
