import {FieldTypes} from '@src/common/constants.ts';
import {TextField} from '@mui/material';
import {RequiredFieldType} from '@src/common/types.ts';
import {useInputErrors, useInputValues} from '@src/context/AdminCreateEditContext.tsx';

interface TextFieldComponentProps<T> {
  width: number;
  field: RequiredFieldType<T>;
  handleChange: (name: string, value: string | number) => void;
}

export default function TextFieldComponent<T>({width, field, handleChange}: TextFieldComponentProps<T>) {
  const {inputValues} = useInputValues();
  const {inputErrors} = useInputErrors();

  return (
    <TextField
      sx={{width: width}}
      variant={'filled'}
      required={field.required}
      label={field.required ? '필수' : '선택'}
      error={!!inputErrors[field.name]}
      helperText={inputErrors[field.name]}
      value={inputValues[field.name] || field.defaultValue || ''}
      onChange={(e) => handleChange(field.name, e.target.value)}
      type={field.type === FieldTypes.Number ? 'number' : 'text'}
    />
  );
}
