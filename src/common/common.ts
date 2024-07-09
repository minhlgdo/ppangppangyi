// CONSTANT
export const RESPONSES = ['SUCCESS', 'FAILURE', 'UNKNOWN'];
export type ResponseType = (typeof RESPONSES)[number];

export const EDIT_RESULT_ITEMS = {
  SUCCESS: '수정이 완료되었습니다.',
  FAILURE: '수정이 실패되었습니다. 다시 시도하십시오.',
  UNKNOWN: '오류가 발생되었습니다. 다시 시도하십시오.',
};
export type EditResultKey = keyof typeof CREATE_RESULT_ITEMS;

export const CREATE_RESULT_ITEMS = {
  SUCCESS: '등록이 완료되었습니다.',
  FAILURE: '등록이 실패되었습니다. 다시 시도하십시오.',
  UNKNOWN: '오류가 발생되었습니다. 다시 시도하십시오',
};
export type CreateResultKey = keyof typeof CREATE_RESULT_ITEMS;

export const ITEMS_PER_PAGE = 10;

export enum AdminPageTypes {
  Create = 'Create',
  Edit = 'Edit',
  General = 'GENERAL',
}
