interface ICategory {
  id: string;
  slug: string;
  name: string;
  url: string;
}

interface IProduct {
  id: number;
  title: string;
  name: string;
  price: number;
  category: string;
  brand: string;
}

type TSelectedValue = {
  isMultiple: boolean;
  value: string | string[];
};

type TSelectOptions = { id: string | number; name: string };

interface IFilterState {
  selectedCategory: string;
  selectedProduct: string[];
  products: any[]; // Update the type according to your product type
  enableRunReport: boolean;
  isLoading: boolean;
}

type TFilterAction =
  | { type: "SET_SELECTED_CATEGORY"; payload: string }
  | { type: "SET_SELECTED_PRODUCT"; payload: string[] }
  | { type: "SET_PRODUCTS"; payload: any[] } // Update the type according to your product type
  | { type: "SET_ENABLE_RUN_REPORT"; payload: boolean }
  | { type: "SET_IS_LOADING"; payload: boolean }
  | { type: "RESET_STATE" }
  | { type: "RESET_SELECTED_PRODUCT" };

export type {
  ICategory,
  IProduct,
  TSelectedValue,
  TSelectOptions,
  IFilterState,
  TFilterAction,
};
