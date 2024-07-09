import {FC} from 'react';
import {Stack, TextField, Typography} from '@mui/material';

export enum FieldType {
  Text = 'TEXT',
  Image = 'IMAGE',
}

interface InputField {
  name: string;
  required: boolean;
  type: FieldType;
  defaultValue?: string;
}

interface InputFieldsProps {
  fields: InputField[];
}

const InputFields: FC<InputFieldsProps> = ({fields}) => {
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
          <TextField
            required={field.required}
            label={field.required ? '필수' : ''}
            defaultValue={field.defaultValue}
          />
        </Stack>
      ))}
    </Stack>
  );
};

export default InputFields;
