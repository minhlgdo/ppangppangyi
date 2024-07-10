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

export enum AdminPageTypes {
  Create = 'Create',
  Edit = 'Edit',
  General = 'GENERAL',
}
