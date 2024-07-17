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

export const mapParentCategoryNames = (categories: CategoriesType, parentCategories: CategoriesType): ExtendedCategoriesType => {
  // Create a lookup table
  const parentCategoryMap: {[key: string]: Category} = {};
  parentCategories.map((parentCategory) => {
    parentCategoryMap[parentCategory.categoryId] = parentCategory;
  });

  return categories.map((category) => {
    const parentCategoryName = category.parentId ? parentCategoryMap[category.parentId]?.categoryName : '';
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

export const mapParentCategories = (parentCategories: CategoriesType) => {
  return parentCategories.map((opt) => {
    return {
      key: opt.categoryId,
      name: opt.categoryName,
    };
  });
};

export const mapExtendedCategories = (categories: ExtendedCategoriesType): SubjectOptions[] => {
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
