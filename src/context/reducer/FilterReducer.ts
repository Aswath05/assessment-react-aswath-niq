import { initialState } from "../../components/Filters";
import { IFilterState, TFilterAction } from "../../types/CategoryTypes";

const FilterReducer = (state: IFilterState, action: TFilterAction): IFilterState => {
    switch (action.type) {
      case 'SET_SELECTED_CATEGORY':
        return { ...state, selectedCategory: action.payload };
      case 'SET_SELECTED_PRODUCT':
        return { ...state, selectedProduct: action.payload };
      case 'SET_PRODUCTS':
        return { ...state, products: action.payload };
      case 'SET_ENABLE_RUN_REPORT':
        return { ...state, enableRunReport: action.payload };
      case 'SET_IS_LOADING':
        return { ...state, isLoading: action.payload };
        case 'RESET_SELECTED_PRODUCT' :
            return {... state, selectedProduct: []}
        case 'RESET_STATE':
            return initialState;
      default:
        return state;
    }
  };

export default FilterReducer;