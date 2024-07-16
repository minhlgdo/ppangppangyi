import {InputValuesType, RequiredFieldType} from '@src/common/types.ts';

export const validateFields = (inputFields: RequiredFieldType[], values: InputValuesType) => {
  const errors: {[key: string]: string} = {};

  inputFields.forEach((field) => {
    const val = values[field.name];
    if (field.required) {
      if ((Array.isArray(val) && val.length === 0) || (!Array.isArray(val) && (!val || val === ''))) {
        errors[field.name] = '필수 항목입니다.';
      }
    }
  });
  return errors;
};

export const isFormValid = (errors: {[key: string]: string}) => {
  return Object.keys(errors).length === 0;
};
