import {createBrowserRouter} from 'react-router-dom';
import Root from './pages/user/Root.tsx';
import ErrorPage from './pages/user/ErrorPage.tsx';
import Homepage from './pages/user/Homepage.tsx';
import DetailPage from './pages/user/DetailPage.tsx';
import AdminRoot from './pages/admin/AdminRoot.tsx';
import BrandPage from './pages/admin/brand/BrandPage.tsx';
import React from 'react';
import AdminPage from './pages/admin/AdminPage.tsx';
import EditBrandPage from './pages/admin/brand/EditBrandPage.tsx';
import CreateBrandPage from './pages/admin/brand/CreateBrandPage.tsx';
import FuelPage from '@src/pages/admin/fuel/FuelPage.tsx';
import EditFuelPage from '@src/pages/admin/fuel/EditFuelPage.tsx';
import CreateFuelPage from '@src/pages/admin/fuel/CreateFuelPage.tsx';
import CategoryPage from '@src/pages/admin/category/CategoryPage.tsx';
import EditCategoryPage from '@src/pages/admin/category/EditCategoryPage.tsx';
import CreateCategoryPage from '@src/pages/admin/category/CreateCategoryPage.tsx';
import ModelPage from '@src/pages/admin/model/ModelPage.tsx';
import EditModelPage from '@src/pages/admin/model/EditModelPage.tsx';
import CreateModelPage from '@src/pages/admin/model/CreateModelPage.tsx';
import {
  BRAND_CREATE_PATH,
  BRAND_EDIT_PATH,
  BRAND_MAIN_PATH,
  CATEGORY_CREATE_PATH,
  CATEGORY_EDIT_PATH,
  CATEGORY_MAIN_PATH,
  FUEL_CREATE_PATH,
  FUEL_EDIT_PATH,
  FUEL_MAIN_PATH,
  MODEL_CREATE_PATH,
  MODEL_EDIT_PATH,
  MODEL_MAIN_PATH,
} from '@src/common/navigation.ts';

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
        path: BRAND_MAIN_PATH,
        element: <BrandPage />,
      },
      {
        path: BRAND_EDIT_PATH,
        element: <EditBrandPage />,
      },
      {
        path: BRAND_CREATE_PATH,
        element: <CreateBrandPage />,
      },
      {
        path: FUEL_MAIN_PATH,
        element: <FuelPage />,
      },
      {
        path: FUEL_EDIT_PATH,
        element: <EditFuelPage />,
      },
      {
        path: FUEL_CREATE_PATH,
        element: <CreateFuelPage />,
      },
      {
        path: CATEGORY_MAIN_PATH,
        element: <CategoryPage />,
      },
      {
        path: CATEGORY_EDIT_PATH,
        element: <EditCategoryPage />,
      },
      {
        path: CATEGORY_CREATE_PATH,
        element: <CreateCategoryPage />,
      },
      {
        path: MODEL_MAIN_PATH,
        element: <ModelPage />,
      },
      {
        path: MODEL_EDIT_PATH,
        element: <EditModelPage />,
      },
      {
        path: MODEL_CREATE_PATH,
        element: <CreateModelPage />,
      },
    ],
  },
]);

export default router;
