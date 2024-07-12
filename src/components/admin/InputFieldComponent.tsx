import {InputValuesType, RequiredFieldType} from '@src/common/types.ts';
import {FieldTypes} from '@src/common/constants.ts';
import {Button, FormControl, FormHelperText, InputLabel, MenuItem, Select, styled, TextField} from '@mui/material';
import {CloudUpload} from '@mui/icons-material';

interface InputFieldComponentProps<T> {
  field: RequiredFieldType<T>;
  inputValues: InputValuesType;
  errors: {[key: string]: string};
  handleChange: (name: string, value: string | number) => void;
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

export default function InputFieldComponent<T>({field, inputValues, errors, handleChange}: InputFieldComponentProps<T>) {
  if (field.type === FieldTypes.Text || field.type === FieldTypes.Number) {
    // Text field
    return (
      <TextField
        variant={'filled'}
        required={field.required}
        label={field.required ? '필수' : '선택'}
        error={!!errors[field.name]}
        helperText={errors[field.name]}
        value={inputValues[field.name] || field.defaultValue || ''}
        onChange={(e) => handleChange(field.name, e.target.value)}
        type={field.type === FieldTypes.Number ? 'number' : 'text'}
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
        variant={'filled'}
        sx={{m: 1, minWidth: 120}}
        error={!!errors[field.name]}
      >
        <InputLabel>{field.required ? '필수 *' : '선택'}</InputLabel>
        <Select
          displayEmpty
          id="demo-simple-select"
          labelId={field.required ? 'demo-simple-select-required' : 'demo-simple-select-filled-label'}
          value={inputValues[field.name] || field.defaultValue || ''}
          onChange={(e) => handleChange(field.name, e.target.value)}
        >
          {field.selections?.map((selection) => (
            <MenuItem
              // selected={field.defaultValue === selection.parentId}
              key={selection[field.selectionIndex!] as number}
              value={selection[field.selectionIndex!] as number}
            >
              {selection[field.selectionLabel!] as string}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>{errors[field.name]}</FormHelperText>
      </FormControl>
    );
  }
}
