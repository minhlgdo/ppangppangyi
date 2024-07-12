import {InputValuesType} from '@src/common/types.ts';
import {createContext, FC, ReactNode, useContext, useState} from 'react';

interface AdminCreateEditContextState {
  inputValues: InputValuesType;
  inputErrors: {[key: string]: string};
}

interface AdminCreateEditContextProps {
  state: AdminCreateEditContextState;
  setInputValues: (data: InputValuesType) => void;
  setInputErrors: (error: {[key: string]: string}) => void;
}

interface AdminCreateEditProps {
  children: ReactNode;
}

const INITIAL_STATE: AdminCreateEditContextState = {
  inputValues: {},
  inputErrors: {},
};

const INITIAL_VALUES: AdminCreateEditContextProps = {
  state: INITIAL_STATE,
  setInputValues: () => {},
  setInputErrors: () => {},
};

const AdminCreateEditContext = createContext(INITIAL_VALUES);
const useAdminCreateEdit = () => useContext(AdminCreateEditContext);

const AdminCreateEditProvider: FC<AdminCreateEditProps> = ({children}) => {
  const [inputValues, setInputValues] = useState(INITIAL_STATE.inputValues);
  const [inputErrors, setInputErrors] = useState(INITIAL_STATE.inputErrors);

  return (
    <AdminCreateEditContext.Provider
      value={{
        state: {inputValues, inputErrors},
        setInputValues: setInputValues,
        setInputErrors: setInputErrors,
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
