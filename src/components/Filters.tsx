import { useReducer } from "react";
import {
  ICategory,
  IFilterState,
  IProduct,
  TSelectedValue,
} from "../types/CategoryTypes";
import CustomSelect from "./CustomSelect";
import { Product } from "../models/Product";
import Loader from "./Loader";
import FilterReducer from "../context/reducer/FilterReducer";

interface FiltersProps {
  productCategories: ICategory[];
  runReportHandler: (data: {
    runReport: boolean;
    products: IProduct[];
  }) => void;
}

const findSelectedProducts = (selected: unknown[], products: IProduct[]) => {
  let res = [];

  for (let i = 0; i < products.length; i++) {
    if (selected.includes(products[i].id)) {
      res.push(products[i]);
    }
  }
  return res;
};


export const initialState: IFilterState = {
  selectedCategory: "",
  selectedProduct: [],
  products: [],
  enableRunReport: false,
  isLoading: false,
};

const Filters = ({ productCategories, runReportHandler }: FiltersProps) => {
  const [state, dispatch] = useReducer(FilterReducer, initialState);
  /**
   *
   * @param categoryName
   * fetches api for individual products based on category selected
   */
  const getProductByCategory = async (categoryName: string) => {
    await fetch(`https://dummyjson.com/products/category/${categoryName}`)
      .then((res) => res.json())
      .then((data) => {
        const products = data?.products?.map((dt: IProduct) => new Product(dt));
        dispatch({ type: "SET_PRODUCTS", payload: products });
      });
  };

  const handleSelectChange = (data: TSelectedValue) => {
    if (data?.isMultiple) {
      dispatch({
        type: "SET_SELECTED_PRODUCT",
        payload: data?.value as string[],
      });
    } else {
      dispatch({
        type: "SET_SELECTED_CATEGORY",
        payload: data?.value as string,
      });
      dispatch({ type: "RESET_SELECTED_PRODUCT" });
      getProductByCategory(data?.value as string);
    }
    dispatch({ type: "SET_ENABLE_RUN_REPORT", payload: true });
  };

  const runReport = () => {
    dispatch({ type: "SET_IS_LOADING", payload: true });
    setTimeout(() => {
      dispatch({ type: "SET_IS_LOADING", payload: false });
      runReportHandler({
        runReport: true,
        products: state.selectedProduct.length
          ? findSelectedProducts(state.selectedProduct, state.products)
          : state.products,
      });
      dispatch({ type: "SET_ENABLE_RUN_REPORT", payload: false });
    }, 2000);
  };

  const reset = () => {
  
    dispatch({ type: "RESET_STATE" });
    runReportHandler({
      runReport: false,
      products: [],
    });
  };

  return (
    <>
      {state.isLoading && <Loader />}
      <div className="flex flex-col justify-between border border-black rounded-md px-3 py-4 w-[300px]">
        <div className="flex flex-col w-full gap-10">
          <div className="flex items-center justify-between">
            <p className="text-[20px] font-semibold">Filters</p>
            <button className="text-13" onClick={reset}>
              Clear
            </button>
          </div>
          <div className="w-full flex flex-col gap-3">
            <CustomSelect
              options={productCategories}
              multiple={false}
              placeholder="Select Category"
              onChange={handleSelectChange}
              selectedValue={state.selectedCategory}
            />
            <CustomSelect
              options={state.products}
              multiple
              placeholder="Select product"
              onChange={handleSelectChange}
              disabled={!state.products.length}
              selectedValue={state.selectedProduct}
            />
          </div>
        </div>
        <button
          className="p-3 border rounded-md bg-blue-600 text-white font-medium disabled:bg-blue-400 disabled:cursor-not-allowed"
          disabled={!state.enableRunReport}
          onClick={runReport}
        >
          Run Report
        </button>
      </div>
    </>
  );
};

export default Filters;
