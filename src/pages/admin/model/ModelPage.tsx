import AdminContextProvider from '@src/context/AdminContext.tsx';
import {ChangeEvent, useState} from 'react';
import {Model, ModelsType} from '@src/common/types.ts';
import GeneralLayout from '@src/layout/admin/GeneralLayout.tsx';
import {Subjects} from '@src/common/constants.ts';
import {MODEL_CREATE_PATH, MODEL_MAIN_PATH} from '@src/common/navigation.ts';

const DUMMY_MODELS: ModelsType = [
  {
    modelId: 1,
    modelName: 'X1',
    brandName: 'BMW',
  },
  {
    modelId: 2,
    modelName: '아이오닉',
    brandName: 'Hyundai',
  },
  {
    modelId: 3,
    modelName: 'porsche',
    brandName: 'Porsche',
  },
];

function ModelPageContent() {
  const [totalItems, setTotalItems] = useState(DUMMY_MODELS.length);
  const [modelList, setModelList] = useState<ModelsType>(DUMMY_MODELS);

  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);

  const handleDeleteItem = (id: number) => {
    console.log(`Delete item ${id}`);
    // TODO: Call the items here
  };

  const handlePageChange = (event: ChangeEvent<unknown>, page: number) => {
    setPage(page);
  };

  return (
    <GeneralLayout<Model>
      subject={Subjects.Model}
      createPagePath={MODEL_CREATE_PATH}
      totalItems={totalItems}
      items={modelList}
      itemKey={'modelId'}
      itemPrimaryText={['brandName', 'modelName']}
      basePagePath={MODEL_MAIN_PATH}
      totalPages={totalPages}
      page={page}
      handlePageChange={handlePageChange}
      handleDeleteItem={handleDeleteItem}
    />
  );
}

export default function ModelPage() {
  return (
    <AdminContextProvider>
      <ModelPageContent />
    </AdminContextProvider>
  );
}
