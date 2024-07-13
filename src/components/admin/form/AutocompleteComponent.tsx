import {Autocomplete, TextField} from '@mui/material';
import {RequiredFieldType} from '@src/common/types.ts';
import {useInputErrors, useInputValues} from '@src/context/AdminCreateEditContext.tsx';

interface AutocompleteComponentProps<T> {
  width: number;
  field: RequiredFieldType<T>;
  handleChange: (name: string, value: string | number) => void;
}

export default function AutocompleteComponent<T>({width, field, handleChange}: AutocompleteComponentProps<T>) {
  const {inputValues} = useInputValues();
  const {inputErrors} = useInputErrors();

  return (
    <Autocomplete
      autoHighlight
      sx={{width: width}}
      value={(inputValues[field.name] || field.defaultValue) as T}
      onChange={(e, value) => handleChange(field.name, (value as T) ? ((value as T)[field.selectionIndex!] as string) : '')}
      isOptionEqualToValue={(option, value) => option[field.selectionIndex!] === value[field.selectionIndex!]}
      getOptionLabel={(option: T) => `${field.selectionLabel!.map((label) => option[label]).join(' ')}`}
      renderInput={(params) => (
        <TextField
          {...params}
          fullWidth
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password', // disable autocomplete and autofilled
          }}
        />
      )}
      options={field.selections ?? []}
      loading={!!field.selections}
    />
  );
}
