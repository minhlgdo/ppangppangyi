import {Stack, Typography} from '@mui/material';
import {InputValuesType, RequiredFieldType} from '@src/common/types.ts';
import InputFieldComponent from '@src/components/admin/InputFieldComponent.tsx';

interface InputFormProps<T> {
  fields: RequiredFieldType<T>[];
  inputValues: InputValuesType;
  errors: {[key: string]: string};
  handleChange: (name: string, value: string | number) => void;
}

function InputForm<T>({fields, inputValues, errors, handleChange}: InputFormProps<T>) {
  return (
    <Stack spacing={4}>
      {fields.map((field) => (
        <Stack
          key={field.name}
          direction={'row'}
          spacing={4}
          alignItems={'center'}
        >
          <Typography>{field.label}</Typography>
          <InputFieldComponent
            field={field}
            inputValues={inputValues}
            errors={errors}
            handleChange={handleChange}
          />
        </Stack>
      ))}
    </Stack>
  );
}

export default InputForm;
