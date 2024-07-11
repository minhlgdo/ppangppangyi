import AdminContextProvider from '@src/context/AdminContext.tsx';

function CategoryPageContent() {
  return <></>;
}

export default function CategoryPage() {
  return (
    <AdminContextProvider>
      <CategoryPageContent />
    </AdminContextProvider>
  );
}
