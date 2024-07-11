import {RequiredFieldType} from '@src/common/types.ts';

export const validateFields = (inputFields: RequiredFieldType[], values: {[key: string]: string}) => {
  const errors: {[key: string]: string} = {};

  inputFields.forEach((field) => {
    if (field.required && !values[field.name]) {
      errors[field.name] = '필수 항목입니다.';
    }
  });
  return errors;
};

export const isFormValid = (errors: {[key: string]: string}) => {
  return Object.keys(errors).length === 0;
};
