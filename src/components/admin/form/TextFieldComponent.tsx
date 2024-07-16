import {FieldTypes} from '@src/common/constants.ts';
import {TextField} from '@mui/material';
import {RequiredFieldType} from '@src/common/types.ts';
import {useInputErrors, useInputValues} from '@src/context/AdminCreateEditContext.tsx';

interface TextFieldComponentProps {
  width: number;
  field: RequiredFieldType;
  handleChange: (name: string, value: string | number | string[]) => void;
}

export default function TextFieldComponent({width, field, handleChange}: TextFieldComponentProps) {
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
      value={inputValues[field.name] || ''}
      onChange={(e) => handleChange(field.name, e.target.value)}
      type={field.type === FieldTypes.Number ? 'number' : 'text'}
    />
  );
}
