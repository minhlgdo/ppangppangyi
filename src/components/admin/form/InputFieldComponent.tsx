import {RequiredFieldType} from '@src/common/types.ts';
import {FieldTypes} from '@src/common/constants.ts';
import TextFieldComponent from '@src/components/admin/form/TextFieldComponent.tsx';
import DropdownComponent from '@src/components/admin/form/DropdownComponent.tsx';
import ImageUploadComponent from '@src/components/admin/form/ImageUploadComponent.tsx';

interface InputFieldComponentProps<T> {
  field: RequiredFieldType<T>;
  handleChange: (name: string, value: string | number) => void;
}

const FIELD_WIDTH = 300;

export default function InputFieldComponent<T>({field, handleChange}: InputFieldComponentProps<T>) {
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
      return <ImageUploadComponent />;
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
        <DropdownComponent
          width={FIELD_WIDTH}
          field={field}
          handleChange={handleChange}
        />
      );
  }
}
