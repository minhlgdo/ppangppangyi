import {FieldType} from '@src/common/constants.ts';

interface RequiredFieldInterface {
  name: string;
  required: boolean;
  type: FieldType;
  defaultValue?: string;
}

export type RequiredFieldType = RequiredFieldInterface;

// Object structures
export interface Brand {
  brandId: number;
  brandName: number;
}
export type BrandsType = Brand[];

export interface Fuel {
  fuelId: number;
  fuelName: string;
}

export type FuelsType = Fuel[];
