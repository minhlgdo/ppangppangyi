import {
  BrandsType,
  CarsType,
  CategoriesType,
  Category,
  ExtendedCategoriesType,
  FuelsType,
  ModelsType,
  SubjectOptions,
} from '@src/common/types.ts';
import {SubjectType} from '@src/common/constants.ts';

export const mapParentCategoryNames = (categories: CategoriesType): ExtendedCategoriesType => {
  // Create a lookup table
  const categoryMap: {[key: number]: Category} = {};
  categories.map((category) => {
    categoryMap[category.categoryId] = category;
  });

  return categories.map((category) => {
    const parentCategoryName = category.parentId ? categoryMap[category.parentId]?.categoryName : '';
    return {
      ...category,
      parentCategoryName: parentCategoryName,
    };
  });
};

export const mapBrands = (brands: BrandsType): SubjectOptions[] => {
  return brands.map((brand) => {
    return {
      key: brand.brandId,
      name: brand.brandName,
    };
  });
};

export const mapFuels = (fuels: FuelsType): SubjectOptions[] => {
  return fuels.map((fuel) => {
    return {
      key: fuel.fuelId,
      name: fuel.fuelName,
    };
  });
};

export const mapCars = (cars: CarsType): SubjectOptions[] => {
  return cars.map((car) => {
    return {
      key: car.carId,
      name: `${car.brandName} ${car.modelName} ${car.launchedYear}`,
    };
  });
};

export const mapCategoriesWithParentName = (categories: ExtendedCategoriesType): SubjectOptions[] => {
  return categories.map((cat) => {
    return {
      key: cat.categoryId,
      name: `${cat.parentCategoryName} ${cat.categoryName}`,
    };
  });
};

export const mapModels = (models: ModelsType): SubjectOptions[] => {
  return models.map((model) => {
    return {
      key: model.modelId,
      name: `${model.brandName} ${model.modelName}`,
    };
  });
};
