import {FormControl, FormHelperText, InputLabel, MenuItem, Select} from '@mui/material';
import {useInputErrors, useInputValues} from '@src/context/AdminCreateEditContext.tsx';
import {RequiredFieldType} from '@src/common/types.ts';

interface DropdownComponentProps<T> {
  width: number;
  field: RequiredFieldType<T>;
  handleChange: (name: string, value: string | number) => void;
}

export default function DropdownComponent<T>({width, field, handleChange}: DropdownComponentProps<T>) {
  const {inputValues} = useInputValues();
  const {inputErrors} = useInputErrors();

  return (
    <FormControl
      variant={'filled'}
      sx={{m: 1, minWidth: width}}
      error={!!inputErrors[field.name]}
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
            {field.selectionLabel!.map((label) => selection[label]).join(' ')}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{inputErrors[field.name]}</FormHelperText>
    </FormControl>
  );
}
