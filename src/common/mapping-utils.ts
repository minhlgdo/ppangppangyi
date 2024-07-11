import {CategoriesType, Category, ExtendedCategoriesType} from '@src/common/types.ts';

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
