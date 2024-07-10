// CONSTANT
export const ResponseTypes = {
  Success: 'SUCCESS',
  Failure: 'FAILURE',
  Unknown: 'UNKNOWN',
} as const;

type ResponseTypeKey = keyof typeof ResponseTypes;
export type ResponseTypeValue = (typeof ResponseTypes)[ResponseTypeKey];

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

export const ITEMS_PER_PAGE = 10;

export const AdminPageTypes = {
  Create: '등록',
  Edit: '수정',
  General: '전체',
} as const;
export type AdminPageType = (typeof AdminPageTypes)[keyof typeof AdminPageTypes];

export const FieldTypes = {
  Text: 'TEXT',
  Image: 'IMAGE',
} as const;
export type FieldType = (typeof FieldTypes)[keyof typeof FieldTypes];

export const PageNames = {
  Brand: '브랜드',
  Fuel: '연류',
  Category: '분류',
  Model: '차종',
  Car: '자동차',
} as const;
export type PageNameType = (typeof PageNames)[keyof typeof PageNames];
