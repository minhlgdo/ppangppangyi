import {RequiredFieldType} from '@src/common/types.ts';
import {FieldTypes} from '@src/common/constants.ts';
import TextFieldComponent from '@src/components/admin/form/TextFieldComponent.tsx';
import DropdownComponent from '@src/components/admin/form/DropdownComponent.tsx';
import ImageComponent from '@src/components/admin/form/ImageComponent.tsx';
import AutocompleteComponent from '@src/components/admin/form/AutocompleteComponent.tsx';

interface InputFieldComponentProps {
  field: RequiredFieldType;
  handleChange: (name: string, value: string | number | string[]) => void;
}

const FIELD_WIDTH = 300;

export default function InputFieldComponent({field, handleChange}: InputFieldComponentProps) {
  switch (field.type) {
    case FieldTypes.Text:
    case FieldTypes.Number:
      return (
        <TextFieldComponent
          width={FIELD_WIDTH}
          field={field}
          handleChange={handleChange}
        />
      );
    case FieldTypes.Image:
      return <ImageComponent />;
    case FieldTypes.Dropdown:
      return (
        <DropdownComponent
          width={FIELD_WIDTH}
          field={field}
          handleChange={handleChange}
        />
      );
    case FieldTypes.Autocomplete:
      return (
        <AutocompleteComponent
          width={FIELD_WIDTH}
          field={field}
          handleChange={handleChange}
        />
      );
  }
}
