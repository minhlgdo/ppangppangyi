import {Stack, Typography} from '@mui/material';
import {RequiredFieldType} from '@src/common/types.ts';
import InputFieldComponent from '@src/components/admin/InputFieldComponent.tsx';

interface InputFormProps {
  fields: RequiredFieldType[];
  inputValues: {[key: string]: string};
  errors: {[key: string]: string};
  handleChange: (name: string, value: string) => void;
}

function InputForm({fields, inputValues, errors, handleChange}: InputFormProps) {
  return (
    <Stack spacing={4}>
      {fields.map((field) => (
        <Stack
          key={field.name}
          direction={'row'}
          spacing={4}
          alignItems={'center'}
        >
          <Typography>{field.name}</Typography>
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
