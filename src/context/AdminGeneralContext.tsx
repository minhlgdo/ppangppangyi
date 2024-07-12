import {createContext, FC, ReactNode, useContext, useState} from 'react';

interface AdminContextValue {
  itemToDelete?: number;
  setItemToDelete: (item: number | undefined) => void;
  deletePopup: boolean;
  setDeletePopup: (val: boolean) => void;
}

// props for context provider
interface AdminGeneralProviderProps {
  children: ReactNode;
}

// initial state
const INITIAL_DELETE_POPUP_STATE = false;

const AdminGeneralContext = createContext<AdminContextValue>({
  itemToDelete: undefined,
  setItemToDelete: () => {},
  deletePopup: INITIAL_DELETE_POPUP_STATE,
  setDeletePopup: () => {},
});

export const useAdminContext = () => useContext(AdminGeneralContext);

const AdminGeneralContextProvider: FC<AdminGeneralProviderProps> = ({children}) => {
  const [deletePopup, setDeletePopup] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<number | undefined>(undefined);

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
