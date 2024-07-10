import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';

// export const apiClient = axios.create({
//   baseURL: 'https://some-domain.com/api/',
//   timeout: 2000,
// });

export const mock = new AxiosMockAdapter(axios, {
  delayResponse: 2000,
});

export const GET_BRANDS_ENDPOINT = '/admin/brands';
export const GET_BRAND_ENDPOINT = (brandId: number) => {
  return `/admin/brands/${brandId}`;
};

// MOCK RESPONSE
export const MOCK_BRANDS = {
  pageNumber: 1,
  pageSize: 12,
  totalRecordCount: 119,
  records: [
    {brandId: 1, brandName: 'Hyundai'},
    {brandId: 2, brandName: 'Kia'},
    {brandId: 3, brandName: 'BMW'},
    {brandId: 4, brandName: 'Porches'},
    {brandId: 5, brandName: 'Honda'},
    {brandId: 6, brandName: 'Toyota'},
    {brandId: 7, brandName: 'Mazda'},
    {brandId: 8, brandName: 'Lexus'},
    {brandId: 9, brandName: 'Bentley'},
    {brandId: 10, brandName: 'Chevrolet'},
  ],
};

mock.onGet(GET_BRANDS_ENDPOINT).reply(200, MOCK_BRANDS);
mock.onPost(GET_BRANDS_ENDPOINT).reply(201);
