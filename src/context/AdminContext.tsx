import {createContext, FC, ReactNode, useContext, useState} from 'react';

interface AdminContextValue {
  itemToDelete?: number;
  setItemToDelete: (item: number | undefined) => void;
  deletePopup: boolean;
  setDeletePopup: (val: boolean) => void;
}

// props for context provider
interface AdminProviderProps {
  children: ReactNode;
}

// initial state
const INITIAL_DELETE_POPUP_STATE = false;

const AdminContext = createContext<AdminContextValue>({
  itemToDelete: undefined,
  setItemToDelete: () => {},
  deletePopup: INITIAL_DELETE_POPUP_STATE,
  setDeletePopup: () => {},
});

export const useAdminContext = () => useContext(AdminContext);

const AdminContextProvider: FC<AdminProviderProps> = ({children}) => {
  const [deletePopup, setDeletePopup] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<number | undefined>(undefined);

  return (
    <AdminContext.Provider
      value={{
        itemToDelete: itemToDelete,
        setItemToDelete: setItemToDelete,
        deletePopup: deletePopup,
        setDeletePopup: setDeletePopup,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
