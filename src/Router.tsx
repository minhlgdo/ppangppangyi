import {createBrowserRouter} from 'react-router-dom';
import Root from './pages/user/Root.tsx';
import ErrorPage from './pages/user/ErrorPage.tsx';
import Homepage from './pages/user/Homepage.tsx';
import DetailPage from './pages/user/DetailPage.tsx';
import AdminRoot from './pages/admin/AdminRoot.tsx';
import BrandPage from './pages/admin/BrandPage.tsx';
import React from 'react';
import AdminPage from './pages/admin/AdminPage.tsx';
import EditBrandPage from './pages/admin/EditBrandPage.tsx';
import CreateBrandPage from './pages/admin/CreateBrandPage.tsx';

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
        element: <AdminPage />,
      },
      {
        path: '/admin/brand',
        element: <BrandPage />,
      },
      {
        path: '/admin/brand/:brandId',
        element: <EditBrandPage />,
      },
      {
        path: '/admin/brand/create',
        element: <CreateBrandPage />,
      },
    ],
  },
]);

export default router;
