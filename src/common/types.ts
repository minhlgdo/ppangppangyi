import {FieldType} from '@src/common/constants.ts';

// Generic interface for required input field, with T being the selection dropdown types, e.g., Category, Fuel
interface RequiredFieldInterface {
  name: string;
  label: string; // label text
  required: boolean;
  type: FieldType;
  defaultValue?: string | number | SubjectOptions[]; // string for text values, number for dropdown
  options?: SubjectOptions[];
  multipleOptions?: boolean;
}

export type RequiredFieldType = RequiredFieldInterface;

export interface SubjectOptions {
  key: string;
  name: string;
}

export interface InputValuesType {
  [key: string]: string | number | string[];
}

// Object structures
export interface Brand {
  brandId?: string;
  brandName: string;
}

export type BrandsType = Brand[];

export interface Fuel {
  fuelId?: string;
  fuelName: string;
}

export type FuelsType = Fuel[];

export interface Category {
  parentId: string | null;
  categoryId: string;
  categoryName: string;
}

export type CategoriesType = Category[];

export interface ExtendedCategory extends Category {
  parentCategoryName: string;
}

export type ExtendedCategoriesType = ExtendedCategory[];

export interface Model {
  modelId: string;
  modelName: string;
  brandName: string;
}

export type ModelsType = Model[];

export interface Car {
  categoryId: string;
  carId: string;
  brandId: string;
  brandName?: string;
  modelId: string;
  modelName?: string;
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
