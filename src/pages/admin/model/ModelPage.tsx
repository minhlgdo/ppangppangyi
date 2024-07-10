import AdminContextProvider from '@src/context/AdminContext.tsx';

function ModelPageContent() {
  return <></>;
}

export default function ModelPage() {
  return (
    <AdminContextProvider>
      <ModelPageContent />
    </AdminContextProvider>
  );
}
