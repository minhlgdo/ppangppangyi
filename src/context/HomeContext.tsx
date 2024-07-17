// interface of HomeContextValue
import {createContext, FC, ReactNode, useContext, useState} from 'react';

interface HomeContextValue {
  searchCategory: string;
  setSearchCategory: (category: string) => void;
}

// props for context provider
interface HomeProviderProps {
  children: ReactNode;
}

// Initial state
const INITIAL_CATEGORY_STATE = '경형';

const HomeContext = createContext<HomeContextValue>({
  searchCategory: INITIAL_CATEGORY_STATE,
  setSearchCategory: () => {},
});

const useHome = () => useContext(HomeContext);

const HomeContextProvider: FC<HomeProviderProps> = ({children}) => {
  const [searchCategory, setSearchCategory] = useState(INITIAL_CATEGORY_STATE);

  return (
    <HomeContext.Provider value={{searchCategory: searchCategory, setSearchCategory: setSearchCategory}}>{children}</HomeContext.Provider>
  );
};

export default HomeContextProvider;

export const useSearchCategory = () => {
  const {searchCategory, setSearchCategory} = useHome();
  return {
    searchCategory: searchCategory,
    setSearchCategory: setSearchCategory,
  };
};
