import {RequiredFieldType} from '@src/common/types.ts';
import {FieldTypes} from '@src/common/constants.ts';
import {Button, FormControl, FormHelperText, InputLabel, MenuItem, Select, styled, TextField} from '@mui/material';
import {CloudUpload} from '@mui/icons-material';

interface InputFieldComponentProps {
  field: RequiredFieldType;
  inputValues: {[key: string]: string};
  errors: {[key: string]: string};
  handleChange: (name: string, value: string) => void;
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

export default function InputFieldComponent({field, inputValues, errors, handleChange}: InputFieldComponentProps) {
  if (field.type === FieldTypes.Text) {
    // Text field
    return (
      <TextField
        required={field.required}
        label={field.required ? '필수' : ''}
        defaultValue={field.defaultValue}
        error={!!errors[field.name]}
        helperText={errors[field.name]}
        value={inputValues[field.name] || ''}
        onChange={(e) => handleChange(field.name, e.target.value)}
      />
    );
  } else if (field.type === FieldTypes.Image) {
    // Upload image
    return (
      <Button
        component={'label'}
        variant={'contained'}
        tabIndex={-1}
        startIcon={<CloudUpload />}
      >
        이미지 업로드
        <VisuallyHiddenInput type="image" />
      </Button>
    );
  } else if (field.type === FieldTypes.Dropdown) {
    // Display dropdown form
    return (
      <FormControl
        sx={{m: 1, minWidth: 120}}
        error={!!errors[field.name]}
      >
        <InputLabel>{field.label}</InputLabel>
        <Select
          displayEmpty
          labelId={field.required ? 'demo-simple-select-required' : 'demo-simple-select-filled-label'}
          value={inputValues[field.name] || ''}
          onChange={(e) => handleChange(field.name, e.target.value)}
        >
          {field.selections?.map((selection) => (
            <MenuItem
              key={selection.categoryId}
              value={selection.categoryId}
            >
              {selection.categoryName}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>{errors[field.name]}</FormHelperText>
      </FormControl>
    );
  }
}
