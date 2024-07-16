import AdminGeneralContextProvider from '@src/context/AdminGeneralContext.tsx';
import {CategoriesType} from '@src/common/types.ts';
import {ChangeEvent, useState} from 'react';
import {mapCategoriesWithParentName, mapParentCategoryNames} from '@src/common/mapping-utils.ts';
import GeneralLayout from '@src/layout/admin/GeneralLayout.tsx';
import {Subjects} from '@src/common/constants.ts';
import {CATEGORY_CREATE_PATH, CATEGORY_MAIN_PATH} from '@src/common/navigation.ts';

const DUMMY_CATEGORIES: CategoriesType = [
  {
    parentId: null,
    categoryId: 1,
    categoryName: '경형',
  },
  {
    parentId: null,
    categoryId: 2,
    categoryName: '대형',
  },
  {
    parentId: null,
    categoryId: 3,
    categoryName: '소형',
  },
  {
    parentId: null,
    categoryId: 4,
    categoryName: '스포츠카',
  },
  {
    parentId: null,
    categoryId: 5,
    categoryName: '준대형',
  },
  {
    parentId: null,
    categoryId: 6,
    categoryName: '준중형',
  },
  {
    parentId: null,
    categoryId: 7,
    categoryName: '중형',
  },
  {
    parentId: 1,
    categoryId: 8,
    categoryName: 'RV',
  },
  {
    parentId: 1,
    categoryId: 9,
    categoryName: 'SUV',
  },
  {
    parentId: 1,
    categoryId: 10,
    categoryName: '밴',
  },
];

function CategoryPageContent() {
  // Variables
  const [categories, setCategories] = useState<CategoriesType>(DUMMY_CATEGORIES);
  const [totalItems, setTotalItems] = useState(DUMMY_CATEGORIES.length.toString());
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);

  // TODO: Load the real category list here

  // Map the parent's category name for display
  const displayCategoryList = mapParentCategoryNames(categories);
  const categoryOptions = mapCategoriesWithParentName(displayCategoryList);

  const handleDeleteItem = (id: string) => {
    console.log(`Delete item ${id}`);
    // TODO: Call the items here
  };

  const handlePageChange = (event: ChangeEvent<unknown>, page: number) => {
    setPage(page);
  };

  // Map category with
  return (
    <GeneralLayout
      subject={Subjects.Category}
      createPagePath={CATEGORY_CREATE_PATH}
      totalItems={totalItems}
      items={categoryOptions}
      isFetchingError={false} // placeholder
      isLoadingItems={false}
      basePagePath={CATEGORY_MAIN_PATH}
      totalPages={totalPages}
      page={page}
      handlePageChange={handlePageChange}
      handleDeleteItem={handleDeleteItem}
    />
  );
}

export default function CategoryPage() {
  return (
    <AdminGeneralContextProvider>
      <CategoryPageContent />
    </AdminGeneralContextProvider>
  );
}
