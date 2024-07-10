import {FieldTypesType} from '@src/common/constants.ts';

interface RequiredFieldInterface {
  name: string;
  required: boolean;
  type: FieldTypesType;
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

export interface Category {
  parentId: number | null;
  categoryId: number;
  categoryName: string;
}

export type CategoriesType = Category[];

export interface Model {
  modelId: number;
  modelName: string;
  brandName: string;
}

export type ModelsType = Model[];
