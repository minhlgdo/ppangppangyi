import {createContext, FC, ReactNode, useContext, useState} from 'react';

interface AdminContextValue {
  itemToDelete?: string;
  setItemToDelete: (item: string | undefined) => void;
  deletePopup: boolean;
  setDeletePopup: (val: boolean) => void;
}

// props for context provider
interface AdminGeneralProviderProps {
  children: ReactNode;
}

const AdminGeneralContext = createContext<AdminContextValue>({
  itemToDelete: undefined,
  setItemToDelete: () => {},
  deletePopup: false,
  setDeletePopup: () => {},
});

export const useAdminContext = () => useContext(AdminGeneralContext);

const AdminGeneralContextProvider: FC<AdminGeneralProviderProps> = ({children}) => {
  const [deletePopup, setDeletePopup] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | undefined>(undefined);

  return (
    <AdminGeneralContext.Provider
      value={{
        itemToDelete: itemToDelete,
        setItemToDelete: setItemToDelete,
        deletePopup: deletePopup,
        setDeletePopup: setDeletePopup,
      }}
    >
      {children}
    </AdminGeneralContext.Provider>
  );
};

export default AdminGeneralContextProvider;
