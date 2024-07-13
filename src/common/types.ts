import {FieldType} from '@src/common/constants.ts';

// Generic interface for required input field, with T being the selection dropdown types, e.g., Category, Fuel
interface RequiredFieldInterface<T> {
  name: string;
  label: string; // label text
  required: boolean;
  type: FieldType;
  defaultValue?: string | number; // string for text values, number for dropdown
  selections?: T[]; // for dropdown types
  selectionIndex?: T extends T ? keyof T : keyof T;
  selectionLabel?: T extends T ? Array<keyof T> : Array<keyof T>;
}

export type RequiredFieldType<T> = RequiredFieldInterface<T>;

export interface InputValuesType {
  [key: string]: string | number;
}

// Object structures
export interface Brand {
  brandId: number;
  brandName: string;
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
  categoryId: number;
  carId: number;
  brandId: number;
  brandName?: string;
  modelId: number;
  modelName?: string;
  launchedYear: number;
  fuels?: FuelsType | Fuel;
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
