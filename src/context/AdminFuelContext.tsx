import {createContext, FC, ReactNode, useContext, useState} from 'react';

interface AdminFuelContextValue {
  itemToDelete?: number;
  setItemToDelete: (item: number | undefined) => void;
  deletePopup: boolean;
  setDeletePopup: (val: boolean) => void;
}

// props for context provider
interface AdminFuelProviderProps {
  children: ReactNode;
}

// initial state
const INITIAL_DELETE_POPUP_STATE = false;
const INITIAL_ITEM_TO_DELETE = undefined;

const AdminFuelContext = createContext<AdminFuelContextValue>({
  itemToDelete: INITIAL_ITEM_TO_DELETE,
  setItemToDelete: () => {},
  deletePopup: INITIAL_DELETE_POPUP_STATE,
  setDeletePopup: () => {},
});

export const useAdminFuel = () => useContext(AdminFuelContext);

const AdminFuelContextProvider: FC<AdminFuelProviderProps> = ({children}) => {
  const [deletePopup, setDeletePopup] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<number | undefined>(undefined);

  return (
    <AdminFuelContext.Provider
      value={{
        itemToDelete: itemToDelete,
        setItemToDelete: setItemToDelete,
        deletePopup: deletePopup,
        setDeletePopup: setDeletePopup,
      }}
    >
      {children}
    </AdminFuelContext.Provider>
  );
};

export default AdminFuelContextProvider;
