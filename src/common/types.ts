import {FieldType} from '@src/common/constants.ts';

interface RequiredFieldInterface {
  name: string;
  label: string; // label text
  required: boolean;
  type: FieldType;
  defaultValue?: string | number; // string for text values, number for dropdown
  selections?: CategoriesType; // for dropdown types
}

export type RequiredFieldType = RequiredFieldInterface;

export interface InputValuesType {
  [key: string]: string | number;
}

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

export interface Car {
  carId: number;
  brandId: number;
  brandName: string;
  modelId: number;
  modelName: string;
  launchedYear: number;
  fuels?: FuelsType;
  imagePath?: string;
  price?: string;
  fuelEfficiency?: string;
  maxPower?: string;
  torque?: string;
  capacity?: string;
  engine?: string;
  drivingSystem?: string;
  transmission?: string;
  length?: string;
  height?: string;
  width?: string;
  wheelbase?: string;
}

export type CarsType = Car[];
