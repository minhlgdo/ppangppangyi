import {FieldTypesType} from '@src/common/constants.ts';

interface RequiredFieldInterface {
  name: string;
  required: boolean;
  type: FieldTypesType;
  defaultValue?: string;
}

export type RequiredFieldType = RequiredFieldInterface;
