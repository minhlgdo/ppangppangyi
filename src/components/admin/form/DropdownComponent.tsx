import {FormControl, FormHelperText, InputLabel, MenuItem, Select, SelectChangeEvent} from '@mui/material';
import {useInputErrors, useInputValues} from '@src/context/AdminCreateEditContext.tsx';
import {RequiredFieldType} from '@src/common/types.ts';

interface DropdownComponentProps {
  width: number;
  field: RequiredFieldType;
  handleChange: (name: string, value: string | number | string[]) => void;
}

export default function DropdownComponent({width, field, handleChange}: DropdownComponentProps) {
  const {inputValues} = useInputValues();
  const {inputErrors} = useInputErrors();
  const value = inputValues[field.name] ?? (field.multipleOptions ? [] : '');

  const handleInputChange = (e: SelectChangeEvent<string | number | string[]>) => {
    handleChange(field.name, e.target.value);
  };

  return (
    <FormControl
      variant={'filled'}
      sx={{m: 1, minWidth: width}}
      error={!!inputErrors[field.name]}
      disabled={field.disable}
    >
      <InputLabel>{field.required ? '필수 *' : '선택'}</InputLabel>
      <Select
        displayEmpty
        multiple={field.multipleOptions}
        id="demo-simple-select"
        labelId={field.required ? 'demo-simple-select-required' : 'demo-simple-select-filled-label'}
        value={value}
        onChange={handleInputChange}
      >
        {field.options?.map((selection) => (
          <MenuItem
            selected={inputValues[field.name] === selection.key}
            key={selection.key}
            value={selection.key}
          >
            {selection.name}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{inputErrors[field.name]}</FormHelperText>
    </FormControl>
  );
}
