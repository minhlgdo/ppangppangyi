import axios from 'axios';
import {BASE_SERVICE_URL} from '@src/common/constants.ts';
import {ApiGetAllResponses, Brand, BrandsType, Car, CarsType, Fuel, FuelsType} from '@src/common/types.ts';

const adminApiClient = axios.create({
  baseURL: BASE_SERVICE_URL + '/admin',
  timeout: 10000,
});

// BRAND FUNCTIONS
export async function getBrands(page: number): Promise<ApiGetAllResponses<BrandsType>> {
  const {data} = await adminApiClient.get(`/brands?page=${page - 1}`);
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

// FUEL FUNCTIONS
export async function getFuels(page: number): Promise<ApiGetAllResponses<FuelsType>> {
  const {data} = await adminApiClient.get(`/fuels?page=${page - 1}`);
  return data;
}

export async function getFuel(fuelId: string): Promise<Fuel> {
  const {data} = await adminApiClient.get(`/fuels/${fuelId}`);
  return data;
}

export async function createFuel(fuel: Fuel): Promise<Fuel> {
  const {data} = await adminApiClient.post(`/fuels`, fuel);
  return data;
}

export async function editFuel(fuelId: string, fuel: Fuel): Promise<Fuel> {
  const {data} = await adminApiClient.put(`/fuels/${fuelId}`, fuel);
  return data;
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
