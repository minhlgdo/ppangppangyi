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
const initialCategoryState = '경형';

const HomeContext = createContext<HomeContextValue>({
  searchCategory: initialCategoryState,
  setSearchCategory: () => {},
});

export const useHome = () => useContext(HomeContext);

const HomeContextProvider: FC<HomeProviderProps> = ({children}) => {
  const [searchCategory, setSearchCategory] = useState(initialCategoryState);

  return (
    <HomeContext.Provider value={{searchCategory: searchCategory, setSearchCategory: setSearchCategory}}>{children}</HomeContext.Provider>
  );
};

export default HomeContextProvider;
