import axios from 'axios';
import {BASE_SERVICE_URL} from '@src/common/constants.ts';
import {BrandsType, Car, CarsType} from '@src/common/types.ts';

const adminApiClient = axios.create({
  baseURL: BASE_SERVICE_URL + '/admin',
  timeout: 10000,
});

export async function getBrands(): Promise<BrandsType> {
  const {data} = await adminApiClient.get('/brands');
  return data;
}

export async function getCar(carId: string): Promise<Car> {
  const {data} = await adminApiClient.get(`/cars/${carId}`);
  return data;
}

export async function getCars(): Promise<CarsType> {
  const {data} = await adminApiClient.get(`/cars`);
  return data;
}
