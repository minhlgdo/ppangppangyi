import {createBrowserRouter} from 'react-router-dom';
import Root from './pages/user/Root.tsx';
import ErrorPage from './pages/user/ErrorPage.tsx';
import Homepage from './pages/user/Homepage.tsx';
import DetailPage from './pages/user/DetailPage.tsx';
import AdminRoot from './pages/admin/AdminRoot.tsx';
import React, {lazy} from 'react';

// Lazy load admin pages
const AdminPage = lazy(() => import('./pages/admin/AdminPage.tsx'));
const BrandPage = lazy(() => import('./pages/admin/brand/BrandPage.tsx'));
const EditBrandPage = lazy(() => import('./pages/admin/brand/EditBrandPage.tsx'));
const CreateBrandPage = lazy(() => import('./pages/admin/brand/CreateBrandPage.tsx'));
const FuelPage = lazy(() => import('@src/pages/admin/fuel/FuelPage.tsx'));
const EditFuelPage = lazy(() => import('@src/pages/admin/fuel/EditFuelPage.tsx'));
const CreateFuelPage = lazy(() => import('@src/pages/admin/fuel/CreateFuelPage.tsx'));
const CategoryPage = lazy(() => import('@src/pages/admin/category/CategoryPage.tsx'));
const EditCategoryPage = lazy(() => import('@src/pages/admin/category/EditCategoryPage.tsx'));
const CreateCategoryPage = lazy(() => import('@src/pages/admin/category/CreateCategoryPage.tsx'));
const ModelPage = lazy(() => import('@src/pages/admin/model/ModelPage.tsx'));
const EditModelPage = lazy(() => import('@src/pages/admin/model/EditModelPage.tsx'));
const CreateModelPage = lazy(() => import('@src/pages/admin/model/CreateModelPage.tsx'));
const CreateCarPage = lazy(() => import('@src/pages/admin/car/CreateCarPage.tsx'));
const EditCarPage = lazy(() => import('@src/pages/admin/car/EditCarPage.tsx'));
const CarPage = lazy(() => import('@src/pages/admin/car/CarPage.tsx'));

import {
  BRAND_CREATE_PATH,
  BRAND_EDIT_PATH,
  BRAND_MAIN_PATH,
  CAR_CREATE_PATH,
  CAR_EDIT_PATH,
  CAR_MAIN_PATH,
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
      //   Brand page
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
      //   Fuel
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
      //   Category
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
      //   Model
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
      // Car
      {
        path: CAR_MAIN_PATH,
        element: <CarPage />,
      },
      {
        path: CAR_EDIT_PATH,
        element: <EditCarPage />,
      },
      {
        path: CAR_CREATE_PATH,
        element: <CreateCarPage />,
      },
    ],
  },
]);

export default router;
