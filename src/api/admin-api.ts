import axios from 'axios';
import {BASE_SERVICE_URL} from '@src/common/constants.ts';
import {Brand, BrandsType, Car, CarsType} from '@src/common/types.ts';

const adminApiClient = axios.create({
  baseURL: BASE_SERVICE_URL + '/admin',
  timeout: 10000,
});

// BRAND FUNCTIONS
export async function getBrands(): Promise<BrandsType> {
  const {data} = await adminApiClient.get('/brands');
  return data;
}

export async function getBrand(brandId: string): Promise<Brand> {
  const {data} = await adminApiClient.get(`/brands/${brandId}`);
  return data;
}

export async function updateBrand(brandId: string, newBrand: Brand): Promise<Brand> {
  const {data} = await adminApiClient.put(`/brands/${brandId}`, newBrand);
  return data;
}

export async function createBrand(brand: Brand): Promise<Brand> {
  const {data} = await adminApiClient.post(`/brands`, brand);
  return data;
}

export async function deleteBrand(brandId: string): Promise<number> {
  const {status} = await adminApiClient.delete(`/brands/${brandId}`);
  return status;
}

// CAR FUNCTIONS
export async function getCar(carId: string): Promise<Car> {
  const {data} = await adminApiClient.get(`/cars/${carId}`);
  return data;
}

export async function getCars(): Promise<CarsType> {
  const {data} = await adminApiClient.get(`/cars`);
  return data;
}
