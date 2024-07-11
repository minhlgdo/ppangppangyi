import {FieldType} from '@src/common/constants.ts';

interface RequiredFieldInterface {
  name: string;
  label: string; // label text
  required: boolean;
  type: FieldType;
  defaultValue?: string; // for text values
  selections?: CategoriesType; // for dropdown types
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

export interface ExtendedCategory extends Category {
  parentCategoryName: string;
}

export type ExtendedCategoriesType = ExtendedCategory[];

export interface Model {
  modelId: number;
  modelName: string;
  brandName: string;
}

export type ModelsType = Model[];
