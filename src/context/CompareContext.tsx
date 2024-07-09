import {createContext, FC, ReactNode, useContext, useReducer} from 'react';

// Structure of a selected car
interface SelectedCar {
  carId: number;
  imageSrc: string;
}

type SelectedCarsState = SelectedCar[];

// define the CompareContextValue
interface CompareContextValue {
  compareCars: SelectedCarsState;
  handleAddCar: (car: {id: number; imageSrc: string}) => void;
  handleDeleteCar: (id: number) => void;
  handleResetList: () => void;
}

// props for context provider
interface CompareProviderProps {
  children: ReactNode;
}

// Define action types
interface AddCarAction {
  type: 'ADD';
  payload: {
    item: SelectedCar;
  };
}

interface RemoveCarAction {
  type: 'REMOVE';
  payload: {
    itemId: number;
  };
}

interface ResetAction {
  type: 'RESET';
}

type Action = AddCarAction | RemoveCarAction | ResetAction;

// Define initial state
const initialCarState: SelectedCarsState = [];

// Reducer function for Context
function compareCarReducer(cars: SelectedCarsState, action: Action) {
  switch (action.type) {
    case 'ADD': {
      const newCar = action.payload.item;
      return [...cars, newCar];
    }

    case 'REMOVE': {
      const removeId = action.payload.itemId;
      return cars.filter((car) => car.carId !== removeId);
    }
    case 'RESET': {
      return [];
    }
    default:
      throw Error('Unsupported action');
  }
}

// Create CompareContext
const CompareContext = createContext<CompareContextValue>({
  compareCars: initialCarState,
  handleAddCar: () => {},
  handleDeleteCar: () => {},
  handleResetList: () => {},
});

// CompareContextProvider
const CompareContextProvider: FC<CompareProviderProps> = ({children}) => {
  const [compareCars, dispatch] = useReducer(compareCarReducer, initialCarState);

  const handleAddCar = ({id, imageSrc}: {id: number; imageSrc: string}) => {
    dispatch({
      type: 'ADD',
      payload: {
        item: {carId: id, imageSrc: imageSrc},
      },
    });
  };

  const handleDeleteCar = (id: number) => {
    dispatch({
      type: 'REMOVE',
      payload: {
        itemId: id,
      },
    });
  };

  // use when we want to empty the compare list (i.e., after we navigate the user to the compare page)
  const handleResetList = () => {
    dispatch({
      type: 'RESET',
    });
  };

  return (
    <CompareContext.Provider
      value={{
        compareCars: compareCars,
        handleAddCar,
        handleDeleteCar,
        handleResetList,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
};

export default CompareContext;

const useCompare = () => useContext(CompareContext);
export {CompareContextProvider, useCompare};
