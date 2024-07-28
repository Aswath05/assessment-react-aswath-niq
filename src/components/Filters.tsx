import { useState } from "react";
import { ICategory, IProduct, TSelectedValue } from "../types/CategoryTypes";
import CustomSelect from "./CustomSelect";
import { Product } from "../models/Product";
import Loader from "./Loader";

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

const Filters = ({ productCategories, runReportHandler }: FiltersProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedProduct, setSelectedProduct] = useState<string[]>([]);
  const [products, setProducts] = useState([]);
  const [enableRunReport, setEnableRunReport] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * 
   * @param categoryName
   * fetches api for individual products based on category selected
   */
  const getProductByCategory = async (categoryName: string) => {
    await fetch(`https://dummyjson.com/products/category/${categoryName}`)
      .then((res) => res.json())
      .then((data) =>
        setProducts(data?.products?.map((dt: IProduct) => new Product(dt)))
      );
  };

  const handleSelectChange = (data: TSelectedValue) => {
    if (data?.isMultiple) {
      setSelectedProduct(data?.value as string[]);
    } else {
      setSelectedCategory(data?.value as string);
      setSelectedProduct([]);
      getProductByCategory(data?.value as string);
    }
    setEnableRunReport(true);
  };

  const runReport = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      runReportHandler({
        runReport: true,
        products: selectedProduct.length
          ? findSelectedProducts(selectedProduct, products)
          : products,
      });
      setEnableRunReport(false);
    }, 2000);
  };

  const reset = () => {
    setSelectedCategory("");
    setSelectedProduct([]);
    setProducts([]);
    setEnableRunReport(false);
    runReportHandler({
      runReport: false,
      products: [],
    });
  };

  return (
    <>
      {isLoading && <Loader />}
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
              selectedValue={selectedCategory}
            />
            <CustomSelect
              options={products}
              multiple
              placeholder="Select product"
              onChange={handleSelectChange}
              disabled={!products.length}
              selectedValue={selectedProduct}
            />
          </div>
        </div>
        <button
          className="p-3 border rounded-md bg-blue-600 text-white font-medium disabled:bg-blue-400 disabled:cursor-not-allowed"
          disabled={!enableRunReport}
          onClick={runReport}
        >
          Run Report
        </button>
      </div>
    </>
  );
};

export default Filters;
