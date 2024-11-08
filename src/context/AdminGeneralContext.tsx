import {createContext, FC, ReactNode, useContext, useState} from 'react';
import {ResponseTypes, ResponseTypeValue} from '@src/common/constants.ts';

interface AdminContextValue {
  itemToDelete?: string;
  setItemToDelete: (item: string | undefined) => void;
  deletePopup: boolean;
  setDeletePopup: (val: boolean) => void;
  deleteResponse: ResponseTypeValue;
  setDeleteResponse: (response: ResponseTypeValue) => void;
  fetchError: boolean;
  setFetchError: (val: boolean) => void;
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
  deleteResponse: ResponseTypes.Unknown,
  setDeleteResponse: () => {},
  fetchError: false,
  setFetchError: () => {},
});

export const useAdminContext = () => useContext(AdminGeneralContext);

const AdminGeneralContextProvider: FC<AdminGeneralProviderProps> = ({children}) => {
  const [deletePopup, setDeletePopup] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | undefined>(undefined);
  const [responseType, setResponseType] = useState<ResponseTypeValue>(ResponseTypes.Unknown);
  const [fetchError, setFetchError] = useState(false);

  return (
    <AdminGeneralContext.Provider
      value={{
        itemToDelete: itemToDelete,
        setItemToDelete: setItemToDelete,
        deletePopup: deletePopup,
        setDeletePopup: setDeletePopup,
        deleteResponse: responseType,
        setDeleteResponse: setResponseType,
        fetchError: fetchError,
        setFetchError: setFetchError,
      }}
    >
      {children}
    </AdminGeneralContext.Provider>
  );
};

export default AdminGeneralContextProvider;

export const useDeleteResponse = () => {
  const {deleteResponse, setDeleteResponse} = useAdminContext();
  return {
    response: deleteResponse,
    setResponse: setDeleteResponse,
  };
};

export const useFetchError = () => {
  const {fetchError, setFetchError} = useAdminContext();
  return {
    fetchError: fetchError,
    setFetchError: setFetchError,
  };
};
