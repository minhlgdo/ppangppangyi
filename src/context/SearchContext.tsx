import {InputValuesType} from '@src/common/types.ts';
import {createContext, FC, ReactNode, useContext, useState} from 'react';

interface SearchContextState {
  inputValues: InputValuesType;
  setInputValues: (data: InputValuesType) => void;
}

interface SearchContextProps {
  children: ReactNode;
}

const INITIAL_STATE: SearchContextState = {
  inputValues: {},
  setInputValues: () => {},
};

const SearchContext = createContext(INITIAL_STATE);
const useSearchContext = () => useContext(SearchContext);

export const useSearchInputValues = () => {
  const {inputValues, setInputValues} = useSearchContext();
  return {
    searchInput: inputValues,
    setSearchInput: setInputValues,
  };
};

export const SearchContextProvider: FC<SearchContextProps> = ({children}) => {
  const [inputValues, setInputValue] = useState(INITIAL_STATE.inputValues);

  return <SearchContext.Provider value={{inputValues: inputValues, setInputValues: setInputValue}}>{children}</SearchContext.Provider>;
};
