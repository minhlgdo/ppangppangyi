import {createBrowserRouter} from 'react-router-dom';
import Root from './pages/user/Root.tsx';
import ErrorPage from './pages/user/ErrorPage.tsx';
import Homepage from './pages/user/Homepage.tsx';
import DetailPage from './pages/user/DetailPage.tsx';
import AdminRoot from './pages/admin/AdminRoot.tsx';
import {Box, Typography} from '@mui/material';
import BrandPage from './pages/admin/BrandPage.tsx';
import React from 'react';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Homepage />,
      },
      {
        path: '/details/:carId',
        element: <DetailPage />,
      },
    ],
  },
  {
    path: '/admin',
    element: <AdminRoot />,
    children: [
      {
        path: '/admin',
        element: (
          <Box sx={{m: 4, width: '100%', height: '100%'}}>
            <Typography>Select one item from the navigation bar to start!</Typography>
          </Box>
        ),
      },
      {
        path: '/admin/brand',
        element: <BrandPage />,
      },
    ],
  },
]);

export default router;
