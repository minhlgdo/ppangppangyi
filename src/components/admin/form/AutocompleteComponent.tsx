import {Autocomplete, FormControl, FormHelperText, TextField} from '@mui/material';
import {RequiredFieldType, SubjectOptions} from '@src/common/types.ts';
import {useInputErrors, useInputValues} from '@src/context/AdminCreateEditContext.tsx';

interface AutocompleteComponentProps {
  width: number;
  field: RequiredFieldType;
  handleChange: (name: string, value: string | number) => void;
}

export default function AutocompleteComponent({width, field, handleChange}: AutocompleteComponentProps) {
  const {inputValues} = useInputValues();
  const {inputErrors} = useInputErrors();

  const value: SubjectOptions | null = field.options?.find((option) => option.key === inputValues[field.name]) || null;

  const handleValueChange = (value: SubjectOptions | null) => {
    console.log('Selected value:', value);
    const val = value?.key ?? '';
    handleChange(field.name, val);
  };

  const handleCompareValues = (option: SubjectOptions, value: SubjectOptions | null) => {
    return option.key === value?.key && option.name === value?.name;
  };

  return (
    <FormControl
      variant={'filled'}
      sx={{m: 1, minWidth: width}}
      error={!!inputErrors[field.name]}
    >
      <Autocomplete
        disabled={field.disable}
        id={`autocomplete-${field.name}`}
        autoHighlight={true}
        autoSelect={true}
        sx={{width: width}}
        value={value}
        // @ts-ignore
        onChange={(e, value) => handleValueChange(value)}
        isOptionEqualToValue={handleCompareValues}
        getOptionLabel={(option) => `${option.name}`}
        renderInput={(params) => (
          <TextField
            {...params}
            fullWidth
            label={field.required ? '필수*' : '선택'}
            inputProps={{
              ...params.inputProps,
              autoComplete: 'new-password', // disable autocomplete and autofilled
            }}
          />
        )}
        options={field.options ?? []}
        loading={!!field.options}
      />
      <FormHelperText>{inputErrors[field.name]}</FormHelperText>
    </FormControl>
  );
}
