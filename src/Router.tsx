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

// ADMIN FUEL PAGE
export const FUEL_CREATE_PATH = `/admin/fuel/create`;
export const FUEL_MAIN_PATH = `/admin/fuel`;
export const FUEL_EDIT_PATH = `/admin/fuel/:fuelId`;

// ADMIN BRAND PAGE
export const BRAND_CREATE_PATH = `/admin/brand/create`;
export const BRAND_MAIN_PATH = `/admin/brand`;
export const BRAND_EDIT_PATH = `/admin/brand/:brandId`;

// ADMIN MODEL PAGE
export const MODEL_CREATE_PATH = `/admin/model/create`;
export const MODEL_MAIN_PATH = `/admin/model`;
export const MODEL_EDIT_PATH = `/admin/model/:modelId`;

// ADMIN CAR PAGE
export const CAR_CREATE_PATH = `/admin/car/create`;
export const CAR_MAIN_PATH = `/admin/car`;
export const CAR_EDIT_PATH = `/admin/car/:carId`;

// ADMIN CATEGORY PAGE
export const CATEGORY_CREATE_PATH = `/admin/category/create`;
export const CATEGORY_MAIN_PATH = `/admin/category`;
export const CATEGORY_EDIT_PATH = `/admin/category/:categoryId`;

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
