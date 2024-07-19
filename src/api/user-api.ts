import axios from 'axios';
import {BASE_SERVICE_URL} from '@src/common/constants.ts';
import {ApiGetAllResponses, CarsType, SearchKeywords} from '@src/common/types.ts';

const homeApiClient = axios.create({
  baseURL: BASE_SERVICE_URL + '/home',
  timeout: 10000,
});

export async function getCarsUsingCategory(categoryId: string, page: number): Promise<ApiGetAllResponses<CarsType>> {
  const {data} = await homeApiClient.get(`/cars?category=${categoryId}&page=${page - 1}`);
  return data;
}

export async function getCarsUsingKeywords(keywords: SearchKeywords, page: number): Promise<ApiGetAllResponses<CarsType>> {
  const params = keywords.map((keyword) => `${keyword.type}=${keyword.value}`).join('&');
  const {data} = await homeApiClient.get(`/cars?${params}&page=${page - 1}`);
  return data;
}
