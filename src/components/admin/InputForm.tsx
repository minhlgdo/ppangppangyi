import {Stack, Typography} from '@mui/material';
import {RequiredFieldType} from '@src/common/types.ts';
import InputFieldComponent from '@src/components/admin/form/InputFieldComponent.tsx';
import {useInputValues} from '@src/context/AdminCreateEditContext.tsx';

interface InputFormProps {
  fields: RequiredFieldType[];
}

function InputForm({fields}: InputFormProps) {
  const {inputValues, setInputValues} = useInputValues();

  const handleChange = (name: string, value: string | number | string[]) => {
    setInputValues({...inputValues, [name]: value});
  };

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
            handleChange={handleChange}
          />
        </Stack>
      ))}
    </Stack>
  );
}

export default InputForm;
