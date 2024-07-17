import axios from 'axios';
import {BASE_SERVICE_URL} from '@src/common/constants.ts';
import {ApiGetAllResponses, CarsType} from '@src/common/types.ts';

const homeApiClient = axios.create({
  baseURL: BASE_SERVICE_URL + '/home',
  timeout: 10000,
});

export async function getCarsUsingCategory(categoryId: string, page: number): Promise<ApiGetAllResponses<CarsType>> {
  const {data} = await homeApiClient.get(`/cars?category=${categoryId}&page=${page - 1}`);
  return data;
}
