import {InputValuesType} from '@src/common/types.ts';
import {createContext, FC, ReactNode, useContext, useState} from 'react';
import {ResponseTypes, ResponseTypeValue} from '@src/common/constants.ts';

interface AdminCreateEditContextState {
  inputValues: InputValuesType;
  inputErrors: {[key: string]: string};
  responseType: ResponseTypeValue;
  isDialogOpen: boolean;
}

interface AdminCreateEditContextProps {
  state: AdminCreateEditContextState;
  setInputValues: (data: InputValuesType) => void;
  setInputErrors: (error: {[key: string]: string}) => void;
  setResponseType: (response: ResponseTypeValue) => void;
  setDialogOpen: (open: boolean) => void;
}

interface AdminCreateEditProps {
  children: ReactNode;
}

const INITIAL_STATE: AdminCreateEditContextState = {
  inputValues: {},
  inputErrors: {},
  responseType: ResponseTypes.Unknown,
  isDialogOpen: false,
};

const INITIAL_VALUES: AdminCreateEditContextProps = {
  state: INITIAL_STATE,
  setInputValues: () => {},
  setInputErrors: () => {},
  setResponseType: () => {},
  setDialogOpen: () => {},
};

const AdminCreateEditContext = createContext(INITIAL_VALUES);
const useAdminCreateEdit = () => useContext(AdminCreateEditContext);

const AdminCreateEditProvider: FC<AdminCreateEditProps> = ({children}) => {
  const [inputValues, setInputValues] = useState(INITIAL_STATE.inputValues);
  const [inputErrors, setInputErrors] = useState(INITIAL_STATE.inputErrors);
  const [responseType, setResponseType] = useState(INITIAL_STATE.responseType);
  const [isDialogOpen, setDialogOpen] = useState(INITIAL_STATE.isDialogOpen);

  return (
    <AdminCreateEditContext.Provider
      value={{
        state: {inputValues, inputErrors, responseType, isDialogOpen},
        setInputValues: setInputValues,
        setInputErrors: setInputErrors,
        setResponseType: setResponseType,
        setDialogOpen: setDialogOpen,
      }}
    >
      {children}
    </AdminCreateEditContext.Provider>
  );
};

export default AdminCreateEditProvider;

export const useInputValues = () => {
  const {state, setInputValues} = useAdminCreateEdit();
  return {
    inputValues: state.inputValues,
    setInputValues: setInputValues,
  };
};

export const useInputErrors = () => {
  const {state, setInputErrors} = useAdminCreateEdit();
  return {
    inputErrors: state.inputErrors,
    setInputErrors: setInputErrors,
  };
};

export const useResponseType = () => {
  const {state, setResponseType} = useAdminCreateEdit();
  return {
    response: state.responseType,
    setResponseType: setResponseType,
  };
};

export const useDialogOpen = () => {
  const {state, setDialogOpen} = useAdminCreateEdit();
  return {
    isDialogOpen: state.isDialogOpen,
    setDialogOpen: setDialogOpen,
  };
};
