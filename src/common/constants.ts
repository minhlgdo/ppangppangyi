// CONSTANT
import {CategoriesType} from '@src/common/types.ts';

export const ResponseTypes = {
  Success: 'SUCCESS',
  Failure: 'FAILURE',
  Unknown: 'UNKNOWN',
} as const;

type ResponseTypeKey = keyof typeof ResponseTypes;
export type ResponseTypeValue = (typeof ResponseTypes)[ResponseTypeKey];

export const SearchKeywordTypes = {
  Brand: 'brand',
  Category: 'category',
  Model: 'model',
} as const;
export type SearchKeywordType = (typeof SearchKeywordTypes)[keyof typeof SearchKeywordTypes];

export const EDIT_RESULT_ITEMS = {
  SUCCESS: '수정이 완료되었습니다.',
  FAILURE: '수정이 실패되었습니다. 다시 시도하십시오.',
  UNKNOWN: '오류가 발생되었습니다. 다시 시도하십시오.',
};

export const CREATE_RESULT_ITEMS = {
  SUCCESS: '등록이 완료되었습니다.',
  FAILURE: '등록이 실패되었습니다. 다시 시도하십시오.',
  UNKNOWN: '오류가 발생되었습니다. 다시 시도하십시오',
} as const;

export const DELETE_RESULT_ITEMS = {
  SUCCESS: '삭제가 완료되었습니다.',
  FAILURE: '삭제가 실패되었습니다. 다시 시도하십시오.',
  UNKNOWN: '오류가 발생되었습니다. 다시 시도하십시오',
} as const;

export const AdminPageTypes = {
  Create: '등록',
  Edit: '수정',
  General: '전체',
} as const;
export type AdminPageType = (typeof AdminPageTypes)[keyof typeof AdminPageTypes];

export const FieldTypes = {
  Text: 'TEXT',
  Number: 'NUMBER',
  Image: 'IMAGE',
  Dropdown: 'DROPDOWN',
  Autocomplete: 'AUTOCOMPLETE',
} as const;
export type FieldType = (typeof FieldTypes)[keyof typeof FieldTypes];

export const Subjects = {
  Brand: '브랜드',
  Fuel: '연료',
  Category: '분류',
  Model: '차종',
  Car: '자동차',
} as const;
export type SubjectType = (typeof Subjects)[keyof typeof Subjects];

export const PARENT_CATEGORIES: CategoriesType = [
  {parentCategoryId: null, categoryId: '1', categoryName: '경형'},
  {parentCategoryId: null, categoryId: '2', categoryName: '대형'},
  {parentCategoryId: null, categoryId: '3', categoryName: '소형'},
  {parentCategoryId: null, categoryId: '4', categoryName: '스포츠카'},
  {parentCategoryId: null, categoryId: '5', categoryName: '준대형'},
  {parentCategoryId: null, categoryId: '6', categoryName: '준중형'},
  {parentCategoryId: null, categoryId: '7', categoryName: '중형'},
];

export const BASE_SERVICE_URL = 'http://rookie-alb-863346530.ap-northeast-2.elb.amazonaws.com';
