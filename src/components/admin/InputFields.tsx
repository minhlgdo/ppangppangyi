import {FC} from 'react';
import {Button, Stack, styled, TextField, Typography} from '@mui/material';
import {CloudUpload} from '@mui/icons-material';
import {FieldTypes, FieldTypesType} from '@src/common/constants.ts';

interface InputField {
  name: string;
  required: boolean;
  type: FieldTypesType;
  defaultValue?: string;
}

interface InputFieldsProps {
  fields: InputField[];
  inputValues: {[key: string]: string};
  errors: {[key: string]: string};
  onChange: (name: string, value: string) => void;
}

const VisuallyHiddenInput = styled('input')({
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const InputFields: FC<InputFieldsProps> = ({fields, inputValues, errors, onChange}) => {
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
          {field.type === FieldTypes.Text ? (
            <TextField
              required={field.required}
              label={field.required ? '필수' : ''}
              defaultValue={field.defaultValue}
              error={!!errors[field.name]}
              helperText={errors[field.name]}
              value={inputValues[field.name] || ''}
              onChange={(e) => onChange(field.name, e.target.value)}
            />
          ) : (
            <Button
              component={'label'}
              variant={'contained'}
              tabIndex={-1}
              startIcon={<CloudUpload />}
            >
              이미지 업로드
              <VisuallyHiddenInput type="image" />
            </Button>
          )}
        </Stack>
      ))}
    </Stack>
  );
};

export default InputFields;
