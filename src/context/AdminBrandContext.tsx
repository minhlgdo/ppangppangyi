import {createContext, FC, ReactNode, useContext, useState} from 'react';

interface AdminBrandContextValue {
  itemToDelete?: number;
  setItemToDelete: (item: number | undefined) => void;
  deletePopup: boolean;
  setDeletePopup: (val: boolean) => void;
}

// props for context provider
interface AdminBrandProviderProps {
  children: ReactNode;
}

// initial state
const INITIAL_DELETE_POPUP_STATE = false;

const AdminBrandContext = createContext<AdminBrandContextValue>({
  itemToDelete: undefined,
  setItemToDelete: () => {},
  deletePopup: INITIAL_DELETE_POPUP_STATE,
  setDeletePopup: () => {},
});

export const useAdminBrand = () => useContext(AdminBrandContext);

const AdminBrandContextProvider: FC<AdminBrandProviderProps> = ({children}) => {
  const [deletePopup, setDeletePopup] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<number | undefined>(undefined);

  return (
    <AdminBrandContext.Provider
      value={{
        itemToDelete: itemToDelete,
        setItemToDelete: setItemToDelete,
        deletePopup: deletePopup,
        setDeletePopup: setDeletePopup,
      }}
    >
      {children}
    </AdminBrandContext.Provider>
  );
};

export default AdminBrandContextProvider;
